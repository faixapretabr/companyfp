# Faixa Preta: porta de entrada

Todo chat, Claude Code e sessão na nuvem começa por aqui. Depois lê `CLAUDE.md`.

## Onde mora cada coisa (fonte única)
| O quê | Fonte de verdade | Observação |
|---|---|---|
| Regras, combinados, marca, papéis | `CLAUDE.md` | Vale acima de qualquer outro documento |
| Decisões do João que viram regra | `DECISOES.md` | Nova decisão entra com data |
| Conhecimento da empresa (marca, conteúdo, catálogo, processo, loja, MEI, painel) | `docs/base/FP_BASE_COMPLETA_v01_20261115.md` | VIGENTE. Atualizar sobe a versão |
| Agentes M, O e I | `.claude/agents/` | Um cartão por agente, só letra e número |
| Agentes, skills e conectores (visão geral) | `docs/agentes-e-skills.md` | Referência |
| Arquitetura original dos agentes | `docs/arquitetura-agentes.md` | Referência |
| Decisões em aberto, tarefas, produtos, ouvidoria, status | **Supabase `faixa-preta`** | Sistema vivo. O painel lê daqui |
| Dicionário das tabelas e regras de escrita | `docs/dados.md` | |
| Onde o trabalho parou (memória recente) | `docs/registro-contexto.md` | Ler logo depois deste arquivo. Atualizar ao fim de cada sessão |
| Foto datada do Supabase | `docs/snapshot-supabase.md` | Só leitura. Se divergir, vale o banco |
| Relatórios de agentes | `docs/relatorios/` | Um arquivo por entrega, com data |
| Tela do Escritório em tempo real | Worker `escritorio-fp-realtime` | Só a tela. Registro do status é a tabela `status` |
| Loja e pedidos | Shopify | Trial, nada publicado |
| Identidade visual | Drive, pasta 00_MARCA | Drive é espelho, não fonte (decisão 8) |

## Quando duas fontes se contradizem
1. Decisão do João, em `DECISOES.md` ou decidida no Supabase.
2. `CLAUDE.md`.
3. Base `docs/base/`.
4. Manual de marca e arquivos técnicos de produto no Drive.
5. O resto é histórico.

Divergência achada não se corrige em silêncio: registrar em `DECISOES.md` e corrigir a fonte menor.

## Regra de ouro
Texto e regra no repositório. Registro que muda toda hora no Supabase. Nunca duas fontes editáveis para a mesma coisa.

## Fluxo para não perder trabalho entre chat, Code e nuvem
1. Começar lendo `CONTEXTO.md`, `docs/registro-contexto.md` e `CLAUDE.md`. Para estado do dia, `docs/snapshot-supabase.md` ou o próprio Supabase.
1b. Ao encerrar, atualizar `docs/registro-contexto.md` (feito, em andamento, próximo passo, o que precisa do João).
2. Todo arquivo novo ou alterado entra por commit na branch da sessão.
3. Decisão nova do João: registrar no mesmo commit.
4. Chaves nunca no repositório. Ficam no cofre.
5. Atualizar a foto do Supabase a cada mudança grande e toda sexta.

## Pendências de organização
- `manual/` (8 procedimentos em manual curto) ainda não existe. Catálogo já tem casa: tabela `produtos` e arquivo 04 da base.
- Ativação dos agentes: fase 1 = I03 e I04 (decisão 11). G, E e P (Osvaldo, Dante, Vicente) existem fora do repositório e não têm cartão aqui.
- Tarefas OP-T09 e OP-T10 (Cláudio) e OP-T01 (Osvaldo) cuidam do saneamento do Drive e das pendências antigas.
