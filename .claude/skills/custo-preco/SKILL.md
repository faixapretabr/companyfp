---
name: "custo-preco"
description: "Use para calcular custo real de uma peça impressa em 3D e sugerir preço de venda: filamento, energia, tempo de máquina, desgaste, falha, embalagem, taxa de marketplace e margem. Triggers: quanto custa, custo da peça, preço de venda, margem, quanto cobrar, precificar."
---

# Custo e preço (FP)

Saída: tabela de custo por peça + preço sugerido + o que é premissa "a verificar".

## Entradas (do fatiador: Bambu Studio)
Peso (g), tempo (h), material, preço do rolo (R$/kg), tarifa de energia (R$/kWh).

## Fórmula
| Item | Cálculo | Padrão se faltar dado |
|---|---|---|
| Filamento | peso × R$/kg ÷ 1000 | a verificar |
| Energia | horas × 0,08 kW × R$/kWh | A1 mini ~80 W médios; tarifa a verificar |
| Máquina | horas × (valor impressora ÷ 2000 h) | vida útil 2000 h até manutenção pesada |
| Bico/peças | horas × R$ 0,10 | estimativa |
| Falha | (soma acima) × 10% | até ter histórico real |
| Acabamento | minutos × valor da hora | ver `materiais-acabamento` |
| Embalagem | real | a verificar |
| **Custo total** | soma | |

## Preço
- Base: custo total × 3 (margem de mão de obra, projeto e risco).
- Somar taxa do canal (marketplace/gateway) **por cima**, nunca engolir.
- Checar contra 2–3 concorrentes. Fora da faixa: explicar por quê (é marca, não commodity).
- Peso e frete só valem com peça física pesada na balança.

## Limite
O Cláudio define o preço por esta skill (João, 19/11/2026) e o João pode vetar. Gasto fora do teto é do João. Regime fiscal não é parecer: "a verificar".
