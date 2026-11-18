# Faixa Preta: porta de entrada

Todo chat, Claude Code e sessão na nuvem começa por aqui. Depois lê `CLAUDE.md`.

## Onde mora cada coisa (fonte única)
| O quê | Fonte de verdade | Observação |
|---|---|---|
| Regras, combinados, marca, papéis | `CLAUDE.md` | Vale acima de qualquer outro documento |
| Decisões do João | `DECISOES.md` | Nova decisão entra com data |
| Tarefas e pendências | `TAREFAS.md` | Quadro do dia a dia |
| Agentes (M, O, I) | `.claude/agents/` | Um cartão por agente, só letra e número |
| Agentes e skills (visão geral) | `docs/agentes-e-skills.md` | Referência |
| Base de conhecimento completa | `FP_BASE_COMPLETA_v01_20261115.md` | Referência detalhada, não muda sozinha |
| Dados vivos do painel (decisões, tarefas, produtos, ouvidoria) | Supabase `faixa-preta` | O painel lê daqui |
| Status do time no Escritório LIVE | Worker `escritorio-fp-realtime` | Só o Escritório usa o Worker |
| Loja e pedidos | Shopify | Trial, nada publicado |
| Identidade visual | Drive, pasta 00_MARCA | Drive é espelho, não fonte (decisão 8) |

## Regra de ouro
Texto e regra ficam no repositório. Registro vivo (linhas que mudam toda hora) fica no Supabase. Nunca duas fontes para a mesma coisa. Se achar duas, vale a da tabela acima e a outra é corrigida.

## Fluxo para não perder trabalho entre chat, Code e nuvem
1. Começar lendo `CONTEXTO.md` e `CLAUDE.md`.
2. Todo resultado entra por commit no repositório, na branch da sessão.
3. Decisão nova do João: registrar em `DECISOES.md` no mesmo commit.
4. Chaves nunca no repositório. Ficam no cofre.

## Pendências de organização
- `CATALOGO.md` e `manual/` aparecem citados em `DECISOES.md` mas ainda não existem.
- Ativação dos agentes: por fase, depois. G, E e P (Osvaldo, Dante, Vicente) já existem fora do repositório e não têm cartão aqui.
