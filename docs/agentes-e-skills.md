# Faixa Preta: agentes e skills

Documento de referência da equipe de agentes e das skills da marca Faixa Preta.
Data de referência: 17/11/2026.

---

## 1. Visão geral

A operação da Faixa Preta é tocada por uma equipe de agentes, liderada pelo Cláudio, que decide e entrega o trabalho pronto. O João (dono da marca) decide apenas o que exige decisão dele: gasto e primeiro login.

Ferramentas de IA da equipe:

- **Claude**: Cláudio, head da operação.
- **Instinct (beta, sem limite)**: Departamento Gestão, coordenador do time de agentes independentes.
- **Meta AI**: Severino, produção de mídia, redes sociais e conteúdo.

---

## 2. Agentes

| Agente | Papel | Ferramenta |
|---|---|---|
| **Cláudio** | Head da operação. Lidera, decide, faz a conferência final das entregas e o deploy direto no Cloudflare. | Claude |
| **Departamento Gestão** | Coordena o time de agentes independentes. Faz a checagem diária de Drive, Gmail e Worker (somente leitura), cobra prazos da equipe, organiza o Drive sem apagar nada e envia um resumo diário de no máximo 10 linhas. | Instinct (ilimitado) |
| **Departamento de Produtos** | Produtos e modelagem. | Agente da equipe |
| **Departamento Ecommerce** | Tecnologia e ferramentas. | Agente da equipe |
| **Helena** | Marketing e design. | Agente da equipe |
| **Severino** | Produção de mídia, redes sociais e conteúdo. | Meta AI |

Bento, Dora e Nilo eram da equipe de marketing da Helena e deixaram o time.

### Responsabilidades do Cláudio

- Decisões da operação.
- Fila de decisões para o João, com no máximo 3 itens, sempre com a recomendação na frente.
- Conferência final das entregas antes de qualquer publicação.
- Deploy direto no Cloudflare, autorizado pelo João em 15/11/2026.
- Rascunhos de texto do Departamento Gestão passam por conferência do Cláudio.

### Responsabilidades do Departamento Gestão

- Checagem diária de Drive, Gmail e Worker, só para leitura.
- Cobrança de prazos da equipe.
- Organização do Drive, sem apagar arquivos.
- Resumo diário de no máximo 10 linhas, com: estado, o que mudou, pendências com dono e prazo, e o que precisa do João.

O Cláudio lê só o resumo e a fila, não os arquivos inteiros. Isso economiza a cota do Cláudio.

---

## 3. Fluxo de comunicação

```
João → Cláudio (chat) → Departamento Gestão (e-mail) → Departamento de Produtos / Departamento Ecommerce / Helena / Severino (campainha ou Slack)
```

Regras:

- Pedidos ao Departamento Gestão passam por e-mail, com a palavra de acionamento no corpo. Sem ela, o Departamento Gestão não executa. A palavra fica registrada no cofre da equipe, não neste documento.
- Todo e-mail ao Departamento Gestão pede um prazo, e o prazo vai escrito no próprio e-mail. O Cláudio agenda uma tarefa para conferir a resposta nessa hora.
- O Departamento Gestão também pode falar com o Cláudio direto pelas sessões, além do e-mail.
- Credenciais e senhas nunca vão por e-mail nem para canal público.
- Departamento Gestão e Cláudio trabalham como um time, em harmonia.

### Regra de decisão

- Só gasto e primeiro login ficam com o João.
- A palavra do Cláudio vale como a do João para executar, incluindo publicação.
- Se algo estiver pendente há mais de 12 horas, ou já tiver sido cobrado do João duas vezes, o Cláudio pode decidir o que for melhor para a Faixa Preta.
- Se o Cláudio discordar de uma decisão do João ou vir risco, avisa uma vez, com clareza, e depois executa o que o João decidir.

---

## 4. Skills da marca

| Skill | Para que serve | Observações |
|---|---|---|
| **replicador-3d** | Recebe um STL de referência e entrega uma versão nova, refeita com design próprio, sem copiar e sem fugir muito do original. Pronta para imprimir. | Entrega STL e script editável. Pergunta antes de construir (impressora, material etc.). |
| **anuncio-3d** | Anúncio de peça 3D. | |
| **impressao-3d** | Impressão na Bambu Lab A1 mini com o Bambu Studio. | PLA como padrão; PETG quando pedir resistência. |
| **mobile-pwa-ux-frontend** | Painel e PWA, mobile first. | Segue a identidade da marca no Drive. |
| **caveman** | Respostas curtas. | |
| **video-making** | Produção de vídeos. | |
| **docs, xlsx, pptx, pdf, docx** | Documentos, planilhas, apresentações e PDFs. | |

Missão do replicador-3d: o objeto mais leve possível, porém resistente, com qualidade aceitável.

---

## 5. Regras de marca e de trabalho

- Antes de qualquer material visual, ler a identidade da marca na pasta 00_MARCA do Drive (FaixaPreta).
- Produto só vai à venda com o piloto aprovado na mão. Não existe "versão modelo": a regra é desenvolver, imprimir o protótipo, ajustar, imprimir o piloto e aprovar. A produção é sob demanda.
- O catálogo inicial é fechado: os 10 objetos (FP-001 a FP-010) lançam juntos.
- O painel e os materiais seguem o manual de marca.
- Antes de mexer na loja Shopify, checar o plano e avisar que o trial limita vendas.
- Só planos gratuitos. Nenhum upgrade pago sem decisão do João.

---

## 6. Conectores e ferramentas

Conectados e conferidos em 17/11/2026:

- **Shopify**: loja "Minha loja", em BRL, fuso -03, Brasil. Plano trial, ainda sem vendas. Usar para produtos, pedidos, clientes, análises e temas.
- **Google Drive**: pasta FaixaPreta, com 00_MARCA (identidade visual) e os documentos base.
- **Gmail**: conta da marca, para leitura e rascunhos. Envio só com decisão do João.
- **Google Calendar**: agenda da conta da marca. Confirmar o fuso antes de marcar compromisso.
- **Slack**: canal #geral como base de dados da marca. Só conteúdo de marca, com data e fonte.
- **Cloudflare**: Worker escritorio-fp-realtime, que é o Escritório do painel.
- **Netlify**: conta da marca, sem site ainda.
- **Windsor.ai**: Instagram e TikTok orgânico, em plano trial.
- **Supabase**: projeto "faixa-preta", região São Paulo, plano gratuito. É a base do painel.

Pendências (dependem do João):

- Shopify em trial: escolher plano para começar a vender.
- Windsor.ai: sem plano pago.
- Amazon Selling Partner: conexão incompleta, exige login do João.
- Dropbox: conexão incompleta, exige login do João.
- TikTok for Business: conectado, ainda não testado.

---

## 7. Painel FP

Central com cinco blocos:

1. **Escritório LIVE**: escritório em pixel art, estilo Habbo, com o status de cada agente.
2. **Gerência**: itens para o João em fila de 3 faixas, equipe e regras de trabalho.
3. **Banco de Desenvolvimento**: lê do Supabase, que é a fonte do painel.
4. **Tarefas**.
5. **Ouvidoria**: auditoria, ideias e reclamações.

Requisitos: mobile first, responsivo, minimalista, fiel ao manual de marca, layout PWA. A home tem navbar com menu hambúrguer, uma página para o Escritório e páginas individuais para o restante. Inclui links úteis: identidade visual, Drive e login da loja Shopify.

---

## 8. Produtos

Os 10 objetos (FP-001 a FP-010) estão cadastrados na Shopify como rascunho de teste, sem imagens, sem publicação e com preço sugerido só para teste.

| Código | Preço de teste (BRL) |
|---|---|
| FP-001 (Fundo Mágico) | 159,90 |
| FP-002 | 89,90 |
| FP-003 | 119,90 |
| FP-004 | 49,90 |
| FP-005 | 39,90 |
| FP-006 | 69,90 |
| FP-007 | 59,90 |
| FP-008 | 79,90 |
| FP-009 | 99,90 |
| FP-010 | 19,90 |

Lista oficial: FP_PROD_LISTA-REAL-RASCUNHO_v17, na pasta 01_PRODUTOS/00 - Controle do Drive. Nenhum objeto foi aprovado pelo João ainda, então nada vai ao ar.

Kit mínimo de cada objeto: ficha técnica, prancha, STL, piloto e textos.

---

## 9. Pendências deste repositório

- [x] Repositório criado e acessível nesta sessão (`faixapretabr/companyfp`, privado).
- [ ] Reconectar o GitHub (o token da sessão está inválido; o conector precisa ser refeito em Settings → Connectors no claude.ai).
- [ ] Subir o commit inicial já preparado localmente.
- [x] Confirmar visibilidade: privado.
