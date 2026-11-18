---
name: "modelagem-cad"
description: "Use para desenhar peça 3D do zero ou mecanismo escondido: OpenSCAD/CadQuery paramétrico, tolerância, encaixe, rosca, dobradiça, compartimento oculto, divisão de peça grande. Triggers: modelar, desenhar peça, CAD, OpenSCAD, CadQuery, encaixe, tolerância, compartimento secreto, dividir peça."
---

# Modelagem CAD (FP)

Peça nova sai **paramétrica** (medidas em variáveis no topo do arquivo), pronta pra exportar STL/3MF.

## Fluxo
1. Medidas reais primeiro (objeto do cotidiano de referência). Sem medida = "a verificar".
2. Modelo paramétrico em OpenSCAD (padrão) ou CadQuery (quando precisar de filete/chanfro complexo).
3. Função escondida por último, sem marca visível por fora.
4. Exportar e checar: manifold, cabe em 180 x 180 x 180 mm, parede ≥ 1,2 mm (3 perímetros de 0,4).
5. Gerar cupom de teste (fatia só do encaixe) antes da peça inteira.

## Tolerâncias base (A1 mini, PLA, bico 0,4)
| Encaixe | Folga por lado |
|---|---|
| Justo / pressão | 0,10–0,15 mm |
| Deslizante | 0,20–0,25 mm |
| Solto / giro | 0,30–0,40 mm |
| Rosca impressa | passo ≥ 1,5 mm, folga 0,3 mm |
| Ímã embutido | furo +0,2 mm no diâmetro |

Valores são ponto de partida: o cupom manda. Ajuste confirmado vai pro diário `.claude/memoria-3d/aprendizados.md`. Referência complementar: `.claude/skills/replicador-3d/referencias/tolerancias.md`.

## Regras de projeto
- Evitar suporte: chanfro 45° no lugar de beiral, ponte ≤ 20 mm.
- Face visível pra cima ou na lateral; face da mesa é a menos nobre.
- Junta escondida (compartimento, tampa) segue a linha natural do objeto.
- Peça > mesa: dividir com cavilha ou encaixe rabo-de-andorinha, junta em aresta, não em face lisa.
- Nada de logo grande. Marca, se tiver, embaixo e discreta.

## Regras aprendidas (diário, erro repetido 2x)
- Rodar sempre com `py -3.12 -I` (o Python 3.13 da Store não acha o CadQuery com `-I`).
- Medir a parede mínima **antes** de exportar: peça somada encostando em chanfro ou encaixe gera lasca fina (0,06–0,12 mm já apareceram 2 vezes).
- Peça móvel (dobradiça, gaveta, rosca, tampa): simular o curso inteiro (0–180°, 0–curso total) desde o primeiro rascunho, não só no fim.
- Booleano no CadQuery pode falhar em silêncio (sólido vazio ou sem a peça somada): depois de todo union/cut, `assert isValid()` + conferir volume. Filete por sweep helicoidal: base do dente < passo e unir com `fuse(..., tol=1e-3)` (visto no [04]).
- Parede mínima densa pela função/perfil (barato); raio na malha só como amostra (trimesh sem embree é lento).
- Recortes se encontram a 90°, nunca em cunha aguda (cunha = lasca; visto no [05]).
- Texto gravado: letra por letra, e parede mínima medida fora da gravação (ilha de letra é cosmética, declarar).
- Ponta arredondada por fillet, não por esfera somada (esfera deixa triângulo solto, STL não fecha).
- Trava (detente): precisa de mola (lingueta flexível) e interferência maior que a folga total; simular com a peça apoiada no pior lado. Batente se valida por ângulo/folga, não por volume (visto no [06]).
- Medidor de parede: filtrar quina convexa (dá falso fino); rampa de detente ≤ 45° (mais que isso trava duro); cone não termina em ponta no eixo, usar fundo plano (visto no [07]).
- Escolher a orientação de impressão antes do mecanismo (mola flexiona no plano da camada, não contra ela); borda de trilho/prateleira nasce com ≥ 1,2 mm (visto no [08]).
- Peça articulada: conferir quanto a borda avança no arco (≈ d²/2r) contra a folga antes de desenhar; pior lado soma o jogo do pino; nunca 2 recortes na mesma aresta (visto no [09]).
