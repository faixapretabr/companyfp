/* PAINEL FP — Escritório ao vivo: planta isométrica, robôs que andam e status em tempo real.
   Fontes de status: Worker (WebSocket /ws + /state, público) e Supabase (tabela status, com login).
   ?demo=1 simula os status para conferência visual. */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var WS_URL = 'wss://escritorio-fp-realtime.faixapretabr2026.workers.dev/ws';
  var STATE_URL = 'https://escritorio-fp-realtime.faixapretabr2026.workers.dev/state';
  var STATUS = { trabalhando: 'Trabalhando', aguardando: 'Aguardando', parado: 'Parado', 'sem-sinal': 'Sem sinal' };
  var ORDER = ['trabalhando', 'aguardando', 'parado', 'sem-sinal'];
  var ALIAS = { osvaldo: 'g01' }; /* G01 ainda pode chegar como "osvaldo" */
  var DEMO = /[?&]demo=1/.test(location.search);
  var REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- organograma (decisão 9) e posição de cada mesa na planta ---------- */
  var DEPS = [
    { id: 'g', nome: 'Gestão', ag: [['joao', 'JOÃO', 'Titular'], ['claudio', 'CLÁUDIO', 'Head da operação'], ['g01', 'G01', 'Gestão geral']] },
    { id: 'm', nome: 'Marketing', ag: [['m01', 'M01', 'Estratégia e marca'], ['m02', 'M02', 'Conteúdo e criação'], ['m03', 'M03', 'Tráfego pago'], ['m04', 'M04', 'Relacionamento']] },
    { id: 'o', nome: 'Operação', ag: [['o01', 'O01', 'Atendimento'], ['o02', 'O02', 'Pedido e entrega'], ['o03', 'O03', 'Insumo e estoque'], ['o04', 'O04', 'Caixa e MEI']] },
    { id: 'i', nome: 'Inteligência', ag: [['i01', 'I01', 'Concorrentes'], ['i02', 'I02', 'Demanda e nichos'], ['i03', 'I03', 'Ofertas e revenda'], ['i04', 'I04', 'Preço e frete'], ['i05', 'I05', 'Fornecedores'], ['i06', 'I06', 'Produtos de referência'], ['i07', 'I07', 'Conferência legal'], ['i08', 'I08', 'Coordena I01 a I07']] }
  ];
  /* mesas em ladrilhos (x,y) numa planta 12 x 12 */
  var DESK = {
    joao: [4.2, 0.6], claudio: [5.7, 0.6], g01: [7.2, 0.6],
    m01: [0.5, 4.1], m02: [2.0, 4.1], m03: [0.5, 6.1], m04: [2.0, 6.1],
    o01: [8.4, 4.1], o02: [9.9, 4.1], o03: [8.4, 6.1], o04: [9.9, 6.1],
    i01: [0.4, 9.4], i02: [1.8, 9.4], i03: [3.2, 9.4], i04: [4.6, 9.4], i05: [6.0, 9.4], i06: [7.4, 9.4], i07: [8.8, 9.4], i08: [10.2, 9.4]
  };
  var ZONES = [ /* x, y, w, d, nome */
    [3.9, 0.2, 4.9, 2.2, 'Gestão'], [0.2, 3.6, 3.5, 4.3, 'Marketing'], [8.1, 3.6, 3.5, 4.3, 'Operação'], [0.1, 8.9, 11.7, 2.8, 'Inteligência']
  ];
  var TABLE = [5.0, 4.6, 2.0, 1.6];          /* mesa de reunião no centro */
  var SPOTS = [[4.7, 5.2], [7.3, 5.6], [6.0, 4.2], [5.6, 6.6], [10.9, 1.4], [11.1, 2.1]]; /* volta da mesa + café */
  var QUEUE = [[4.2, 3.0], [5.0, 3.0], [5.8, 3.0], [6.6, 3.0], [7.4, 3.0], [8.2, 3.0]];   /* corredor de espera */

  var AG = {}; DEPS.forEach(function (d) { d.ag.forEach(function (a) { AG[a[0]] = { id: a[0], cod: a[1], papel: a[2], dep: d.id, st: 'sem-sinal', tarefa: '', em: 0 }; }); });

  /* ---------- geometria isométrica ---------- */
  var TW = 11, TH = 5.5, OX = 140, OY = 46, N = 12, WALL = 34;
  function sx(x, y) { return (x - y) * TW; }
  function sy(x, y, z) { return (x + y) * TH - (z || 0); }
  function pt(x, y, z, ox, oy) { return ((ox || 0) + sx(x, y)).toFixed(1) + ',' + ((oy || 0) + sy(x, y, z)).toFixed(1); }
  function P(x, y, z) { return pt(x, y, z, OX, OY); }
  function R(x, y, z) { return pt(x, y, z, 0, 0); }
  function poly(pts, cls) { return '<polygon class="' + cls + '" points="' + pts.join(' ') + '"/>'; }
  function box(f, x, y, w, d, z0, h, cls) {
    var z1 = z0 + h, c = cls ? cls + ' ' : '';
    return poly([f(x, y + d, z0), f(x + w, y + d, z0), f(x + w, y + d, z1), f(x, y + d, z1)], c + 'l') +
      poly([f(x + w, y, z0), f(x + w, y + d, z0), f(x + w, y + d, z1), f(x + w, y, z1)], c + 'r') +
      poly([f(x, y, z1), f(x + w, y, z1), f(x + w, y + d, z1), f(x, y + d, z1)], c + 't');
  }
  function floorText(x, y, txt, cls) {
    var p = P(x, y, 0).split(',');
    return '<text class="' + cls + '" transform="matrix(0.894,0.447,-0.894,0.447,' + p[0] + ',' + p[1] + ')">' + txt + '</text>';
  }

  /* ---------- planta (estática) ---------- */
  function staticScene() {
    var o = poly([P(0, 0, 0), P(N, 0, 0), P(N, 0, WALL), P(0, 0, WALL)], 'wall') +
      poly([P(0, 0, 0), P(0, N, 0), P(0, N, WALL), P(0, 0, WALL)], 'wall wall-b') +
      poly([P(0, 0, 0), P(N, 0, 0), P(N, N, 0), P(0, N, 0)], 'floor');
    for (var i = 1; i < N; i++) o += '<polyline class="grid" points="' + P(i, 0, 0) + ' ' + P(i, N, 0) + '"/><polyline class="grid" points="' + P(0, i, 0) + ' ' + P(N, i, 0) + '"/>';
    /* régua na parede do fundo: marcação de obra */
    for (var k = 0; k <= N * 2; k++) { var x = k / 2; o += '<polyline class="tick" points="' + P(x, 0, WALL - 4) + ' ' + P(x, 0, WALL - (k % 2 ? 7 : 10)) + '"/>'; }
    ZONES.forEach(function (z) {
      o += poly([P(z[0], z[1], 0), P(z[0] + z[2], z[1], 0), P(z[0] + z[2], z[1] + z[3], 0), P(z[0], z[1] + z[3], 0)], 'zone');
      o += floorText(z[0] + 0.15, z[1] + z[3] - 0.25, z[4].toUpperCase(), 'zname');
    });
    return o;
  }
  /* peças com profundidade: mesas, mesa de reunião, café e robôs (reordenadas a cada quadro) */
  function deskSvg(id) {
    var d = DESK[id], x = d[0], y = d[1];
    return '<g class="desk" data-d="' + id + '">' + box(P, x, y, 1.1, 0.62, 0, 6) +
      '<g class="mon" data-mon="' + id + '">' + poly([P(x + 0.3, y + 0.32, 6), P(x + 0.8, y + 0.32, 6), P(x + 0.8, y + 0.32, 10.5), P(x + 0.3, y + 0.32, 10.5)], 'scr') + '</g></g>';
  }
  function botSvg(id) {
    var a = AG[id];
    return '<g class="bot" data-b="' + id + '" data-st="sem-sinal" data-dep="' + a.dep + '"><g class="bob">' +
      box(R, -0.17, -0.17, 0.34, 0.34, 0, 7, 'body') + box(R, -0.13, -0.13, 0.26, 0.26, 7, 5, 'head') +
      poly([R(-0.08, 0.13, 9), R(-0.02, 0.13, 9), R(-0.02, 0.13, 10.6), R(-0.08, 0.13, 10.6)], 'eye') +
      poly([R(0.02, 0.13, 9), R(0.08, 0.13, 9), R(0.08, 0.13, 10.6), R(0.02, 0.13, 10.6)], 'eye') +
      box(R, -0.06, -0.06, 0.12, 0.12, 12, 2.2, 'lamp') +
      '</g><g class="tag"><rect x="-13" y="-30" width="26" height="11"/><text x="0" y="-21.6" text-anchor="middle">' + a.cod + '</text></g></g>';
  }

  /* ---------- robôs: posição e movimento ---------- */
  var BOTS = {};
  Object.keys(AG).forEach(function (id) {
    var d = DESK[id], hx = d[0] + 0.55, hy = d[1] + 1.05;
    BOTS[id] = { id: id, home: [hx, hy], x: hx, y: hy, path: [], wait: 1 + Math.random() * 8, speed: 1.3, phase: Math.random() * 6 };
  });
  function aisle(y) { return y > 8.2 ? 8.4 : 3.0; }
  function route(b, to) {
    var fy = aisle(b.y), ty = aisle(to[1]), p = [];
    p.push([b.x, fy]);
    if (fy !== ty) { p.push([6.2, fy]); p.push([6.2, ty]); }
    p.push([to[0], ty]); p.push(to);
    b.path = p;
  }
  var queueUsed = {};
  function decide(b) {
    var st = AG[b.id].st, atHome = Math.abs(b.x - b.home[0]) < 0.05 && Math.abs(b.y - b.home[1]) < 0.05;
    if (st === 'aguardando') {
      b.speed = 0.7;
      if (b.q == null) { for (var i = 0; i < QUEUE.length; i++) if (!queueUsed[i]) { queueUsed[i] = b.id; b.q = i; break; } if (b.q == null) b.q = Math.floor(Math.random() * QUEUE.length); }
      var q = QUEUE[b.q], j = (Math.random() - 0.5) * 0.5;
      route(b, [q[0] + j, q[1] + (Math.random() - 0.5) * 0.3]);
      b.wait = 3 + Math.random() * 5; return;
    }
    if (b.q != null) { if (queueUsed[b.q] === b.id) delete queueUsed[b.q]; b.q = null; }
    b.speed = 1.3;
    if (st === 'trabalhando') {
      if (atHome && Math.random() < 0.35) { route(b, SPOTS[Math.floor(Math.random() * SPOTS.length)]); b.wait = 4 + Math.random() * 5; }
      else { if (!atHome) route(b, b.home); b.wait = 12 + Math.random() * 25; }
      return;
    }
    if (!atHome) route(b, b.home);
    b.wait = 6;
  }
  function step(b, dt) {
    if (b.path.length) {
      var t = b.path[0], dx = t[0] - b.x, dy = t[1] - b.y, dist = Math.sqrt(dx * dx + dy * dy), m = b.speed * dt;
      if (dist <= m) { b.x = t[0]; b.y = t[1]; b.path.shift(); } else { b.x += dx / dist * m; b.y += dy / dist * m; }
      b.walking = true;
    } else {
      b.walking = false;
      b.wait -= dt; if (b.wait <= 0) decide(b);
    }
  }

  /* ---------- montagem das cenas (início e escritório) ---------- */
  var scenes = [];
  function build() {
    document.querySelectorAll('.office-scene').forEach(function (svg) {
      svg.setAttribute('viewBox', '0 8 280 176');
      var items = Object.keys(AG).map(function (id) { return { k: 'd', id: id, svg: deskSvg(id) }; });
      items.push({ k: 's', svg: '<g class="desk" data-depth="' + (TABLE[0] + TABLE[1] + TABLE[2] + TABLE[3]) + '">' + box(P, TABLE[0], TABLE[1], TABLE[2], TABLE[3], 0, 5, 'tbl') + '</g>' });
      items.push({ k: 's', svg: '<g class="desk" data-depth="' + 13.4 + '">' + box(P, 11.0, 0.5, 0.7, 0.7, 0, 9, 'cafe') + '</g>' });
      Object.keys(AG).forEach(function (id) { items.push({ k: 'b', id: id, svg: botSvg(id) }); });
      svg.innerHTML = '<g class="plan">' + staticScene() + '</g><g class="depth">' + items.map(function (i) { return i.svg; }).join('') + '</g>';
      var depth = svg.querySelector('.depth'), nodes = [];
      depth.querySelectorAll('.desk').forEach(function (el) {
        var id = el.dataset.d, d = id ? DESK[id] : null;
        nodes.push({ el: el, depth: d ? d[0] + d[1] + 1.72 : +el.dataset.depth });
      });
      var bots = {};
      depth.querySelectorAll('.bot').forEach(function (el) { var n = { el: el, bot: BOTS[el.dataset.b], depth: 0 }; nodes.push(n); bots[el.dataset.b] = el; });
      svg.addEventListener('click', function (e) { var g = e.target.closest && e.target.closest('.bot'); if (g) select(g.dataset.b, true); });
      scenes.push({ svg: svg, depth: depth, nodes: nodes, bots: bots, order: '' });
    });
  }
  function frame(dt) {
    Object.keys(BOTS).forEach(function (id) { step(BOTS[id], dt); });
    scenes.forEach(function (s) {
      if (!s.svg.getClientRects().length) return;            /* cena escondida: não desenha */
      s.nodes.forEach(function (n) {
        if (!n.bot) return;
        var b = n.bot, bob = b.walking ? Math.abs(Math.sin(performance.now() / 120 + b.phase)) * 1.6 : 0;
        n.depth = b.x + b.y + 0.4;
        n.el.setAttribute('transform', 'translate(' + (OX + sx(b.x, b.y)).toFixed(1) + ',' + (OY + sy(b.x, b.y) - bob).toFixed(1) + ') scale(1.45)');
      });
      var sorted = s.nodes.slice().sort(function (a, b) { return a.depth - b.depth; });
      var key = sorted.map(function (n) { return n.bot ? n.bot.id : n.depth; }).join('|');
      if (key !== s.order) { s.order = key; sorted.forEach(function (n) { s.depth.appendChild(n.el); }); }
    });
  }
  var last = 0, running = false;
  function loop(t) {
    if (document.hidden) { running = false; return; }
    var dt = last ? Math.min(0.1, (t - last) / 1000) : 0; last = t;
    frame(dt);
    requestAnimationFrame(loop);
  }
  function start() {
    if (REDUCED) { frame(0); return; }                    /* movimento reduzido: robôs parados nas mesas */
    if (running) return; running = true; last = 0; requestAnimationFrame(loop);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) start(); });

  /* ---------- status ---------- */
  function quando(ms) {
    if (!ms) return '';
    var m = Math.max(0, Math.round((Date.now() - ms) / 60000));
    if (m < 1) return 'agora';
    if (m < 60) return 'há ' + m + ' min';
    var h = Math.floor(m / 60); if (h < 24) return 'há ' + h + ' h';
    return 'há ' + Math.floor(h / 24) + ' d';
  }
  function setStatus(rawId, st, tarefa, em) {
    var id = ALIAS[rawId] || rawId, a = AG[id];
    if (!a || !STATUS[st]) return;
    em = em || Date.now();
    if (a.em && em < a.em) return;                          /* fica o mais recente entre Worker e banco */
    var mudou = a.st !== st;
    a.st = st; a.tarefa = tarefa || ''; a.em = em;
    if (mudou && BOTS[id]) BOTS[id].wait = Math.random() * 1.5;
    paint(id);
  }
  function paint(id) {
    var a = AG[id];
    scenes.forEach(function (s) {
      var el = s.bots[id]; if (el) el.dataset.st = a.st;
      var mon = s.svg.querySelector('[data-mon="' + id + '"]'); if (mon) mon.dataset.st = a.st;
    });
    var row = $('ag-' + id);
    if (row) {
      row.dataset.st = a.st;
      row.querySelector('.ag-sn').textContent = STATUS[a.st]; row.querySelector('.ag-qd').textContent = a.em ? quando(a.em) : '';
      var tf = row.querySelector('.ag-tf'); tf.textContent = a.tarefa; tf.hidden = !a.tarefa;
    }
    tally();
  }
  function tally() {
    var c = { trabalhando: 0, aguardando: 0, parado: 0, 'sem-sinal': 0 }, tot = 0;
    Object.keys(AG).forEach(function (id) { if (filtro && AG[id].dep !== filtro) return; c[AG[id].st]++; tot++; });
    var bar = $('esc-fita'); if (!bar) return;
    bar.innerHTML = ORDER.map(function (s) { return c[s] ? '<span class="seg" data-st="' + s + '" style="flex-grow:' + c[s] + '"></span>' : ''; }).join('');
    bar.setAttribute('aria-label', ORDER.map(function (s) { return c[s] + ' ' + STATUS[s].toLowerCase(); }).join(', '));
    $('esc-leg').innerHTML = ORDER.map(function (s) { return '<span data-st="' + s + '"><i></i><b>' + c[s] + '</b> ' + STATUS[s].toLowerCase() + '</span>'; }).join('');
    var h = $('home-vivo'); if (h) h.textContent = c.trabalhando + ' de ' + tot + ' trabalhando agora';
  }

  /* ---------- lista e filtro ---------- */
  var filtro = '';
  function buildList() {
    var el = $('ag'); if (!el) return;
    el.innerHTML = DEPS.map(function (d) {
      return '<section class="dep" data-dep="' + d.id + '"><h2 class="dep-h">' + d.nome + '<span>' + d.ag.length + '</span></h2>' + d.ag.map(function (x) {
        var a = AG[x[0]];
        return '<button type="button" class="ag" id="ag-' + a.id + '" data-id="' + a.id + '" data-st="' + a.st + '"><span class="ag-cod">' + a.cod +
          '</span><span class="ag-txt"><span class="ag-pp">' + a.papel + '</span><span class="ag-tf" hidden></span></span><span class="ag-st"><span class="ag-sn">' + STATUS[a.st] + '</span><span class="ag-qd"></span></span></button>';
      }).join('') + '</section>';
    }).join('');
    el.addEventListener('click', function (e) { var b = e.target.closest('.ag'); if (b) select(b.dataset.id, false); });
    var f = $('esc-filtro');
    if (f) f.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      filtro = b.dataset.f;
      f.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      el.querySelectorAll('.dep').forEach(function (s) { s.hidden = !!filtro && s.dataset.dep !== filtro; });
      scenes.forEach(function (s) { s.svg.classList.toggle('filtrada', !!filtro); s.svg.querySelectorAll('.bot').forEach(function (g) { g.classList.toggle('foco', g.dataset.dep === filtro); }); });
      tally();
    });
  }
  var sel = null;
  function select(id, fromScene) {
    sel = sel === id ? null : id;
    scenes.forEach(function (s) { Object.keys(s.bots).forEach(function (k) { s.bots[k].classList.toggle('sel', k === sel); }); });
    document.querySelectorAll('#ag .ag').forEach(function (r) { r.setAttribute('aria-current', String(r.dataset.id === sel)); });
    if (!sel) return;
    if (fromScene) { var r = $('ag-' + sel); if (r) r.scrollIntoView({ block: 'nearest', behavior: REDUCED ? 'auto' : 'smooth' }); }
    else { var st = document.querySelector('#p-escritorio .stage'); if (st && st.getBoundingClientRect().bottom < 80) st.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' }); }
  }

  /* ---------- tempo real ---------- */
  var ws = null, tries = 0, pingT = null, vivo = 'off';
  function conn(s) {
    vivo = s;
    var t = { on: 'Ao vivo', try: 'Reconectando', off: 'Sem conexão', demo: 'Demonstração' }[s];
    document.querySelectorAll('.vivo').forEach(function (el) { el.dataset.v = s; el.querySelector('.vivo-tx').textContent = t; });
  }
  function onState(team) { Object.keys(team || {}).forEach(function (k) { var v = team[k]; setStatus(k, v.st, v.tarefa, v.em); }); }
  function connect() {
    if (DEMO || !('WebSocket' in window)) return;
    try { ws = new WebSocket(WS_URL); } catch (e) { return retry(); }
    conn('try');
    ws.onopen = function () { tries = 0; conn('on'); clearInterval(pingT); pingT = setInterval(function () { try { ws.send('ping'); } catch (e) {} }, 25000); };
    ws.onmessage = function (e) {
      if (e.data === 'pong') return;
      var m; try { m = JSON.parse(e.data); } catch (x) { return; }
      if (m.tipo === 'estado') onState(m.team);
      else if (m.tipo === 'status') setStatus(m.id, m.st, m.tarefa, m.em);
      $('esc-hora') && ($('esc-hora').textContent = 'atualizado ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    ws.onclose = function () { clearInterval(pingT); retry(); };
    ws.onerror = function () { try { ws.close(); } catch (e) {} };
  }
  function retry() { conn(navigator.onLine === false ? 'off' : 'try'); var d = Math.min(30000, 1000 * Math.pow(2, tries++)); setTimeout(connect, d); }
  function firstState() {
    if (DEMO) return;
    fetch(STATE_URL, { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) { onState(j.team); }).catch(function () {});
  }
  /* banco (Supabase): segunda fonte, quando há login */
  function norm(n) { return String(n || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  function fromDb() {
    if (DEMO || !window.FPDB || !FPDB.session()) return;
    Promise.all([FPDB.get('pessoas?select=id,nome'), FPDB.get('status?select=pessoa_id,estado,tarefa,atualizado_em')]).then(function (rr) {
      var ids = {}; rr[0].forEach(function (p) { var m = /\b([gmoi]\d{2})\b/i.exec(p.nome || ''); ids[p.id] = m ? m[1].toLowerCase() : norm(p.nome); });
      rr[1].forEach(function (s) { setStatus(ids[s.pessoa_id], s.estado, s.tarefa, s.atualizado_em ? new Date(s.atualizado_em).getTime() : 0); });
    }).catch(function () {});
  }
  function demo() {
    conn('demo');
    var ids = Object.keys(AG), tarefas = ['Revisando briefing do porta-canetas [04]', 'Comparando preço de filamento', 'Respondendo cliente', 'Roteiro do Reels da coleção 05', 'Fechando caixa do dia'];
    function roll() { ids.forEach(function (id) { var r = Math.random(); setStatus(id, r < 0.5 ? 'trabalhando' : r < 0.68 ? 'aguardando' : r < 0.82 ? 'parado' : 'sem-sinal', tarefas[Math.floor(Math.random() * tarefas.length)], Date.now() - Math.random() * 3e6); }); }
    roll(); setInterval(function () { var id = ids[Math.floor(Math.random() * ids.length)]; AG[id].em = 0; setStatus(id, ORDER[Math.floor(Math.random() * 3)], tarefas[Math.floor(Math.random() * tarefas.length)], Date.now()); }, 4000);
  }

  /* ---------- início ---------- */
  build(); buildList();
  Object.keys(AG).forEach(paint);
  if (DEMO) demo(); else { firstState(); connect(); fromDb(); setInterval(function () { if (!document.hidden) fromDb(); }, 60000); }
  setInterval(function () { Object.keys(AG).forEach(paint); }, 30000);      /* atualiza o "há X min" */
  window.addEventListener('online', function () { if (vivo !== 'on') { tries = 0; connect(); } });
  start();
  window.FP = { setStatus: function (id, st, tarefa) { setStatus(id, st, tarefa, Date.now()); } };
})();
