"""Template paramétrico CadQuery. Copie, renomeie e troque o bloco GEOMETRIA.
Rodar: python -I modelo_base.py  → gera <NOME>.stl ao lado.
Exemplo: porta-objetos com furo de fixação, base chanfrada e cantos arredondados."""
import os
import cadquery as cq

# ===== MEDIDAS (mm) — edite aqui =====
NOME = "peca_nova"
LARG, PROF, ALT = 60.0, 60.0, 90.0   # caixa externa (igual à referência)
PAREDE = 2.0                         # ≥ 1.2
FUNDO = 2.0                          # ≥ 0.8
RAIO_EXT = 6.0                       # cantos verticais
RAIO_INT = 1.0                       # ≥ 1 (alivia tensão)
CHANFRO_BASE = 0.4                   # anti pé-de-elefante
FURO_D = 4.0                         # furo de fixação no fundo (0 = sem)
FOLGA = 0.25                         # por lado, ver referencias/tolerancias.md
# ======================================

# ===== GEOMETRIA =====
corpo = (cq.Workplane("XY").rect(LARG, PROF).extrude(ALT)
         .edges("|Z").fillet(RAIO_EXT)
         .faces("<Z").edges().chamfer(CHANFRO_BASE))

oco = (cq.Workplane("XY").workplane(offset=FUNDO)
       .rect(LARG - 2 * PAREDE, PROF - 2 * PAREDE).extrude(ALT)
       .edges("|Z").fillet(max(RAIO_EXT - PAREDE, RAIO_INT))
       .faces("<Z").edges().fillet(RAIO_INT))
peca = corpo.cut(oco)

if FURO_D:
    peca = peca.faces("<Z").workplane().hole(FURO_D + 2 * FOLGA)
# =====================

saida = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"{NOME}.stl")
cq.exporters.export(peca, saida, tolerance=0.01, angularTolerance=0.1)
print(saida)
