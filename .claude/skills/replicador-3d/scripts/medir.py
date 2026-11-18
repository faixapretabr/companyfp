"""Mede um modelo 3D (STL/3MF/OBJ) e imprime JSON. Uso: python -I medir.py arquivo.stl [--material PLA]"""
import argparse, json, math, sys

import numpy as np
import trimesh

DENS = {"PLA": 1.24, "PETG": 1.27, "ABS": 1.04, "ASA": 1.07, "RESINA": 1.15}
PAREDE, INFILL, G_POR_H = 1.2, 0.15, 20.0  # mm, fração, g/h aprox. A1 mini


def carregar(caminho):
    m = trimesh.load(caminho, force="mesh")
    if m.is_empty:
        sys.exit(f"vazio: {caminho}")
    return m


def balanco(m, cima=(0, 0, 1)):
    """% da área com balanço >45° quando 'cima' aponta pra cima (ignora a face que apoia na mesa)."""
    d = np.asarray(cima, float)
    dot = m.face_normals @ d
    alt = m.triangles_center @ d
    base = alt.min()
    ruim = (dot < -math.cos(math.radians(45))) & (alt > base + 0.3)
    return float(m.area_faces[ruim].sum() / m.area * 100)


def parede_min(m, amostras=3000):
    """Espessura local: raio de cada face pra dentro até bater na parede oposta."""
    try:
        idx = np.random.default_rng(0).choice(len(m.faces), min(amostras, len(m.faces)), replace=False)
        orig = m.triangles_center[idx] - m.face_normals[idx] * 1e-3
        dirs = -m.face_normals[idx]
        loc, ray, _ = m.ray.intersects_location(orig, dirs, multiple_hits=False)
        if not len(ray):
            return None
        d = np.linalg.norm(loc - orig[ray], axis=1)
        d = d[d > 0.05]
        return {"min": round(float(d.min()), 2), "p5": round(float(np.percentile(d, 5)), 2),
                "mediana": round(float(np.median(d)), 2)}
    except Exception as e:  # rtree/embree ausente
        return {"erro": str(e)[:80]}


def furos(m):
    """Laços circulares em cortes no meio de cada eixo → diâmetros prováveis de furos/pinos."""
    achados = set()
    for eixo in range(3):
        n = np.zeros(3); n[eixo] = 1
        o = m.bounds.mean(axis=0)
        try:
            sec = m.section(plane_origin=o, plane_normal=n)
            if sec is None:
                continue
            p2d = sec.to_2D()[0] if hasattr(sec, "to_2D") else sec.to_planar()[0]
            for laco in p2d.discrete:
                if len(laco) < 8:
                    continue
                x, y = laco[:, 0], laco[:, 1]
                area = abs(0.5 * np.sum(x * np.roll(y, 1) - np.roll(x, 1) * y))
                per = np.linalg.norm(np.diff(laco, axis=0), axis=1).sum()
                if per and 4 * math.pi * area / per ** 2 > 0.9:
                    achados.add(("XYZ"[eixo], round(2 * math.sqrt(area / math.pi), 1)))
        except Exception:
            pass
    return [{"eixo": e, "diametro": d} for e, d in sorted(achados)]


def medir(caminho, material="PLA"):
    m = carregar(caminho)
    ext = m.extents
    fechado = bool(m.is_watertight)
    vol = abs(m.volume) if fechado else m.convex_hull.volume
    casca = min(vol, m.area * PAREDE)
    vol_imp = casca + (vol - casca) * INFILL  # mm³
    g = vol_imp / 1000 * DENS.get(material.upper(), 1.24)
    return {
        "arquivo": caminho,
        "caixa_mm": [round(float(v), 2) for v in ext],
        "volume_cm3": round(vol / 1000, 2),
        "volume_aprox": not fechado,
        "fechado": fechado,
        "normais_ok": bool(m.is_winding_consistent and (not fechado or m.volume > 0)),
        "triangulos": int(len(m.faces)),
        "parede_mm": parede_min(m),
        "balanco_45_pct": round(balanco(m), 1),
        "furos_provaveis": furos(m),
        "peso_g": round(g, 1),
        "tempo_h": round(g / G_POR_H, 1),
        "material": material.upper(),
    }


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("arquivo")
    ap.add_argument("--material", default="PLA")
    a = ap.parse_args()
    print(json.dumps(medir(a.arquivo, a.material), ensure_ascii=False, indent=1))
