---
name: "diagnostico-falha"
description: "Use quando uma impressão 3D deu errado: foto ou sintoma vira causa e correção na Bambu A1 mini. Triggers: warping, descolou, stringing, fio, camada solta, delaminação, entupiu, sub-extrusão, elefante, falha de impressão, peça torta, ficou feio."
---

# Diagnóstico de falha (A1 mini)

Entrada: foto, sintoma e, se tiver, perfil usado. Saída: **causa provável → correção → teste curto** pra confirmar.

## Fluxo
1. Ler o diário `.claude/memoria-3d/aprendizados.md`: já aconteceu antes?
2. Identificar o sintoma na tabela. Mais de uma causa possível: começar pela mais barata de testar.
3. Mudar **um** parâmetro por vez. Cupom pequeno, não a peça inteira.
4. Registrar no diário: sintoma, causa real, ajuste que resolveu.

## Tabela rápida
| Sintoma | Causa provável | Correção |
|---|---|---|
| Canto levantando (warping) | Mesa suja, 1ª camada fria, corrente de ar | Lavar placa com detergente, mesa +5 °C, brim 3–5 mm |
| Fios entre partes (stringing) | Filamento úmido, temp. alta, retração curta | Secar filamento, −5 °C, retração +0,2 mm |
| Camada solta (delaminação) | Temp. baixa, ventoinha alta | +5–10 °C, ventoinha −20% |
| Base esparramada (pé de elefante) | 1ª camada esmagada, mesa quente demais | Chanfro 0,4 mm na base, mesa −5 °C |
| Falhas/buracos (sub-extrusão) | Bico parcialmente entupido, úmido, velocidade alta | Cold pull, secar, reduzir velocidade |
| Superfície ondulada | Ressonância, velocidade alta | Recalibrar (vibração), reduzir aceleração |
| Encaixe não entra | Tolerância curta, pé de elefante | +0,1 mm de folga, ver `modelagem-cad` |
| Preto brilhante/irregular | Temp. alta, velocidade variável na parede | Ver `materiais-acabamento` |

Hipótese não confirmada por teste é "provável", nunca "certeza".
