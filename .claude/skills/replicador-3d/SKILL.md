---
name: "replicador-3d"
description: "Use when the user sends an STL/3MF/OBJ or a 3D object and wants it redesigned, rebuilt, cloned or improved into a new print-ready version without copying the original mesh. Triggers on replicar, refazer, recriar, reproduzir, clonar, melhorar peça 3D, STL de referência, sem licença, pronto para imprimir."
---

# Replicador 3D v2

Entra um modelo de referência, sai uma versão **nova, melhor e pronta pra imprimir**. Mesma função, mesmo encaixe, mesmo tamanho. Malha própria. Você decide e executa; não pede permissão a cada passo.

## 0. Assume e segue (não pergunte à toa)
Padrões FP, sem perguntar:
- Impressora Bambu A1 mini, mesa 180×180×180 mm, bico 0,4, camada 0,2.
- PLA preto fosco, 3 perímetros, 15% gyroid.
- Folga por tipo de encaixe: ver `referencias/tolerancias.md`.
- Tamanho igual ao original.

Só pergunte (uma rodada, AskUserQuestion) se faltar algo **bloqueante**: medida de rosca/parafuso/objeto externo que precisa bater e não dá pra tirar do arquivo. Todo o resto: assume e lista na entrega.

## 1. Medir (números, nunca a malha)
`python -P -E scripts/medir.py original.stl` → JSON com caixa, volume, peso estimado, parede mínima, furos prováveis, % de balanço >45°.
Daí, escreva em 3 linhas: função, interfaces que não mudam (furos, apoios, altura útil), pontos fracos.
Proibido reaproveitar triângulos ou vértices do original.

## 2. Marca
Logo, texto de marca, embalagem ou detalhe decorativo protegido: **não reproduz, redesenha com geometria própria e avisa em 1 linha**. Só para e pergunta se o objeto inteiro for a identidade de um produto (trade dress/patente clara).

## 3. Modelar paramétrico
Copie `scripts/modelo_base.py` (CadQuery) e preencha. Medidas no topo como variáveis. Regras DFM obrigatórias:
- Parede ≥ 1,2 mm; piso/teto ≥ 0,8 mm.
- Balanço ≤ 45° (chanfro ou arco); ponte ≤ 10 mm.
- Raio interno ≥ 1 mm; chanfro 0,4 mm na base (anti pé-de-elefante).
- Furo vertical: +0,2 mm no diâmetro. Furo horizontal: topo em gota/losango.
- Não cabe na mesa → corta em partes com pino ou cauda de andorinha.
- Marca FP: por fora preto, fosco, limpo, sem logo grande. Se fizer sentido, proponha a **segunda função escondida** sem mudar a aparência.

## 4. Validar em loop (até 3 voltas, sozinho)
`python -P -E scripts/validar.py novo.stl --ref original.stl --png preview.png`
Tem que sair `"ok": true`: fechado, normais certas, cabe na mesa, parede ≥ 1,2, caixa dentro de ±0,3 mm da referência (ou da escala pedida). Falhou → corrige o script e roda de novo. Não entrega com erro conhecido; se após 3 voltas ainda falhar, entrega e diz exatamente o que falta.
Olhe o PNG antes de entregar.

## 5. Entregar (curto, pro celular)
1. `novo.stl` (e `.3mf` se pedirem).
2. Script `.py` com variáveis.
3. `preview.png`.
4. Resumo em até 6 linhas: manteve / mudou e por quê / orientação e suporte / gramas e tempo estimados (do validar) / padrões assumidos.

Dependências (se faltar): `pip install trimesh numpy matplotlib rtree lxml cadquery`.
Rode os scripts com `python -P -E` (não `-I`, que esconde os pacotes do usuário).
