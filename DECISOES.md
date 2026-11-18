# Decisões da Faixa Preta

Registro único das decisões do João. Nova decisão entra no topo, com data.

## Decisões já tomadas
1. **Claude é o head da FP.**
2. **Catálogo inicial fechado:** os 10 objetos lançam juntos (não só 3).
3. **Regra de venda:** desenvolver, imprimir protótipo, ajustar, imprimir a versão modelo. Só vende com o produto final aprovado na mão, produzindo sob demanda.
4. **Time:** Osvaldo, Helena, Dante, Vicente e Meta. Bento, Dora e Nilo (marketing da Helena) saíram.
5. **Painel e materiais** seguem a identidade da marca.
6. **Deploy direto no Cloudflare** autorizado pelo João em 15/11/2026.
7. **Plataforma de venda:** só Shopify (15/11/2026). Nuvemshop e Nuvem Pago descartados.
8. **Fonte única de verdade:** repositório GitHub `faixapretabr/companyfp`. Drive e Docs viram espelho, não fonte (17/11/2026).
9. **Organograma (18/11/2026):** Osvaldo é Gestão Geral (G01). Dante é E-commerce e Vicente é Produto, sem cartão de agente no repositório: departamentos E e P não são criados. Os cartões criados em `.claude/agents/` são M01 a M04, O01 a O04 e I01 a I08, um por agente, identificados só por letra e número. Helena fica como M01 e Severino como M02 (produção de mídia e conteúdo). A ativação de cada agente vem depois, por fase.

10. **Consolidação (18/11/2026):** `CONTEXTO.md` é a porta de entrada e o mapa de fontes. Texto e regra no repositório; dados vivos do painel no Supabase; Worker só para o status do Escritório. Arquivos antigos ficam onde estão, sem mover.

11. **Ativação (18/11/2026):** fase 1 liga só I03 (ofertas) e I04 (preço), em leitura e relatório, sem publicar nem gastar. Qualquer ação de coleta automatizada passa antes pelo I07. Documento de arquitetura guardado em `docs/arquitetura-agentes.md`.

12. **Limpeza (18/11/2026):** `FP_BASE_COMPLETA_v01` foi movida para `docs/arquivo/` (corrigido na decisão 13). Branches antigas apagadas pelo Osvaldo.

13. **Fonte de dados (18/11/2026):** o Supabase é o sistema vivo de decisões em aberto, tarefas, produtos, ouvidoria e status; o repositório guarda texto, regras e uma foto datada (`docs/snapshot-supabase.md`). `TAREFAS.md` deixa de ser lista de trabalho. A base `FP_BASE_COMPLETA_v01` volta a ser documento vivo em `docs/base/`. Ordem de prioridade das fontes em `CONTEXTO.md`. Dicionário e regras em `docs/dados.md`.

14. **Decisões delegadas pelo João (18/11/2026):** (a) tabela `status` do Supabase é o registro do status do time e o Worker `escritorio-fp-realtime` só serve a tela; o Dante confirma, pelo Osvaldo. (b) Os 8 itens antigos do `TAREFAS.md` passam pela OP-T01 do Osvaldo antes de entrar no banco. (c) Teste do carrinho autorizado só sem custo e sem publicar objetos; compra com dinheiro real continua com o João. Filamento de teste (cerca de R$ 215): João disse não, nada será comprado.

15. **Registro de contexto (18/11/2026):** `docs/registro-contexto.md` guarda a memória recente (feito, em andamento, próximo passo, o que precisa do João), com os últimos 14 dias. Toda sessão lê depois do `CONTEXTO.md` e atualiza ao encerrar. O que virar regra sobe para este arquivo.

## Plano de 30 dias
Mira o **Natal**. Black Friday seria cedo.

## Nova forma de trabalhar
- Peça física antes do papel.
- 8 procedimentos viram um manual curto (`manual/`, sob demanda).
- Catálogo na tabela `produtos` do Supabase e no arquivo 04 da base; registro de decisões em `DECISOES.md`; quadro de tarefas no Supabase (`TAREFAS.md` só guarda os itens antigos a migrar).
