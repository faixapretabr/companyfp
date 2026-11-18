# Dados da Faixa Preta: dicionário e regras

Projeto Supabase `faixa-preta` (São Paulo, plano gratuito, RLS ligado em todas as tabelas). É a base viva do painel e da operação. Leitura e escrita exigem login. Chave e senha nunca entram no repositório.

## O que mora em cada tabela
| Tabela | O que guarda | Quem escreve |
|---|---|---|
| `decisoes` | Decisões e pedidos ao João. Estados: aberta, aguardando, em-execucao, decidida, arquivada | Cláudio, Osvaldo; João decide |
| `tarefas` | Quadro de tarefas. Estados: pendente, fazendo, aprovacao, decidir, concluida | Cada dono; Osvaldo organiza |
| `produtos` | Os 10 objetos (FP-001 a FP-010): nome, etapa E1 a E6, medidas, peso, material, pendências | Vicente, Cláudio |
| `arquivos` e `produto_fotos` | Fotos, STL e PDF por produto (arquivo vai no storage) | Quem sobe pelo painel |
| `ouvidoria` | Auditoria, ideias e reclamações | Qualquer um do time |
| `pessoas`, `status` | Time e o estado de cada um no Escritório LIVE | Cada pessoa grava o seu |
| `chamadas` | Campainha do Escritório | Painel |
| `eventos_log` | Registro de quem fez o quê | Automático |

## Regras
1. **Uma coisa, um lugar.** Registro que muda toda hora (tarefa, decisão aberta, etapa do produto) vive só no Supabase. O repositório não mantém cópia editável.
2. **Texto e regra vivem no repositório** (`CLAUDE.md`, `DECISOES.md`, `docs/base/`). Decisão do João que vira regra entra em `DECISOES.md`.
3. **O repositório guarda uma foto datada** em `docs/snapshot-supabase.md`, para quem não tem acesso ao banco. Foto não é fonte: em caso de diferença, vale o Supabase.
4. **Carga de item novo no Supabase** só depois de aprovado, sem duplicar (tarefa OP-T01).
5. **Escritório LIVE:** o status do time tem hoje duas descrições, a tabela `status` e o Worker `escritorio-fp-realtime`. Fica a tabela `status` como registro; o Worker só serve a tela em tempo real. Confirmar com o Dante se o painel ainda grava no Worker.
6. **Nunca** senha, chave, CPF, CNPJ ou dado bancário em arquivo do repositório.

## Como atualizar a foto
Cláudio consulta `decisoes`, `tarefas`, `produtos` e `pessoas` pelo conector Supabase, regrava `docs/snapshot-supabase.md` com a data e faz commit. Rotina: a cada mudança grande e toda sexta, junto do relatório semanal.
