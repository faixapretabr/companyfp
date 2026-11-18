"""Valida um STL novo pra impressão e compara com a referência.
Uso: python -I validar.py novo.stl [--ref original.stl] [--escala 1] [--png preview.png] [--3mf saida.3mf]
     [--mesa 180 180 180] [--parede 1.2] [--tol 0.3] [--material PLA]
Sai com código 0 se ok, 1 se falhou. JSON no stdout."""
import argparse, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))  # -I não põe a pasta no path
import numpy as np
import trimesh
from medir import balanco, carregar, medir

EIXOS = {"+Z": (0, 0, 1), "-Z": (0, 0, -1), "+X": (1, 0, 0), "-X": (-1, 0, 0), "+Y": (0, 1, 0), "-Y": (0, -1, 0)}


def orientacao(m):
    """Melhor face pra cima: menos balanço, depois menor altura."""
    op = []
    for nome, d in EIXOS.items():
        alt = float(np.ptp(m.vertices @ np.array(d)))
        op.append((round(balanco(m, d), 1), round(alt, 1), nome))
    op.sort()
    b, h, nome = op[0]
    return {"cima": nome, "balanco_pct": b, "altura_mm": h,
            "suporte": "não precisa" if b < 1 else ("talvez (pouco)" if b < 5 else "sim, nos balanços")}


def preview(m, saida):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from mpl_toolkits.mplot3d.art3d import Poly3DCollection

    tri = m.triangles
    if len(tri) > 20000:
        tri = tri[np.random.default_rng(0).choice(len(tri), 20000, replace=False)]
    nrm, valido = trimesh.triangles.normals(tri)
    tri = tri[valido]  # descarta triângulos degenerados (senão quebra as cores)
    luz = np.clip(nrm @ np.array([0.4, -0.5, 0.75]), 0, 1)
    cores = np.c_[np.repeat((0.12 + 0.55 * luz)[:, None], 3, 1), np.ones(len(tri))]
    fig = plt.figure(figsize=(12, 4), facecolor="white")
    lo, hi = m.bounds
    c, r = (lo + hi) / 2, (hi - lo).max() / 2
    for i, (el, az, t) in enumerate([(25, -60, "iso"), (0, -90, "frente"), (90, -90, "topo")]):
        ax = fig.add_subplot(1, 3, i + 1, projection="3d")
        ax.add_collection3d(Poly3DCollection(tri, facecolors=cores, linewidths=0))
        for f, k in zip((ax.set_xlim, ax.set_ylim, ax.set_zlim), range(3)):
            f(c[k] - r, c[k] + r)
        ax.set_box_aspect((1, 1, 1)); ax.view_init(el, az); ax.set_title(t); ax.set_axis_off()
    fig.tight_layout(); fig.savefig(saida, dpi=110); plt.close(fig)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("novo"); ap.add_argument("--ref"); ap.add_argument("--escala", type=float, default=1.0)
    ap.add_argument("--png"); ap.add_argument("--3mf", dest="tmf")
    ap.add_argument("--mesa", type=float, nargs=3, default=[180, 180, 180])
    ap.add_argument("--parede", type=float, default=1.2); ap.add_argument("--tol", type=float, default=0.3)
    ap.add_argument("--material", default="PLA")
    a = ap.parse_args()

    r = medir(a.novo, a.material)
    m = carregar(a.novo)
    falhas = []
    if not r["fechado"]:
        falhas.append("malha aberta (não é watertight)")
    if not r["normais_ok"]:
        falhas.append("normais invertidas/inconsistentes")
    if any(e > l for e, l in zip(sorted(r["caixa_mm"]), sorted(a.mesa))):
        falhas.append(f"não cabe na mesa {a.mesa}: cortar em partes com pino/encaixe")
    p = r["parede_mm"] or {}
    if "p5" in p and p["p5"] < a.parede - 0.05:
        falhas.append(f"parede fina: p5={p['p5']} mm (mín {a.parede})")

    if a.ref:
        ref = medir(a.ref, a.material)
        alvo = [v * a.escala for v in ref["caixa_mm"]]
        dif = [round(n - t, 2) for n, t in zip(r["caixa_mm"], alvo)]
        r["ref_caixa_mm"], r["dif_caixa_mm"] = [round(v, 2) for v in alvo], dif
        if any(abs(d) > a.tol for d in dif):
            falhas.append(f"caixa fora de ±{a.tol} mm da referência: {dif}")

    r["orientacao"] = orientacao(m)
    if a.png:
        preview(m, a.png); r["png"] = a.png
    if a.tmf:
        try:
            m.export(a.tmf); r["3mf"] = a.tmf
        except Exception as e:
            r["3mf_erro"] = str(e)[:80]
    r["falhas"], r["ok"] = falhas, not falhas
    print(json.dumps(r, ensure_ascii=False, indent=1))
    sys.exit(0 if r["ok"] else 1)


if __name__ == "__main__":
    main()
