/* PAINEL FP — menu, rotas por hash, escritório em pixel, avisos e service worker */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- dados ---------- */
  var ROUTES = { inicio: 'Painel', escritorio: 'Escritório', decidir: 'Decidir', produtos: 'Produtos', tarefas: 'Tarefas', ouvidoria: 'Ouvidoria', links: 'Links úteis' };
  var STATUS = { 'sem-sinal': 'Sem sinal', trabalhando: 'Trabalhando', aguardando: 'Aguardando', parado: 'Parado' };
  var TEAM = [ /* x,y em ladrilhos: liderança na diagonal central, time nas laterais */
    { id: 'joao', nome: 'João', area: 'Titular', x: 0.7, y: 1.5, w: 1.6 },
    { id: 'claudio', nome: 'Cláudio', area: 'Head', x: 2.8, y: 3.6, w: 1.6 },
    { id: 'osvaldo', nome: 'Osvaldo', area: 'Coordenação', x: 4.9, y: 5.7, w: 1.6 },
    { id: 'vicente', nome: 'Vicente', area: 'Produto', x: 0.2, y: 4.6, w: 1.6 },
    { id: 'dante', nome: 'Dante', area: 'Tecnologia', x: 0.8, y: 6.9, w: 1.6 },
    { id: 'helena', nome: 'Helena', area: 'Marca', x: 3.8, y: 1, w: 1.6 },
    { id: 'severino', nome: 'Severino', area: 'Conteúdo', x: 6.2, y: 1.6, w: 1.6 }
  ];

  /* ---------- menu ---------- */
  var body = document.body, ham = $('ham'), drw = $('drw'), main = $('main');
  function setMenu(open, keepFocus) {
    body.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', String(open));
    drw.inert = !open;
    main.inert = open;
    if (!keepFocus) (open ? $('cl') : ham).focus();
  }
  ham.addEventListener('click', function () { setMenu(true); });
  $('cl').addEventListener('click', function () { setMenu(false); });
  $('ov').addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('open')) setMenu(false);
  });

  /* ---------- rotas ---------- */
  var first = true;
  function route() {
    var r = (location.hash || '#inicio').slice(1); if (r === 'gerencia') r = 'decidir'; if (r === 'banco') r = 'produtos';
    if (!ROUTES[r]) r = 'inicio';
    document.querySelectorAll('.pg').forEach(function (s) { s.hidden = s.id !== 'p-' + r; });
    document.querySelectorAll('.drw a,.bn a').forEach(function (a) {
      if (a.dataset.r === r) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    $('sub').textContent = ROUTES[r];
    document.title = r === 'inicio' ? 'PAINEL FP' : ROUTES[r] + ' · PAINEL FP';
    if (body.classList.contains('open')) setMenu(false, true);
    window.scrollTo(0, 0);
    if (!first) { var h = document.querySelector('#p-' + r + ' h1'); if (h) h.focus({ preventScroll: true }); }
    first = false;
  }
  window.addEventListener('hashchange', route);

  /* ---------- escritório isométrico ---------- */
  var TW = 18, TH = 9, OX = 150, OY = 62, N = 8, WALL = 50;
  function P(x, y, z) { return (OX + (x - y) * TW).toFixed(1) + ',' + (OY + (x + y) * TH - z).toFixed(1); }
  function poly(pts, cls) { return '<polygon class="' + cls + '" points="' + pts.join(' ') + '"/>'; }
  function box(x, y, w, d, z0, h) {
    var z1 = z0 + h;
    return poly([P(x, y + d, z0), P(x + w, y + d, z0), P(x + w, y + d, z1), P(x, y + d, z1)], 'l') +
      poly([P(x + w, y, z0), P(x + w, y + d, z0), P(x + w, y + d, z1), P(x + w, y, z1)], 'r') +
      poly([P(x, y, z1), P(x + w, y, z1), P(x + w, y + d, z1), P(x, y + d, z1)], 'top');
  }
  function drawOffice() {
    var o = poly([P(0, 0, 0), P(N, 0, 0), P(N, 0, WALL), P(0, 0, WALL)], 'wa') +
      poly([P(0, 0, 0), P(0, N, 0), P(0, N, WALL), P(0, 0, WALL)], 'wb');
    for (var i = 0; i < N; i++) for (var j = 0; j < N; j++)
      o += poly([P(i, j, 0), P(i + 1, j, 0), P(i + 1, j + 1, 0), P(i, j + 1, 0)], 't' + ((i + j) % 2));
    var parts = [], labels = '';
    TEAM.forEach(function (a) {
      var cx = a.x + a.w / 2;
      parts.push({ d: cx + a.y, svg: box(cx - 0.4, a.y - 0.8, 0.8, 0.8, 0, 16) + box(cx - 0.3, a.y - 0.7, 0.6, 0.6, 16, 7) });
      parts.push({ d: a.x + a.y + a.w + 1, svg: box(a.x, a.y, a.w, 1, 0, 11) });
      var p = P(cx, a.y - 0.4, 36).split(',');
      labels += '<text x="' + p[0] + '" y="' + p[1] + '" text-anchor="middle">' + a.nome + '</text>' +
        '<rect id="lamp-' + a.id + '" data-st="sem-sinal" x="' + (p[0] - 3) + '" y="' + (+p[1] + 3) + '" width="6" height="6"/>';
    });
    parts.sort(function (a, b) { return a.d - b.d; });
    $('sc').innerHTML = o + parts.map(function (p) { return p.svg; }).join('') + labels;
    $('ag').innerHTML = TEAM.map(function (a) {
      return '<div class="ag" id="ag-' + a.id + '" data-st="sem-sinal"><div><b>' + a.nome + '</b><div class="lb">' + a.area +
        '</div></div><span class="st"><span class="dot"></span><span class="tx">' + STATUS['sem-sinal'] + '</span></span></div>';
    }).join('');
  }
  /* ponto de entrada do tempo real: FP.setStatus('dante','trabalhando') */
  function setStatus(id, st) {
    if (!STATUS[st]) return;
    var row = $('ag-' + id), lamp = $('lamp-' + id);
    if (!row) return;
    row.dataset.st = st; row.querySelector('.tx').textContent = STATUS[st];
    if (lamp) lamp.dataset.st = st;
  }
  window.FP = { setStatus: setStatus };

  /* ---------- status da equipe (banco: pessoas + status, so leitura) ---------- */
  function normId(n) { return String(n || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  function quando(ts) {
    if (!ts) return '';
    var m = Math.max(0, Math.round((Date.now() - new Date(ts).getTime()) / 60000));
    if (m < 1) return 'agora';
    if (m < 60) return 'h\u00e1 ' + m + ' min';
    var h = Math.floor(m / 60);
    if (h < 24) return 'h\u00e1 ' + h + ' h';
    return 'h\u00e1 ' + Math.floor(h / 24) + ' d';
  }
  function loadStatus() {
    if (!window.FPDB || !FPDB.session()) return;
    Promise.all([FPDB.get('pessoas?select=id,nome'), FPDB.get('status?select=pessoa_id,estado,tarefa,atualizado_em')]).then(function (rr) {
      var nomes = {}; rr[0].forEach(function (p) { nomes[p.id] = normId(p.nome); });
      rr[1].forEach(function (st) {
        var id = nomes[st.pessoa_id]; if (!id || !$('ag-' + id)) return;
        setStatus(id, st.estado);
        var tx = $('ag-' + id).querySelector('.tx');
        if (tx && STATUS[st.estado]) tx.textContent = STATUS[st.estado] + (st.atualizado_em ? ' \u00b7 ' + quando(st.atualizado_em) : '');
        var lb = $('ag-' + id).querySelector('.lb');
        if (lb && st.tarefa) lb.textContent = st.tarefa;
      });
    }).catch(function () {});
  }
  loadStatus();
  setInterval(function () { if (!document.hidden) loadStatus(); }, 60000);

  /* ---------- rede e atualização ---------- */
  function net() { $('off').hidden = navigator.onLine !== false; }
  window.addEventListener('online', net); window.addEventListener('offline', net);

  function registerSW() {
    if (!('serviceWorker' in navigator) || location.protocol !== 'https:') return;
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      function offer(w) { if (!w) return; $('upd').hidden = false; $('upd-b').onclick = function () { w.postMessage('skip'); }; }
      if (reg.waiting && navigator.serviceWorker.controller) offer(reg.waiting);
      reg.addEventListener('updatefound', function () {
        var w = reg.installing;
        w.addEventListener('statechange', function () { if (w.state === 'installed' && navigator.serviceWorker.controller) offer(w); });
      });
      var done = false;
      navigator.serviceWorker.addEventListener('controllerchange', function () { if (!done) { done = true; location.reload(); } });
    }).catch(function () { /* sem service worker neste ambiente: o painel segue funcionando */ });
  }

  /* ---------- copiar código de pendência (Gerência) ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.cp') : null;
    if (!b || !b.hasAttribute('data-code')) return;
    var txt = b.getAttribute('data-code') || '';
    function ok() {
      b.classList.add('ok');
      var label = b.innerHTML;
      b.innerHTML = '✓';
      setTimeout(function () { b.classList.remove('ok'); b.innerHTML = label; }, 1500);
    }
    function legacy() {
      var ta = document.createElement('textarea');
      ta.value = txt;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { if (document.execCommand('copy')) ok(); else window.prompt('Copie o código da pendência:', txt); }
      catch (err) { window.prompt('Copie o código da pendência:', txt); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, legacy);
    else legacy();
  });

  /* ---------- início ---------- */
  drw.inert = true;
  drawOffice(); route(); net();
  window.addEventListener('load', registerSW);
})();
