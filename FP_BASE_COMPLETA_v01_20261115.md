# FP · 00 · LEIA PRIMEIRO

> Base de fonte da Faixa Preta · v01 · 15/11/2026 · Dono: Cláudio (head) · Status: VIGENTE
> Esta base substitui, como referência de trabalho, os procedimentos P01 a P08, as 8 cópias da "Lista Real", as fichas de dossiê e o guia do MEI de 14/11. Os arquivos originais continuam no Drive como histórico.

## Para que serve

Uma fonte só, curta e concreta, para qualquer pessoa ou agente (Cláudio, Departamento Gestão, Departamento de Produtos, Departamento Ecommerce, Helena, Severino) consultar antes de agir. Se uma informação está aqui, ela vale. Se conflita com um arquivo antigo, vale a daqui.

## Os 11 arquivos

| Nº | Arquivo | O que responde |
|---|---|---|
| 00 | LEIA-PRIMEIRO | Como usar a base, regras de manutenção, glossário |
| 01 | EMPRESA-E-TIME | Quem decide o quê, quem faz o quê, como se fala, segurança |
| 02 | MARCA | Conceito, princípios, cores, tipografia, logo, linguagem, foto, embalagem |
| 03 | CONTEUDO-E-LANCAMENTO | Regra 80/20/0, o que mostrar, roteiros, legendas, calendário, checklist |
| 04 | CATALOGO | Os 10 objetos: código, versão, medidas, estado, bloqueios |
| 05 | PROCESSO-DE-PRODUTO | Do pedido à peça aprovada e à produção sob demanda |
| 06 | LOJA-VENDAS-ATENDIMENTO | Loja, domínio, pagamento, frete, políticas, atendimento |
| 07 | ADMIN-FINANCEIRO-MEI | MEI, impostos, nota fiscal, custos e preço |
| 08 | TECNOLOGIA-E-PAINEL | Painel FP, Worker, Pages, Banco de Desenvolvimento, chaves |
| 09 | DECISOES-E-PENDENCIAS | Registro de decisões, pendências por dono, divergências abertas |
| 10 | MAPA-DO-DRIVE | Onde está cada coisa, o que é vigente e o que é histórico |

## Hierarquia de fontes (quando duas coisas se contradizem)

1. Decisão do João, ou do Cláudio em nome dele, registrada no arquivo 09.
2. Esta base.
3. Manual de identidade visual, Apresentação da marca e Guia de conteúdo (PDFs de 14/11 em 00_MARCA e 02_MARKETING).
4. Arquivos técnicos de produto (STL, pranchas, fichas) na pasta de cada objeto.
5. Todo o resto é histórico.

Divergência encontrada vai para a seção "Divergências" do arquivo 09. Não se corrige em silêncio.

## Regras de manutenção

- **Um assunto, um arquivo.** Não criar documento novo para o que cabe num destes 11. Atualizar o arquivo certo.
- **Uma versão viva.** Ao atualizar, subir o número (v01 → v02) e mover a anterior para 99_ARQUIVO. Nada de 8 cópias no mesmo dia.
- **Nome de arquivo:** `FP_AREA_ITEM_vNN_AAAAMMDD.ext`, sem acento nem espaço. Áreas: BASE, MARCA, MKT, PROD, LOJA, ATEND, FIN, ADMIN, TEC.
- **Cabeçalho padrão:** título, versão, data, dono, status (VIGENTE, RASCUNHO ou HISTÓRICO).
- **Estilo:** frase curta, verbo no presente, sem jargão desnecessário. Fato separado de estimativa. Dado sem fonte vira "a confirmar".
- **Nunca** colocar senha, chave, CPF, CNPJ ou dado bancário em nenhum arquivo.
- Quem atualiza: o dono do arquivo (ver cabeçalho). O Cláudio revisa a base inteira uma vez por semana.

## Glossário rápido

- **FP**: Faixa Preta.
- **Coleção GEN**: nome da primeira coleção (decisão do João, 15/11). Substitui o nome provisório "Coleção 05 – Utilitária" dos PDFs de 14/11.
- **Código FP-0NN**: código do objeto, igual ao número do catálogo (FP-001 = [01] Gaveta de mesa ... FP-010 = [10] Parafuso).
- **[NN] x arquivo NN**: [04] entre colchetes é o **objeto** do catálogo (Porta-canetas). "Arquivo 04" é o **arquivo** desta base (Catálogo). Não confundir.
- **Função extra**: a segunda função escondida do objeto.
- **Cupom**: pequena peça de teste impressa para validar um encaixe (snap, rosca, trava) antes da peça inteira.
- **Piloto**: a peça final aprovada pelo João, na mão, que serve de padrão para vender (decisão do João, 15/11; antes chamada "versão modelo").
- **Sob demanda**: só imprime depois do pedido.
- **Fila de 3**: lista de no máximo 3 decisões levadas ao João, com recomendação na frente.
- **Palavra mágica**: senha de texto que valida e-mails entre Cláudio e Departamento Gestão. Não fica escrita nesta base.
- **A1 mini**: impressora 3D de referência (mesa 180 × 180 mm).
- **Painel FP / Escritório LIVE**: central web da operação (arquivo 08).


---

# FP · 01 · EMPRESA E TIME

> Base de fonte da Faixa Preta · v01 · 15/11/2026 · Dono: Cláudio · Status: VIGENTE
> Substitui: seções de responsabilidades de P01 a P08 (14/11) e as regras de comunicação espalhadas em e-mails e Slack.

## O negócio

A Faixa Preta vende objetos do cotidiano, impressos em 3D, que têm uma segunda função prevista no projeto. Venda online, produção sob demanda. Lema: **"Nada é só o que parece."**

Meta atual: lançar a Coleção GEN (10 objetos) mirando o **Natal de 2026**. Black Friday é cedo demais.

## Decisões estruturais do João (valem até ele mudar)

1. O Claude (Cláudio) é o head da operação.
2. O catálogo inicial é fechado: os 10 objetos lançam juntos.
3. Regra de venda: desenvolver → imprimir protótipo → ajustar → imprimir o piloto. **Só vende com o produto final aprovado na mão**, produzindo sob demanda.
4. Time: Departamento Gestão, Departamento de Produtos, Departamento Ecommerce, Helena e Severino (Meta AI). Bento, Dora e Nilo saíram.
5. Todo material e o painel seguem a identidade da marca (arquivo 02).

## Quem é quem

| Nome | Ferramenta | Papel | Entrega típica |
|---|---|---|---|
| **João** | — | Titular. Dono da marca e do dinheiro | Decisões, gasto, primeiro login, impressão, testes físicos |
| **Cláudio** | Claude | Head da operação. Lidera e decide | Base de fonte, prioridades, fila de 3 do João, pedidos ao Departamento Gestão |
| **Departamento Gestão** | Instinct | Coordenação. Executa o que o Cláudio pede e coordena o time | Execução, registro, organização de arquivos, chaves no cofre |
| **Departamento de Produtos** | Instinct | Produto e modelagem 3D (CDP) | STL, prancha, orientação de impressão, correções |
| **Departamento Ecommerce** | Instinct | Tecnologia e ferramentas (CTO); revisão técnica independente | Painel, loja, domínio, integrações, parecer técnico |
| **Helena** | Instinct | Marketing e design | Direção de marca, peças, plano de campanha |
| **Severino** | Meta AI Plus | Mídia, redes sociais e conteúdo | Legendas, roteiros, posts, vídeos curtos (rascunho para aprovação) |

## Alçadas: quem pode o quê

| Ato | Quem autoriza |
|---|---|
| Gasto de qualquer valor (compra, plano, anúncio, impulsionamento) | **Só o João** |
| Primeiro login em qualquer serviço; senhas; CPF, dados bancários e fiscais nas telas oficiais | **Só o João** |
| Imprimir peça e comprar material | **Só o João** |
| Pedir produto novo | **Só o João** |
| Aprovar o piloto de um produto | **Só o João** (teste físico na mão) |
| Publicar, agendar, alterar loja e painel, decidir rotina | Cláudio (a palavra do Cláudio vale como a do João) |
| Decisão técnica dentro do escopo aprovado | Departamento de Produtos (produto), Departamento Ecommerce (tecnologia) |

**Regra das 12 horas:** se algo está parado há mais de 12h esperando o João, ou já foi cobrado dele 2 vezes, o Cláudio decide o que for melhor para a FP e avisa depois. Não vale para gasto, primeiro login, impressão e compra.

## Como a gente se comunica

```
JOÃO
  ↓ chat
CLÁUDIO
  ↓ e-mail (só e-mail, com a palavra mágica no corpo)
DEPARTAMENTO GESTÃO
  ↓ campainha do Escritório ou Slack #batepapo-fp
DEPARTAMENTO DE PRODUTOS · DEPARTAMENTO ECOMMERCE · HELENA · SEVERINO
```

- **João ↔ Cláudio:** chat. O João só recebe o que exige decisão dele, na fila de no máximo 3 itens, com a recomendação na frente.
- **Cláudio ↔ Departamento Gestão:** só por e-mail (endereço do Departamento Gestão no Instinct). Todo e-mail, dos dois lados, leva a palavra mágica no corpo. Sem ela, o Departamento Gestão não executa.
- **Ritmo:** o Cláudio confere a caixa a cada 30 min.
- **Pedido com prazo:** todo pedido traz horário limite ("antes de HH:MM"). O Cláudio agenda a conferência para esse horário. Se não der, o Departamento Gestão avisa **antes** do prazo, com motivo e novo prazo. Terminada a tarefa, volta o ritmo de 30 min.
- **Departamento Gestão ↔ time:** campainha do Escritório ou Slack. O Slack não recebe mais pedidos ao Departamento Gestão.
- **Status do time:** cada membro posta o próprio status no Escritório LIVE, com a sua chave pessoal entregue pelo cofre (decisão do João, 15/11 08h15). Ninguém escreve status no lugar de outro.
- **Registro de fato:** separar sempre PEDIDO (o que foi pedido), RELATO (alguém disse que fez) e VERIFICADO (alguém conferiu, com data e hora).

## Jeito de trabalhar

- Peça física antes de papel. Sem peça na mão não há peso, frete, foto nem loja.
- Entregar pronto e conferido, não plano esperando aprovação.
- Discordou ou viu risco: avisa uma vez, com clareza, e executa o que foi decidido.
- Atualizar a base (arquivos 04 e 09) em vez de criar documento novo.
- Fato separado de estimativa. Medida de malha não é medida física.

## Segurança

- **Nunca** senha, chave, token, CPF, CNPJ ou dado bancário em e-mail, Slack, chat, arquivo ou código. Chaves ficam no cofre, com o Departamento Gestão.
- Autenticação sempre na tela oficial do serviço, pelo titular.
- Dado de cliente circula pelo menor número possível de ferramentas (LGPD). Nada de dado de cliente nos agentes.
- Acessar serviço só pelo endereço oficial digitado, nunca por link recebido.


---

# FP · 02 · MARCA

> Base de fonte da Faixa Preta · v01 · 15/11/2026 · Dono: Helena · Status: VIGENTE
> Resume o Manual de identidade visual (15 p.), a Apresentação da marca (12 p.) e o P01 (14/11). Para o logo, use sempre o arquivo vetorial original em 00_MARCA (FP_MARCA_LOGOS_ICONES_v01_20261114.zip).

## Conceito

A Faixa Preta transforma objetos familiares em objetos com uma segunda função prevista no projeto. O diferencial está no projeto: aparência cotidiana, construção cuidadosa e uma utilidade que não precisa ser anunciada.

- **Lema:** "Nada é só o que parece."
- **Frase-guia:** "Uma função a mais, sem mudar o que você vê."
- **Personalidade:** direta, funcional, precisa, contemporânea, discreta.

## Os 3 princípios (sem exceção)

1. **Aparência familiar.** O objeto não precisa explicar o que faz. Se parece estranho à primeira vista, errou.
2. **Construção precisa.** A precisão está no detalhe: medida, encaixe, acabamento fosco.
3. **Função extra sem anúncio.** A segunda função aparece no uso.

Se um princípio quebra, o produto volta para a prancheta.

## O que a marca é e não é

| É | Não é |
|---|---|
| Objeto do cotidiano | Gadget tecnológico |
| Design funcional | Produto de segurança |
| Precisão técnica | Piada ou pegadinha |
| Utilidade real | Promessa de status |

"Se parecer gadget, voltou para a prancheta."

## Cores — regra 2+1 (60/30/10)

| Cor | Hex | Peso | Uso |
|---|---|---|---|
| Preto absoluto | `#000000` | 60% | Fundo, contorno, estrutura |
| Creme | `#FEF3E6` | 30% | Respiro, papel, área de leitura (alternativa: branco `#FFFFFF`) |
| Amarelo sinal | `#FFC002` | 10% | Só onde está a função extra |

**Regras do amarelo:**
- No máximo **1 elemento amarelo por página ou tela**.
- Pode: seta ou linha que aponta a função extra, botão principal (CTA), número da medida da função extra, selo da coleção.
- Não pode: fundo de página, logo amarelo, texto corrido amarelo, mais de 10% da área.
- Teste: se tirar o amarelo, a página ainda funciona.

## Tipografia

| Uso | Fonte | Especificação |
|---|---|---|
| Títulos e chamadas | Space Grotesk Bold | Caixa alta, tracking −0,02em, entrelinha 0,9 |
| Texto e interface | Inter Regular | 14–16 px, entrelinha 1,6, tracking 0,01em, sentence case |
| Labels | Inter Medium | 10 px, caixa alta, tracking 0,14em |

## Logotipo

- Barra horizontal alongada (proporção 8:1, extremidades retas) com dobra diagonal de −45° à esquerda. Contorno grosso uniforme, **sem preenchimento**.
- Versões: principal (fundo branco, uso preferencial), negativa (fundo preto), símbolo isolado (favicon e selos, sem texto).
- Respiro mínimo: a altura da barra em todos os lados.
- Abaixo de 24 px: usar só o símbolo.
- Proibido: esticar, comprimir, inclinar, alterar contorno, sombra, gradiente, redesenhar, usar versão rasterizada ampliada.

## Sistema visual

Grid brutalista, linhas técnicas de 1 px, muito respiro, nada decorativo.

## Linguagem

Clara, direta, funcional. Frase curta, verbo no presente. O valor está no objeto, não no texto.

- **Frases da marca:** "Objetos do cotidiano." · "Design funcional." · "Aparência familiar." · "Uma função a mais, sem mudar o que você vê." · "Nada é só o que parece."
- **Evitar:** superlativo vazio (incrível, revolucionário), teaser forçado, tom alarmista ou conspiratório, jargão técnico desnecessário, promessa de status ou lifestyle.
- Nas comunicações, falar "identidade visual" (não "Amarela 2.0").

## Fotografia

Fundo neutro (preto, branco ou creme), luz controlada, sombra suave, produto centralizado, sem props. Ângulo 3/4 de cima. A função extra só aparece no detalhe, nunca na foto principal. Mão usando, não mão abrindo.

> "Fotografa como se fosse um objeto comum de design. Se parecer anúncio de produto de segurança, refaz."

**Dois modos, regras diferentes:**
- **Foto de produto (loja, catálogo):** o guia de estúdio acima.
- **Vídeo digital estilo UGC (testes de conteúdo, direção de 14/11):** câmera na mão, mesa com objetos do dia a dia, peça preta com aspecto de PETG (leve brilho). Imagem gerada **não** define o acabamento físico da peça; acabamento real só depois do piloto.

## Loja e interface

Cabeçalho compacto com logo à esquerda; navegação essencial (Sobre, Conta, Cesta, Buscar); chamada curta; grade com muito respiro; **botão principal sempre amarelo**. O produto fala por si, a interface desaparece. Mobile first.

## Produto e embalagem

- Produto: preto, fosco, simples, sem logo grande. A segunda função não muda a silhueta nem o material percebido.
- Caixa simples preto ou branco fosco (300 g), fecho magnético discreto, sem fita nem laço.
- Etiqueta utilitária: retângulo branco, borda 1 px preta, tipografia técnica.
- Cartão 85 × 55 mm, 350 g, selo discreto, mensagem curta.
- Papel de seda neutro, sem estampa. Logo sempre pequeno.
- Loja e embalagem aqui são **diretrizes**, não implementação: nenhuma embalagem foi comprada ou produzida.

## Checklist de aprovação de qualquer material (6 × sim)

1. A aparência familiar está preservada?
2. A função extra está sem anúncio (sem explicar demais no texto ou na foto)?
3. Tipografia e respiro corretos (Space Grotesk Bold + Inter, muito espaço)?
4. Paleta 2+1 respeitada (amarelo só na função extra, máx. 10%, 1 elemento)?
5. Logo com área de proteção?
6. Linguagem clara e direta (frase curta, sem superlativo, sem teaser)?

Seis perguntas, uma resposta: sim. Senão, refaz.

## Atenção (divergências conhecidas nos PDFs da marca)

- Os PDFs citam o site **faixapreta.co**; o domínio registrado na Hostinger e já apontado para a Nuvemshop em 14/11 (relato da coordenação) é **faixapreta.shop**. Vale o .shop.
- Os PDFs chamam o vaso de "Vaso FP08" e mostram "porta-lápis" e "mini gaveta" com medidas antigas (150 × 150 × 20). São imagens conceituais. Código e medida que valem estão no arquivo 04.
- A coleção agora se chama **GEN** (decisão do João, 15/11). "Coleção 05 – Utilitária" e #Colecao05 estão aposentados.
- Paleta e tipografia foram conferidas pela Helena contra o Manual (p. 6–7), sem correção. O logo vetorial (zip em 00_MARCA) ainda não foi conferido arquivo a arquivo.


---

# FP · 03 · CONTEÚDO E LANÇAMENTO

> Base de fonte da Faixa Preta · v01 · 15/11/2026 · Dono: Helena (direção) e Severino (produção) · Status: VIGENTE
> Resume o Guia de conteúdo e lançamento (Documento 03, 10 p.) e o P05 (14/11). Visual segue o arquivo 02.

## Regra de ouro: 80 / 20 / 0

- **80%** mostra o objeto no cotidiano: mesa, uso real, textura, medida, rotina.
- **20%** destaca a função extra: detalhe em amarelo, close, "repara aqui", explicação curta.
- **0%** de exagero ou promessa.

> "Se a pessoa entende o produto em 5 segundos, acertamos."

## O que pode e o que fica para depois

| Pode mostrar | Só depois do lançamento (conteúdo próprio) |
|---|---|
| Produto na mesa, em uso normal | Compartimento aberto em close |
| Medidas, peso, material | Passo a passo de como abrir |
| Embalagem fechada, etiqueta | Foto do interior vazio |
| Detalhe em amarelo apontando | Legenda explicando o mecanismo |
| Reação de quem usa ("ah!") | Comparação "antes/depois aberto" |

Vídeo "como funciona": **só depois de 30 dias do lançamento** (1 vídeo).

"Abertura" aqui é a do **compartimento ou mecanismo** da função extra. O uso normal do objeto pode aparecer: a boca superior do porta-canetas [04] com caneta já está liberada em vídeo, sem mostrar fundo, mecanismo ou interior (João, 14/11 10h51–10h55).

## Regras de produção (decididas)

- Só se vende e se promete produto que existe aprovado na mão (piloto). Peça digital de teste (base v05 aprovada em 14/11) serve para preparar conteúdo, mas não se apresenta como peça física.
- Nome de produto só aparece em peça pública depois da liberação. `[A DEFINIR]` é marcador interno e nunca vai em post final.
- CTA "Ver coleção" **suspenso** até haver loja publicada.
- Vídeo digital estilo UGC: sem selo na peça; a origem digital fica registrada no pacote de revisão. Nunca alegar filmagem física nem depoimento real (João, 14/11 12h02).
- Não prometer alcance, viralização nem resultado.
- Gate pré-comercial: nada com cara de venda (preço, link de compra, CTA comercial) antes da loja liberada.
- Publicar: com a palavra do Cláudio. Anúncio e impulsionamento: só com o João (é gasto).

## Fluxo de uma peça

1. Helena define a direção (objetivo, produto, mensagem).
2. Severino produz o rascunho.
3. Checklist "antes de postar" (abaixo) + checklist de marca (arquivo 02).
4. Cláudio aprova e libera a publicação.
5. Publicado: registrar data, canal e peça no arquivo 09 (decisões) se for marco.

## Roteiros prontos de Reels (15–25 s, 1 ideia por vídeo)

1. **Rotina** — "Minha mesa de manhã." Mostra gaveta, lápis, vaso. Termina no detalhe amarelo. Não explica. Gancho: "Repara no final."
2. **Medida** — régua e o objeto. Fala de precisão. Gancho: "[medida externa], só isso." *(O exemplo original "150 × 150" é da mini gaveta antiga. No teste atual, usar o porta-canetas [04] com o nominal Ø50 × 150 mm, só se fizer sentido. Medida externa, nunca cota interna, e sem dizer que foi medida em peça física.)*
3. **Unboxing** — abre a caixa fosca, tira a etiqueta, mostra o cartão. Não abre o produto. Gancho: "Caixa simples."
4. **Antes/depois da mesa** — bagunçada → limpa com os produtos. Gancho: "Mesa limpa muda o dia."
5. **Reação** — entrega para alguém usar pela 1ª vez e filma. Sem explicar. Gancho: "Usa aí e me fala." *(Só com pessoa e uso real. Não fabricar reação com vídeo digital.)*

## Legendas-base

1. Objetos do cotidiano. Design funcional. Nada é só o que parece.
2. Aparência familiar. Construção precisa. Uma função a mais, sem mudar o que você vê.
3. [Objeto]. [medida externa]. De fora, uma peça preta e lisa. O resto, você vê usando. *(Exemplo antigo: "Mini gaveta. 150 × 150 mm". Preencher com objeto e medida do piloto.)*
4. É sobre projetar bem. Coleção GEN.
5. CTA — Ver coleção → link na bio. Qual desses você colocaria na sua mesa? *(suspenso até a loja publicar)*

**Bio sugerida:** Objetos do cotidiano. Design funcional. Nada é só o que parece. *(O "↓ Ver coleção" volta quando a loja abrir.)*
**Hashtags:** #FaixaPreta #NadaESoOQueParece #DesignFuncional #ObjetosDoCotidiano (#Colecao05 aposentada; hashtag da Coleção GEN a definir pela Helena).

## Calendário de lançamento (7 dias)

| Dia | O que postar |
|---|---|
| 1 | Apresentação: mesa limpa + "Nada é só o que parece." |
| 2 | Foto do produto + medida + material |
| 3 | Reels Rotina (roteiro 1) |
| 4 | Unboxing (roteiro 3), sem abrir o produto |
| 5 | Reação de quem usa (roteiro 5), só com pessoa real |
| 6 | Carrossel: 3 produtos, 3 medidas (depende dos pilotos aprovados) |
| 7 | Lançamento: "Ver coleção" em amarelo + link (depende da loja liberada) |

Dia 30+: 1 vídeo "como funciona".

## Checklist antes de postar (6 × sim)

1. A foto parece um objeto comum à primeira vista?
2. A legenda está curta, sem explicar demais?
3. Tem no máximo 1 elemento amarelo?
4. Está sem superlativo ("incrível", "revolucionário")?
5. A abertura do compartimento e o "como funciona" estão fora de todos os frames?
6. Fonte certa (Space Grotesk Bold + Inter)?

Seis sim → pode postar.

## Estado do conteúdo (relato da Helena, 15/11)

- 4 posts com texto e proposta entregues (v07). Post 2: montagem de 13 s em revisão. Posts 1, 3 e 4: sem criativo final.
- Série em vídeo: v02 + 1 curto entregues; os 3 episódios não estão finalizados.
- Campanhas v07: só planejamento, com proposta de R$ 490 por 7 dias de mídia paga (**gasto: decisão do João**, nada ativado).
- Foto real de produto: não recebida (não existe peça física ainda).

## Em aberto (ver arquivo 09)

Canais e perfis oficiais; nome público de cada produto; hashtag da Coleção GEN; verba de mídia paga; formato final de vídeo.


---

# FP · 04 · CATÁLOGO — COLEÇÃO GEN

> Base de fonte da Faixa Preta · v01 · 15/11/2026 · Dono: Departamento de Produtos · Status: VIGENTE
> Substitui, como resumo de trabalho, as 10 fichas de dossiê e as 8 cópias da "Lista Real" (v01 a v17, 14/11). Revisado pelo Departamento de Produtos em 15/11. Hash SHA256 completo dos arquivos antigos continua na Lista Real v17 (01_PRODUTOS/00 - Controle). Etapas conforme o arquivo 05.

## Retrato geral (15/11)

- 10 objetos modelados no digital, com prancha técnica e revisão técnica.
- **Nenhuma peça física na mão.** O porta-canetas [04] foi enviado para impressão externa pelo fornecedor do João em 14/11 11h14; o resultado ainda não chegou. Peso real, medida física, foto real e frete: **não existem ainda**.
- Etapa: [04] em **E4 (protótipo em impressão externa)**; os outros 9 em **E2 (modelo digital)**. A classificação de etapa é do Cláudio; o Departamento de Produtos não a verificou.
- [01], [02] e [03] mudaram de base em 14/11 à tarde (decisões do João abaixo). Medidas antigas **não** valem para as bases novas.
- Bloqueio físico: **[05] não cabe** na mesa 180 × 180 da A1 mini. 3 opções esperando o João.
- Nomes abaixo são **internos**. Nome público de cada produto: pendente.
- Material: PETG + bico 0,6 registrado só para o [04]. Nos demais, pendente (pareceres citam risco em PLA, decidido por cupom).

## Tabela-resumo

| Cód. | Objeto (nome interno) | Função extra (Departamento de Produtos, 15/11) | Base vigente | Peças | Envelope de malha (mm) | Cabe na A1 mini? | Etapa | Decisão / bloqueio aberto |
|---|---|---|---|---|---|---|---|---|
| FP-001 | [01] Gaveta de mesa | Bandeja deslizante sob o tampo | **v07-2p afinada** | 2: corpo, bandeja | A medir na v07 (v06 era 178 × 150 × 30) | Sim (v06) | E2 | João decide v07 x v09 em 16/11; bandeja v08 não validada |
| FP-002 | [02] Livro Caixa Traço | Livro com cavidade interna | **LEVE** (2 peças, sem faixa) | 2: corpo (fundo + miolo), tampa | A medir na LEVE | A confirmar | E2 | Aparência; cupom do fecho |
| FP-003 | [03] Vaso reserva | Base rosqueada removível com volume interno | **B150** com tampa de referência | 2: corpo B, tampa referência | A medir na B150 | A confirmar | E2 | Envelope definitivo; material |
| FP-004 | [04] Porta-canetas duplo | Tampa rosqueada (compartimento extra específico não declarado nas fontes) | **v1.5** | 3: corpo, tampa, lado a lado | Corpo Ø50 × 150; tampa 44,9 × 44,9 × 10,8 | Sim | **E4** | Receber a peça do fornecedor e testar |
| FP-005 | [05] Tomada decorativa (sem elétrica) | Carcaça decorativa de extensão, corpo oco | **v0.3, corpo + placa** (cabo fora) | 2: corpo, placa | Corpo 210 × 62 × 25 | **Não** | E2 bloqueado | Escolher 1 de 3 opções de mesa |
| FP-006 | [06] Chave canivete (sem lâmina) | Bolso físico na base; uso a definir | v0.3 | 2: base, tampa | 70 × 38 × 16 montado | Sim | E2 | Cupom da trava |
| FP-007 | [07] Carregador veicular (sem elétrica) | Cavidade interna; uso a definir | v0.2 | 2: corpo, tampa | Corpo 57,4 × 34 × 34 | Sim | E2 | Cupom da trava |
| FP-008 | [08] Powerbank (sem elétrica) | Corpo oco com tampa snap | v0.2b | 2: corpo, tampa | Corpo 118,3 × 65 × 18 | Sim | E2 | Cupom do snap |
| FP-009 | [09] Estojo de óculos | A definir (sem fonte para "compartimento no fundo") | corpo v0.3 + tampas v0.3b | 2: corpo, tampas | Corpo 169,8 × 71,9 × 19 | Sim | E2 | Função extra; cupom; caber óculos |
| FP-010 | [10] Parafuso (não estrutural) | Cápsula interna; função e volume útil a confirmar | v0.2 | 2: corpo, tampa | Corpo 57,7 × 28 × 32,3 | Sim | E2 | Volume útil; cupom da retenção |

Envelopes são medidas de malha (digitais), verificadas em 14/11. Não substituem medida física. "Uso a definir" = a peça tem o espaço, mas o propósito da função extra ainda não foi declarado.

## Fichas curtas

### FP-001 · [01] Gaveta de mesa
- **Conceito:** bloco fixo sob o tampo da mesa com bandeja deslizante. De fora, peça preta e lisa. Ocultar é objetivo do projeto, ainda não validado.
- **Base vigente:** v07-2p afinada (João, 14/11 15h13). Arquivos `FP-001-corpo-v07-afinado_v01.stl` e `FP-001-bandeja-v07-afinado_v01.stl`, mais cupons `FP-001-cupomA-modulo-v07` e `FP-001-cupomB-contraparte-v07`.
- **Não promover:** `FP-001-bandeja-v08-folga` é variante posterior, **não validada** (nova colisão com o corpo v07 relatada; o cupom anterior não representa essa interface). Data de arquivo não define versão.
- **Histórico:** v06-2p H-SNAP-C (178 × 150 × 30, ~200 g estimado, "passa com ressalvas" do Departamento Ecommerce em 13/11) fica preservada.
- **Falta:** decisão v07 x v09 do João (16/11), medidas da v07, cupons, material.

### FP-002 · [02] Livro Caixa Traço
- **Conceito:** livro com cavidade interna.
- **Base vigente:** direção **LEVE** (João "segue", 14/11 15h14): fundo e miolo unidos numa peça, tampa removível, **sem faixa**, 2 peças. Base de estudo, não aprovação final nem liberação para imprimir.
- **Malhas (identificar por conteúdo, não pelo nome):** corpo RASCUNHO v01, SHA256 `e73ecffd61b363083338b800cfdd607a37bff050edfd224cb4c77a6a87ea2267`; tampa RASCUNHO v02, SHA256 `accf9fc65e4ae0115d6a55c9cf5521e811cdba24e9b0b6feb1b433aa4a5f568f`. Os nomes "leve-corpo-v03" e "leve-tampa-v03" no Drive não bastam: conferir o hash.
- **Histórico:** Livro B v0.2 (capa + miolo + 3 plataformas; layout 240 × 175 em 3 jobs) fica preservado. Suas medidas não descrevem a LEVE.
- **Falta:** medidas da LEVE, aparência, cupom do fecho, material.

### FP-003 · [03] Vaso reserva
- **Conceito:** vaso de mesa com base rosqueada removível que guarda itens. 100% impresso.
- **Base vigente:** **B150** com tampa de **referência** (não a rebaixada "T") (João, 14/11 15h17).
- **Malhas:** corpo B, SHA256 `2069ad731c1b493f755fd6354e445a62290dc70be52d0417c71d4257496db189`; tampa referência, SHA256 `57a4a4eea283406ee4df6f82827cf273641f28eb27fd9ec3fc3fc8495a3029ea`.
- **Histórico:** v0.3d4b (Ø137,8 × 170, ~1,09 L, ~405 g estimado, base com 17 faces degeneradas) fica preservada. Envelope, volume e defeitos dela **não** passam para a B150.
- **Aparência:** aprovada pelo João em 12/11 (sobre a v0.3d4b).
- **Falta:** envelope definitivo, medidas da B150, material e quem imprime, cupom de rosca.

### FP-004 · [04] Porta-canetas duplo
- **Conceito:** porta-canetas cilíndrico com tampa de rosca; dois módulos lado a lado. Compartimento extra específico não declarado nas fontes.
- **Versão:** v1.5 (malha reparada da v1.4). Corpo Ø50 × 150; parede 1,2 mm; útil superior 80 mm. Rosca passo ~4 mm, folga radial 0,55 mm, axial ~1,5 mm.
- **Material:** PETG, bico 0,6 (registro de 12/11). Cor: pendente.
- **Revisão:** fechamento de malha CONFORME (Departamento Ecommerce rev2, 14/11). Rosqueamento dinâmico e imprimibilidade não validados no digital.
- **Atenção no fatiador:** overhangs > 45° (corpo 2.542 mm², tampa 1.736 mm²).
- **Estado:** enviado para impressão externa pelo fornecedor do João em 14/11 11h14. Resultado físico não recebido nem confirmado (15/11 10h06). **Primeira peça física da FP.**
- **Liberado em vídeo:** boca superior com caneta (sem fundo, mecanismo ou interior).

### FP-005 · [05] Tomada decorativa (carcaça de extensão, sem elétrica)
- **Conceito:** parece uma extensão de tomada; é carcaça decorativa com corpo oco. **Sem função elétrica, não ligar na rede.**
- **Escopo vigente:** corpo + placa. O cabo saiu do escopo em 14/11 11h33 (direção do João: "comprar o fio e adaptar"). Isso **não** libera função nem adaptação elétrica.
- **Medidas:** corpo 210 × 62 × 25 (v0.3). As medidas do parecer de mesa vêm de um layout antigo, com cabo.
- **Bloqueio:** o corpo não cabe na mesa 180 × 180 nem na diagonal (181,6 mm a 45°). Opções propostas, **nenhuma escolhida**: (1) dividir em metades com junta própria; (2) máquina maior; (3) redução de tamanho aprovada pelo João.
- **Falta:** decisão de mesa, medidas da placa, material.

### FP-006 · [06] Chave canivete (sem lâmina)
- **Conceito:** parece um canivete-chave; peça decorativa de base + tampa. Sem lâmina, dobradiça ou eletrônica.
- **Versão:** v0.3. Base 70 × 38 × 8; tampa 70 × 38 × 12,2; montado 16 mm de altura. Bolso físico na base (errata 06 v03); propósito da função extra a definir.
- **Risco:** raiz da trava limítrofe em PLA (~3,3%); cupom decide.

### FP-007 · [07] Carregador veicular (sem elétrica)
- **Conceito:** parece carregador de isqueiro de carro; tem cavidade interna de 47,4 mm de profundidade. Sem função elétrica. Propósito da função extra a definir.
- **Versão:** v0.2. Corpo 57,4 × 34 × 34; tampa 9,7 × 34 × 34. 4 travas.
- **Risco:** raiz da trava 1,5–1,8% em PLA; cupom decide.

### FP-008 · [08] Powerbank (sem elétrica)
- **Conceito:** parece um powerbank; é corpo oco com tampa snap. Sem função elétrica.
- **Versão:** v0.2b (v0.2 retirada por defeito de malha). Corpo 118,3 × 65 × 18 (o "120" antigo era documental; vale o medido). Parede 3 mm.
- **Falta:** cupom do snap (encaixe não validado).

### FP-009 · [09] Estojo de óculos
- **Conceito:** estojo de óculos. Função extra **sem fonte**: o "compartimento no fundo" não está documentado.
- **Versão:** corpo v0.3 + tampas v0.3b (domo + plugue). Corpo 169,8 × 71,9 × 19; boca 81,9 × 33 mm, profundidade 10,8.
- **Risco:** **não há garantia de que caibam óculos**; domo sem retenção; ~4% no limite em PLA. Cupom decide.

### FP-010 · [10] Parafuso (não estrutural)
- **Conceito:** parece um parafuso grande, com cápsula interna e tampa. **Não estrutural, não usar em fixação.** Rosca decorativa, não normalizada. Função e volume útil a confirmar.
- **Versão:** v0.2. Corpo 57,7 × 28 × 32,3; tampa 9,5 × 28 × 32,3. 4 travas cantilever.
- **Falta:** volume útil, cupom da retenção.

## Revisão do Departamento Ecommerce nos objetos [05], [06] e [10]

Os rodapés internos desses objetos se contradizem ("Revisão Departamento Ecommerce PENDENTE" x "CONFEREM"). O Departamento Ecommerce não tem registro de revisão entregue. **Vale: revisão pendente de comprovação.** Só vira "confere" com parecer identificado. Rodapé não valida malha, funcionamento, resistência nem fabricação.

## Regras do catálogo

- Código **FP-0NN = número do catálogo [NN]**. A loja usa FP-001 a FP-010 na mesma ordem.
- Versão vigente é definida por decisão registrada, não pela data nem pelo nome do arquivo. Na dúvida, conferir o hash.
- Atualizar esta página quando um objeto muda de etapa, de versão ou ganha medida física. Não criar nova lista.
- Peso, medida física e foto só entram depois da peça impressa, com data.
- Divergência entre fonte e malha: registrar no arquivo 09, nunca reconciliar em silêncio.


---

# FP · 05 · PROCESSO DE PRODUTO

> Base de fonte da Faixa Preta · v01 · 15/11/2026 · Dono: Departamento de Produtos · Status: VIGENTE
> Substitui P02 (Desenvolvimento), P03 (Produção e qualidade) e P04 (Gestão de produtos) de 14/11. Mantém o conteúdo deles e aplica a decisão do João: peça física antes de papel, venda só com o piloto aprovado na mão, produção sob demanda.

## O fluxo em 7 etapas

| Etapa | O que acontece | Quem faz | Sai daqui com |
|---|---|---|---|
| **E1 Briefing** | João pede o produto. Departamento Gestão registra. Departamento de Produtos faz até 3 perguntas, uma por vez. Departamento de Produtos propõe 2–3 arquiteturas e recomenda a mais simples. | João pede e escolhe; Departamento de Produtos propõe | Briefing e arquitetura aprovados pelo João |
| **E2 Modelo digital** | Departamento de Produtos modela, pesquisa se o assunto é novo, confere medidas (completa se há encaixe, simplificada se é decorativo). Departamento Ecommerce faz revisão independente; Departamento de Produtos corrige; Departamento Ecommerce reconfere. | Departamento de Produtos, Departamento Ecommerce | STL + prancha técnica + parecer do Departamento Ecommerce |
| **E3 Cupom físico** | Departamento de Produtos fatia e simula o cupom do encaixe (snap, rosca, trava) e passa as orientações. João imprime e testa. Material novo sempre começa por cupom. | Departamento de Produtos prepara; João imprime | Encaixe aprovado na mão |
| **E4 Protótipo** | Departamento de Produtos fatia e simula a peça inteira e mostra resultado, configurações e riscos. João aprova a simulação e imprime (na máquina própria ou no fornecedor). | Departamento de Produtos, João | Protótipo impresso |
| **E5 Teste e ajuste** | João testa: encaixes e folgas, funcionamento, resistência, estabilidade, montagem, remoção de suporte, acabamento. Problema → Departamento de Produtos corrige → volta à E4. | João testa; Departamento de Produtos corrige | Lista de ajustes zerada |
| **E6 Piloto aprovado** | Impressão da versão final. João aprova na mão. Registra peso real, medidas físicas, material, cor, tempo de impressão. | João aprova | **Produto validado** |
| **E7 Pronto para vender** | Fotos reais, preço, cadastro na loja, texto. Produção sob demanda a partir daqui. | Helena/Severino (foto e texto), Departamento Ecommerce (loja), João (preço) | Produto publicado |

**Parada do João:** E1 (arquitetura), E4 (simulação antes de imprimir) e E6 (aprovação final). Impressão e compra de material sempre com autorização do João.

## Regra de ouro

Nenhum produto vai para loja, conteúdo promocional ou venda antes da **E6**. Render não é produto.

## Critério de "validado" (E6)

Todos os itens marcados:
- [ ] Modelagem concluída
- [ ] Revisão independente aprovada (Departamento Ecommerce)
- [ ] Simulação no fatiador aprovada
- [ ] Cupom e protótipo impressos
- [ ] Testes físicos feitos
- [ ] Peso real e medidas físicas registrados no arquivo 04
- [ ] Aprovação final do João, com a peça na mão

## Regras de decisão

1. Departamento de Produtos tem autonomia técnica dentro do briefing e da arquitetura aprovados.
2. Mudar custo, material, dimensão ou função exige autorização do João.
3. Mudar arquitetura volta para a E1.
4. Departamento Ecommerce aponta, Departamento de Produtos corrige.
5. Não há limite de revisões nem prazo obrigatório; prioridade definida pelo Cláudio.
6. João pode interromper ou cancelar qualquer projeto.
7. Mudança depois da E6 exige autorização do João e registro no arquivo 04.
8. Peça que não cabe na impressora (mesa 180 × 180 da A1 mini) é sinalizada na E2, não na E4.

## Comunicação

Departamento de Produtos atualiza nos marcos: início, arquiteturas, fim da modelagem, revisão do Departamento Ecommerce, simulação, resultado do teste físico, piloto aprovado. Impedimento ou mudança de premissa: avisar na hora. Não precisa atualizar cada tarefa pequena.

## Entrega técnica de cada produto (pasta do objeto no Drive)

- STL de cada peça (nome `FP-0NN-peca-vNN.stl`).
- Arquivo editável (STEP ou CAD nativo), quando houver.
- Prancha técnica (PDF): imagem, dimensões finais, material, lista dos STL, orientação de impressão, montagem e acabamento.
- Perfil de fatiamento usado no protótipo aprovado.
- Fotos da peça física (a partir da E5).
- Linha atualizada no arquivo 04.

Departamento Gestão confere, organiza e arquiva na pasta oficial do produto.

## Versões e arquivos

- Código do objeto: FP-0NN (= catálogo [NN]).
- Versão da malha no nome do STL (v01, v02...). Versão de documento no padrão `FP_AREA_ITEM_vNN_AAAAMMDD`.
- **Uma versão vigente por objeto**, apontada no arquivo 04. Versões anteriores vão para `historico/` dentro da pasta do objeto, sem renomear nem apagar.
- Arquivo bom é identificado pelo nome **e** listado no arquivo 04; não depender de hash para saber o que vale.
- Hash SHA256 continua registrado para conferência, mas não é mais critério de trabalho no dia a dia.

## Produção sob demanda (depois da E7)

1. Pedido entra na loja.
2. João imprime a peça com o perfil aprovado (prazo de produção: 1 dia, ver arquivo 06).
3. Conferência de qualidade contra o piloto aprovado: medida, encaixe, acabamento, função extra.
4. Embala no padrão da marca (arquivo 02) e envia.
5. Defeito: reimprime; se repetir, Departamento de Produtos investiga.

## Impressão por fornecedor externo (herdado do P03; em uso no [04] desde 14/11)

A impressão pode ser feita na máquina própria ou por fornecedor externo; quem escolhe é o João. No fornecedor: João escolhe e contrata o fornecedor; Departamento de Produtos passa a especificação; fornecedor faz amostra; João aprova a amostra; João define quantidade e autoriza o lote; João confere o recebido e controla o estoque. Nenhum lote sem amostra aprovada.


---

# FP · 06 · LOJA, VENDAS E ATENDIMENTO

> Base de fonte da Faixa Preta · v01 · 15/11/2026 · Dono: Departamento Ecommerce (loja) e Cláudio (políticas) · Status: VIGENTE
> Substitui P06 (Loja) e P07 (Atendimento) de 14/11. Atualizado com a loja Shopify em prévia de 15/11.

## Situação em 15/11

| Item | Estado |
|---|---|
| **Loja Shopify** | Prévia criada em 15/11 (endereço provisório kxdswp-z3.myshopify.com). **Ainda não salva numa conta** (depende do login do João). Marca aplicada (creme, amarelo, preto, Space Grotesk + Inter, cantos retos, hero "NADA É SÓ O QUE PARECE."). 10 produtos FP-001 a FP-010 em rascunho, preço R$ 0,00, sem fotos. Nada publicado. |
| **Loja Nuvemshop** | Criada antes (plano gratuito). Nuvem Pago: a tela do app mostrou "Ativado" em 14/11 12h32 (print). Isso **não** comprova dados bancários, credenciamento nem recebimento. Checkout alcançado em teste de 14/11 03h03; às 04h37 a rota /carrinho/ deu 404 uma vez (falha pontual, não geral). Proteção por senha não confirmada. |
| **Plataforma oficial** | **A decidir: Shopify ou Nuvemshop** (ver fila no arquivo 09). Até lá, nenhuma das duas é publicada. |
| **Domínio** | faixapreta.shop, registrado na Hostinger (titularidade a confirmar pelo João no painel). **DNS apontado para a Nuvemshop em 14/11 09h13** (relato da coordenação; não reverificado em 15/11). Apontar para a Shopify (A @ → 23.227.38.65; CNAME www → shops.myshopify.com) é só proposta: depende da escolha de plataforma e de autorização. |
| **Bling (ERP)** | Roteiro de integração pronto; reautorização depende do João. |
| **Pixel Meta** | Conferir integração existente antes de instalar. 1 pixel por loja. |
| **TikTok Shop** | Cadastro de vendedor iniciado em 14/11; verificação pendente. |
| **Mercado Livre** | Decidido: cadastro como **PF**, no nome do titular (14/11 13h20). Roteiro pronto (14/11 13h22). Cadastro **ainda não autorizado**. Recebimento do ML é pelo Mercado Pago, não pelo Nuvem Pago. |

## Regras da loja

- **Nada vai à venda antes da E6** (piloto aprovado, arquivo 05). Até lá, a loja fica fechada ou protegida.
- Loja segue o arquivo 02: navegação essencial, muito respiro, botão principal amarelo, foto em fundo neutro.
- Produto só com foto real da peça. Render, se usado, vem rotulado como ilustração.
- Gasto (plano pago, app, domínio, anúncio): só com o João. Publicar e alterar a loja: com a palavra do Cláudio.
- Login e dados bancários/fiscais: o João, na tela oficial. Nunca por chat ou e-mail.

## Prazo, frete e entrega

- **Prazo de entrega:** 1 dia de produção + prazo do frete (decidido). Dia útil x dia corrido: a decidir.
- **Frete:** hoje calcula com dados genéricos. Tarifa real só depois de peso e dimensões reais (E6) cadastrados.

## Antes de abrir a loja (checklist de liberação)

- [ ] Plataforma decidida e loja salva na conta do João
- [ ] Pelo menos os produtos de lançamento na E6, com peso e medidas reais
- [ ] Fotos reais e preços cadastrados
- [ ] Meio de pagamento ativo, com dados de recebimento preenchidos pelo João
- [ ] Domínio apontado
- [ ] Fluxo de compra testado até a tela de pagamento, sem erro
- [ ] Políticas publicadas (troca, devolução, arrependimento, prazo, privacidade)
- [ ] Compra-teste real autorizada pelo João (teto de valor e estorno combinados), concluída e estornada

## Políticas

- **Trocas e devoluções:** texto v03 entregue pela coordenação em 14/11 12h06. **Não publicado.** Falta número comercial e ferramenta de cancelamento. Publicar exige decisão específica.
- **Cancelamento e arrependimento:** a definir. Direitos do consumidor não são opção da política: compra online tem direito de arrependimento de 7 dias (Código de Defesa do Consumidor).
- Texto final passa pelo Cláudio; publicação conforme o arquivo 01.

## Atendimento

**Estado:** não existe canal de atendimento ativo nem roteiro aprovado. WhatsApp comercial previsto para 16/11 pela coordenação, **sem número confirmado e sem criação autorizada**.

**Regras que já valem:**
- Linguagem da marca (arquivo 02): clara, direta, sem exagero.
- Não explicar a função extra em público antes do conteúdo "como funciona" (arquivo 03).
- Sem preço, link de compra ou promessa antes da loja liberada.
- Criar canal novo (WhatsApp Business, e-mail de atendimento) é acesso novo: decisão do João.
- Dado de cliente fica no menor número de ferramentas possível. Atendimento automático por IA só com base de respostas aprovada e passagem para humano.

**A definir:** canal oficial, responsável, horário e prazo de resposta, respostas-base (pedido, prazo, troca, defeito, "como funciona").


---

# FP · 07 · ADMIN, FINANCEIRO E MEI

> Base de fonte da Faixa Preta · v01 · 15/11/2026 · Dono: Cláudio (organização); decisões do João · Status: VIGENTE
> Substitui P08 (Financeiro e administrativo) e o Guia tela a tela de abertura do MEI (14/11). Não é parecer contábil: enquadramento e ocupação são validados com contador.

## Situação em 15/11

- **MEI:** abertura em andamento pelo João no gov.br. Atividade informada: fabricação de objetos de plástico impressos em 3D, vendidos pela internet (principal) + comércio varejista pela internet (secundária). Atuação: internet, local fixo na residência.
- **Recebimento:** Nuvem Pago aparece "Ativado" na Nuvemshop (14/11), sem comprovação de dados bancários nem de recebimento. Na Shopify, meio de pagamento não configurado. Mercado Livre (PF) recebe pelo Mercado Pago, que é outro serviço.
- **Custos por produto:** não levantados (dependem de peso real, E6).
- **Preço:** não definido.

## Abertura do MEI (resumo do guia)

1. Conta gov.br nível prata ou ouro.
2. Acessar pelo endereço oficial digitado: gov.br/empreendedor → "Quero ser MEI" → "Formalize-se".
3. Login com CPF e senha do próprio titular. Ninguém mais digita.
4. Conferir os dados puxados da Receita. Três erros de validação bloqueiam o cadastro por 24h.
5. Dados do negócio: ocupação, forma de atuação, endereço. Os dados da empresa ficam públicos; usar contato profissional se tiver.
6. Nome empresarial: gerado automaticamente (8 dígitos do CNPJ + nome civil). Nome fantasia "Faixa Preta": só se a tela oferecer o campo.
7. Aceitar as declarações (inclui dispensa de alvará).
8. Ao final saem CNPJ, registro na Junta e inscrição no INSS. Guardar o CCMEI.

**Ocupações candidatas (Anexo XI, Res. CGSN 140/2018), todas contribuintes de ICMS:**

| Ocupação | CNAE | Papel |
|---|---|---|
| Artesão(ã) em plástico independente | 2229-3/99 | Candidata a principal (fabricação própria) |
| Artesão(ã) em outros materiais independente | 3299-0/99 | Alternativa genérica |
| Comerciante de objetos de arte independente | 4789-0/03 | Só se o produto for de fato objeto de arte |

Escolha final: João, validada com contador antes da inscrição.

## Obrigações recorrentes do MEI (valores de 2026, conferidos em 14/11)

- **DAS mensal:** vence dia 20. Comércio/indústria: R$ 82,05 (INSS R$ 81,05 + ICMS R$ 1,00). Reajusta com o salário mínimo.
- **DASN-SIMEI (declaração anual):** até 31 de maio. Atraso gera multa (mín. R$ 50); não entregar pode deixar o CNPJ inapto.
- **Nota fiscal:** devida quando o produto é enviado ao cliente. Emissor e certificado: a definir com contador.
- Conferir os valores todo ano em gov.br.

## Pendências fiscais e financeiras (decisão do João, com contador)

- Ocupação principal e secundárias do MEI.
- Inscrição Estadual e emissão de NF-e (depende da UF e do enquadramento).
- Certificado digital A1 (se a NF-e exigir).
- Conta de recebimento no nome do CNPJ.
- Ficha de custo por produto: material (g × R$/kg), energia, tempo de máquina, embalagem, taxa do meio de pagamento, frete subsidiado.
- Política de preço.

## Regras

- CPF, CNPJ, dados bancários e certificados **nunca** em chat, e-mail, Slack ou arquivo.
- Nenhum gasto, contratação ou conta nova sem item e valor aprovados pelo João.
- Plano pago de loja ou domínio: só com valor aprovado pelo João.


---

# FP · 08 · TECNOLOGIA E PAINEL

> Base de fonte da Faixa Preta · v01 · 15/11/2026 · Dono: Departamento Ecommerce · Status: VIGENTE
> Consolida os LEIA-ME do Escritório (fonte v02 a v04), do Banco de Desenvolvimento (v01) e os e-mails de 15/11.

## Painel FP

Central da operação com 5 blocos:

1. **Escritório LIVE** — planta em pixel 3D com o status de cada pessoa do time.
2. **Gerência** — fila de 3 do João, equipe, regras de trabalho.
3. **Banco de Desenvolvimento** — um card por objeto (01 a 10): imagens, STL, medidas, peso, material, pendências e etapa.
4. **Tarefas** — quadro do que está sendo feito.
5. **Ouvidoria** — auditoria, ideias e reclamações.

**Requisitos:** mobile first, responsivo, minimalista, fiel ao manual da marca, PWA (instalável no celular), menu hambúrguer, links úteis (identidade visual, Drive, login da loja).

## Onde está no ar

Legenda: **PEDIDO** = foi pedido · **RELATO** = alguém disse que fez · **VERIFICADO** = conferido, com data e hora.

| Peça | Tipo | Endereço | Estado |
|---|---|---|---|
| `escritorio-fp-realtime` | Cloudflare Worker | escritorio-fp-realtime.faixapretabr2026.workers.dev | **VERIFICADO** 15/11 11h22: raiz responde 200 (Departamento Ecommerce). Rota `/products` do Banco: **PEDIDO** em 15/11 03h01; `GET /products` sem credencial dá 404, o que não prova se o deploy foi feito |
| `escritorio-fp-novo` | Cloudflare Pages | escritorio-fp-novo.pages.dev | **RELATO** do Departamento Gestão: no ar desde 15/11 ~03h55 (fonte v04). Checagem de DNS do Departamento Ecommerce às 11h22 foi inconclusiva. Redeploy com menu hambúrguer: **PEDIDO** |
| `banco-fp` | Cloudflare Pages | banco-fp.pages.dev | **PEDIDO** em 15/11; execução não comprovada |

Conta Cloudflare da FP. Plano gratuito.

## Como o status funciona

- Estados: **trabalhando, aguardando, parado, sem-sinal**.
- Cada pessoa grava o próprio status no Worker com a sua chave pessoal (`KEY_<ID>`), entregue pelo cofre. Existe também uma chave mestra (`EDIT_KEY`).
- **VERIFICADO:** só o card do Departamento Ecommerce (gravação aceita em 15/11 08h51). Chaves dos outros, chave mestra, leitura do Slack e tempo de expiração: **não verificados**.
- O quadro só espelha o que cada um publica. Ninguém escreve status no lugar de outro. Post de teste vai marcado TESTE e é apagado depois.
- O Worker também lê os STATUS publicados no Slack #batepapo-fp (formato com data dd/mm HHhMM, linha PRECISA de até 800 caracteres). "FEITO" com pedido ao João vira **ESPERANDO JOÃO**.

## Banco de Desenvolvimento

- 10 cards, editáveis pela página; a primeira gravação pede a `EDIT_KEY`.
- Foto enviada pela página fica no banco (reduzida a 900 px). STL e arquivos grandes ficam no Drive (link no card).
- Arquivos do Drive são privados: miniatura só aparece para quem está logado na conta da FP.
- Todo card fica "Loja bloqueada" até a etapa Validado (E6, arquivo 05).
- Etapa dos 10 cards: alinhar com o arquivo 04 ([04] em E4, os outros 9 em E2).

## Chaves e segredos

- Chave mestra e chaves pessoais: criadas pelo Departamento Gestão como secret do Worker e guardadas no cofre.
- Segredos de integração (Slack): secret do Worker, fora de qualquer pacote.
- Nesta base só aparece o nome das chaves, nunca o valor.
- **Nunca** chave em e-mail, Slack, chat, arquivo, código ou Drive.
- `KEY_CLAUDIO` pedida ao Departamento Gestão em 15/11. Falta definir como a chave chega ao Cláudio sem passar por chat.

## Código-fonte

- Pasta 04_TECNOLOGIA/Codigos no Drive. Vigente: `FP_TEC_banco-desenvolvimento_v01_20261115.zip` (contém o Escritório fonte v04 + Banco). Zips v02 e v03 do Escritório são históricos.
- Deploy: `npx wrangler deploy` (Worker) e `npx wrangler pages deploy . --project-name <projeto>` (Pages).
- Backups de 15/11 (BACKUP_cloudflare_FP, BACKUP2_motor-conteudo-lite) estão na raiz do Meu Drive, fora da pasta FaixaPreta.

## Rotinas agendadas do Cláudio (só leitura e relatório)

- Relatório semanal da equipe: sexta, 16h41.
- Resumo do e-mail da marca: todo dia, 18h46.
- Radar de mercado: dias 1 e 15, 9h27.
- Conferência de identidade visual nos materiais e no painel.
- Conferência da caixa do Departamento Gestão: a cada 30 min, ou no prazo do pedido.

Departamento Gestão sugeriu enxugar as rotinas (ver arquivo 09).

## Ferramentas em uso

Google Drive e Gmail (conta da FP), Slack (#batepapo-fp), Cloudflare (Worker e Pages), Shopify (prévia), Nuvemshop, Hostinger (domínio), Bling (ERP, pendente), Claude, Instinct beta, Meta AI Plus.


---

# FP · 09 · DECISÕES E PENDÊNCIAS

> Base de fonte da Faixa Preta · v01 · 15/11/2026 · Dono: Cláudio · Status: VIGENTE
> Arquivo vivo. Toda decisão nova entra aqui com data e quem decidiu. Pendência resolvida sai da lista e vira decisão. Revisado com o time (Departamento Gestão, Departamento de Produtos, Departamento Ecommerce, Helena) em 15/11.

## Fila do João (máx. 3, recomendação na frente)

1. **Tomada [05] não cabe na A1 mini.** Recomendo a opção 1: dividir o corpo em metades com junta própria. Não exige comprar máquina e mantém o tamanho. As outras opções são máquina maior ou reduzir o tamanho.
2. **Plataforma da loja: Shopify ou Nuvemshop.** Recomendo salvar a prévia da Shopify na sua conta (login seu, sem contratar plano agora; marca e 10 produtos já estão nela) e decidir o plano pago só quando o primeiro piloto ficar pronto. Até lá, o domínio continua apontado para a Nuvemshop e nada é publicado.
3. **Gaveta [01]: v07 ou v09** (prevista para 16/11). Recomendo ficar com a v07-2p afinada, que já é a base escolhida e tem cupons A/B prontos, e só trocar se a v09 resolver um problema medido no cupom.

Acompanhando, sem decisão sua agora: chegada da peça do [04] do fornecedor.

## Registro de decisões

| Data | Decisão | Quem |
|---|---|---|
| 12/11 | Gate pré-comercial: nada com cara de venda (preço, link, CTA) antes de liberar | João |
| 12/11 | Aparência do Vaso reserva [03] aprovada (sobre a v0.3d4b) | João (via coordenação) |
| 14/11 | Nome de arquivo `FP_AREA_ITEM_vNN_AAAAMMDD.ext`, sem acento nem espaço | João |
| 14/11 | Usar "identidade visual" nas comunicações, não "Amarela 2.0" | João |
| 14/11 | Prazo de entrega: 1 dia de produção + prazo do frete | João |
| 14/11 | CTA "Ver coleção" suspenso; nomes de produto fora das peças até liberar; sem promessa de alcance | Coordenação |
| 14/11 10h51 | Boca superior do porta-canetas [04] com caneta pode aparecer em vídeo (sem fundo, mecanismo ou interior) | João |
| 14/11 11h14 | [04] enviado para impressão externa pelo fornecedor do João | João |
| 14/11 11h33 | [05]: cabo sai do escopo; segue corpo + placa ("comprar o fio e adaptar"), sem função elétrica | João (via Departamento Gestão) |
| 14/11 12h02 | Vídeo digital estilo UGC sem selo na peça; nunca alegar filmagem física nem depoimento real | João |
| 14/11 13h20 | Mercado Livre: cadastro como PF, no nome do titular (cadastro ainda não autorizado) | João (via coordenação) |
| 14/11 14h16 | Base digital v05 dos vídeos aprovada | João (via coordenação) |
| 14/11 15h13 | [01] Gaveta: base passa a ser a v07-2p afinada | João (via Departamento Gestão) |
| 14/11 15h14 | [02] Livro: direção LEVE (2 peças, sem faixa), como base de estudo | João (via Departamento Gestão) |
| 14/11 15h17 | [03] Vaso: base passa a ser a B150 com tampa de referência | João (via Departamento Gestão) |
| 15/11 | Claude (Cláudio) é o head da Faixa Preta | João |
| 15/11 | Catálogo fechado: os 10 objetos lançam juntos | João |
| 15/11 | Regra de venda: protótipo → ajuste → piloto aprovado na mão → venda sob demanda | João |
| 15/11 | Time: Departamento Gestão, Departamento de Produtos, Departamento Ecommerce, Helena, Severino. Bento, Dora e Nilo saem | João |
| 15/11 | Cláudio ↔ Departamento Gestão só por e-mail, com palavra mágica; conferência a cada 30 min; pedido com prazo | João |
| 15/11 08h15 | Cada membro posta o próprio status no Escritório LIVE, com chave pessoal entregue pelo cofre | João |
| 15/11 08h17 | A palavra do Cláudio vale como a do João (inclui publicação). Gasto, primeiro login, senhas e CPF continuam só com o João. Impressão e compra com o João | João |
| 15/11 | Regra das 12h / cobrado 2x: Cláudio decide e avisa depois | João |
| 15/11 | Chaves só no cofre, com o Departamento Gestão; nunca por e-mail ou Slack | João |
| 15/11 | Nome da coleção: **GEN** | João |
| 15/11 | A peça final aprovada passa a se chamar **piloto** | João |
| 15/11 | Esta base (arquivos 00 a 10) substitui P01 a P08, a Lista Real e o guia do MEI como referência de trabalho | João (pedido) e Cláudio |
| 15/11 | Código FP-0NN = número do catálogo [NN] | Cláudio |
| 15/11 | Processo de produto em 7 etapas (E1 a E7), arquivo 05 | Cláudio |
| 15/11 | Revisão do Departamento Ecommerce em [05], [06] e [10]: vale "pendente de comprovação" até haver parecer identificado | Cláudio (recomendação do Departamento Ecommerce) |

## Pendências por dono

**João**
- Fila acima (itens 1 a 3).
- Aparência e medidas finais do [02] LEVE; envelope definitivo do [03] B150.
- Domínio faixapreta.shop: confirmar titularidade e autorizar o acesso à Hostinger.
- MEI: ocupação (com contador) e conclusão da abertura.
- Enquadramento fiscal, NF-e, conta de recebimento.
- Preço; política de troca, cancelamento e arrependimento; publicar a política v03.
- WhatsApp comercial (número e autorização de criação).
- Autorizar o cadastro do Mercado Livre (PF); verificação no TikTok Shop.
- Verba de mídia paga (proposta da Helena: R$ 490 por 7 dias). Nada ativado.
- Acesso do João Victor à pasta "Faixa Preta - 10 objetos".
- Pasta "Faixa Preta - Documentação oficial" no seu Drive pessoal (3 PDFs + 8 DOCX): passa a ser histórico, já que esta base a substitui.
- Impressora: confirmar se há A1 mini própria ou se a produção fica no fornecedor.

**Departamento de Produtos**
- Medir e registrar no arquivo 04 as bases novas: [01] v07, [02] LEVE, [03] B150.
- Definir a função extra de [06], [07], [09] e [10].
- Volume útil do [10].
- Receber e avaliar a peça do [04] com o João (E5).

**Departamento Ecommerce**
- Comprovar o deploy do Banco de Desenvolvimento (rota /products, Pages banco-fp, redeploy do Escritório).
- Verificar chaves pessoais, chave mestra, leitura do Slack e expiração do status.
- Conferir o estado atual do DNS do faixapreta.shop.
- Parecer identificado de [05], [06] e [10], se for usado.

**Helena**
- Conferir o logo vetorial (zip em 00_MARCA).
- Hashtag da Coleção GEN.
- Fechar criativos dos posts 1, 3 e 4 e a montagem do post 2.

**Departamento Gestão**
- Executar o deploy pendente e a KEY_CLAUDIO (fora do chat).
- Subir uma foto por card no Banco quando houver peça física.

**Cláudio**
- Manter esta base; revisão semanal.
- Enxugar as rotinas agendadas (proposta do Departamento Gestão).

## Divergências encontradas e como ficaram

| # | Divergência | Como fica |
|---|---|---|
| 1 | P06 e P08 tratam a loja como Nuvemshop; em 15/11 foi criada a prévia na Shopify | Plataforma em decisão (fila, item 2). DNS segue na Nuvemshop |
| 2 | PDFs da marca citam **faixapreta.co**; o domínio registrado e apontado é **faixapreta.shop** | Vale faixapreta.shop |
| 3 | Lista Real v17 aponta versões antigas de [01], [02], [03] | **Resolvido:** v07-2p, LEVE e B150 (decisões de 14/11 à tarde) |
| 4 | Rodapés de [05], [06], [10]: "PENDENTE" x "CONFEREM" | **Resolvido:** vale "pendente de comprovação" |
| 5 | P05 a P08 e a Helena citam publicação reservada ao titular | **Superado** pela regra de 15/11 08h17: a palavra do Cláudio vale como a do João, inclusive para publicar. Gasto continua só com o João |
| 6 | P03 assume só fabricação por terceiros | Arquivo 05: máquina própria ou fornecedor, escolha do João |
| 7 | P04 cita "lista real v19"; o último arquivo no Drive é a v17; o Departamento de Produtos cita "pacote v21" | Vale esta base. Listas não serão mais reemitidas |
| 8 | Manual chama o vaso de "FP08"; no catálogo, FP-008 é o Powerbank | Vale o arquivo 04 (vaso = FP-003) |
| 9 | Manual mostra a gaveta com 150 × 150 × 20 mm | Imagem conceitual. Vale o arquivo 04 |
| 10 | Autores antigos (Bento, Dora, Nilo) assinam arquivos | Saíram do time; arquivos ficam como histórico |
| 11 | P05 cita a pasta "Faixa Preta - Documentação oficial" | Existe no Drive pessoal do João, fora da conta da FP. Vira histórico |
| 12 | Um resumo de 15/11 chama o Departamento Gestão de "CMO" | Departamento Gestão = coordenação; marketing = Helena |
| 13 | "Coleção 05 – Utilitária" nos PDFs | Coleção GEN (15/11) |


---

# FP · 10 · MAPA DO DRIVE

> Base de fonte da Faixa Preta · v01 · 15/11/2026 · Dono: Departamento Gestão (organização) · Status: VIGENTE
> Retrato auditado e reorganizado em 15/11 pelo Cláudio, com acordo do Departamento Gestão. Arquivamento executado: só movido, nada apagado nem renomeado.

## Estrutura (pasta FaixaPreta, conta da FP)

| Pasta | O que guarda (vigente) |
|---|---|
| **00_BASE** | Esta base de fonte: arquivos 00 a 10 + versão completa num arquivo só |
| **00_MARCA** | Manual de identidade visual, Apresentação da marca, Logos e ícones (zip, vetorial) |
| **01_PRODUTOS / 00 - Controle** | Lista Real v17 (só para conferir hash), auditoria estrutural de 14/11, 3 zips dos dossiês (backup) |
| **01_PRODUTOS / 01 a 10** | Uma pasta por objeto: STL, ficha, prancha, LEIA-ME, renders. Qual arquivo vale: ver arquivo 04. Subpastas `historico-v01-NAO-VIGENTE` e `emissoes-superadas` são histórico |
| **02_MARKETING** | Guia de conteúdo e lançamento |
| **03_LOJA** | (vazia) |
| **04_TECNOLOGIA / Codigos** | Banco de Desenvolvimento v01 (zip, contém o Escritório fonte v04) |
| **05_ATENDIMENTO** | (vazia) |
| **06_FINANCEIRO** | (vazia) |
| **07_ADMIN** | (vazia; procedimentos antigos arquivados) |
| **99_ARQUIVO** | Histórico (abaixo) |
| raiz da pasta | FaixaPreta.zip (pacote de contexto do Cláudio, 15/11) e escritorio.html (15/11 14h35, origem a confirmar) |

## O que foi para o 99_ARQUIVO em 15/11

| Subpasta | Conteúdo |
|---|---|
| `2026-11-14_procedimentos-e-listas` | P01 a P08 e guia do MEI (9 PDFs, antes em 07_ADMIN); 7 cópias antigas da Lista Real (antes em 01_PRODUTOS/00 - Controle) |
| `2026-11-14_codigo-escritorio` | Pastas escritorio-fp-novo v02 e v03; zips do Escritório fonte v02, v03 e v04 |
| `backups` | BACKUP_cloudflare_FP e BACKUP2_motor-conteudo-lite (15/11), antes soltos na raiz do Meu Drive |
| `2026-11-15_base-rascunho` | Rascunho de revisão desta base, com os comentários do João |
| (raiz do 99) | 2 zips de 12/11 (estudo de 8 objetos, FP-04 v0.7) |

## Fora da conta da FP

- **"Faixa Preta - Documentação oficial"**: pasta no Drive pessoal do João, com 3 PDFs revisados e 8 DOCX. A conta da FP não enxerga. Passa a ser histórico; esta base a substitui.

## Onde procurar cada coisa

| Preciso de... | Vá em |
|---|---|
| Regras, time, processo, decisões | 00_BASE (arquivos 01, 05, 09) |
| Cores, fontes, logo | 00_BASE/02 + 00_MARCA (logo vetorial) |
| STL e prancha de um objeto | 01_PRODUTOS/NN - Nome (arquivo vigente listado no 04) |
| Medidas e estado de um objeto | 00_BASE/04 |
| Código do painel | 04_TECNOLOGIA/Codigos |
| Roteiros e legendas | 00_BASE/03 |
| Documento antigo | 99_ARQUIVO |

## Regras de organização

- Pasta de área vazia continua existindo; documento novo daquela área entra nela.
- Um arquivo vigente por assunto. Versão anterior vai para 99_ARQUIVO no mesmo dia.
- Nome no padrão `FP_AREA_ITEM_vNN_AAAAMMDD.ext`. Arquivo técnico de produto: `FP-0NN-peca-vNN.ext`.
- Mover não quebra link do Drive. Renomear e apagar exigem o Cláudio.
- Pastas dos objetos (01 a 10) não mudam de lugar: o Banco de Desenvolvimento aponta para elas.
- Nada de backup solto na raiz do Meu Drive.


---

