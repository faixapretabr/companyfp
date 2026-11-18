/* PAINEL FP — menu, rotas por hash, escritório em pixel, avisos e service worker */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- dados ---------- */
  var ROUTES = { inicio: 'Painel', escritorio: 'Escritório', decidir: 'Decidir', aprovacao: 'Aprovação', produtos: 'Produtos', tarefas: 'Tarefas', ouvidoria: 'Ouvidoria', links: 'Links úteis' };
  var STATUS = { 'sem-sinal': 'Sem sinal', trabalhando: 'Trabalhando', aguardando: 'Aguardando', parado: 'Parado' };
  var TEAM = [ /* x,y em ladrilhos: liderança na diagonal central, time nas laterais */
    { id: 'joao', top: 'antenna', nome: 'João', area: 'Titular', x: 0.7, y: 1.5, w: 1.6 },
    { id: 'claudio', top: 'cap', nome: 'Cláudio', area: 'Head', x: 2.8, y: 3.6, w: 1.6 },
    { id: 'osvaldo', top: 'band', nome: 'Osvaldo', area: 'G01 Gestão e Coordenação', x: 4.9, y: 5.7, w: 1.6 },
    { id: 'helena', top: 'bun', nome: 'Helena', area: 'M01 Marca', x: 3.8, y: 1, w: 1.6 },
    { id: 'severino', top: 'visor', nome: 'Severino', area: 'M02 Conteúdo', x: 6.2, y: 1.6, w: 1.6 }
  ];
  /* Organograma (DECISOES 9): agentes por código, agrupados por departamento */
  var DEPS = [
    { nome: 'Gestão Geral', ag: [['g01', 'Osvaldo · coordenação']] },
    { nome: 'Marketing', ag: [['m01', 'Estratégia e marca'], ['m02', 'Conteúdo e criação'], ['m03', 'Tráfego pago'], ['m04', 'Relacionamento']] },
    { nome: 'Operação', ag: [['o01', 'Atendimento'], ['o02', 'Pedido e entrega'], ['o03', 'Insumo e estoque'], ['o04', 'Caixa e MEI']] },
    { nome: 'Inteligência Competitiva', ag: [['i01', 'Concorrentes'], ['i02', 'Demanda e nichos'], ['i03', 'Ofertas e revenda'], ['i04', 'Preço e frete'], ['i05', 'Fornecedores'], ['i06', 'Produtos de referência'], ['i07', 'Conferência legal'], ['i08', 'Coordenação de I01 a I07']] }
  ];
  var ALIAS = { osvaldo: 'g01', helena: 'm01', severino: 'm02' }; /* decisão 9: mesa da cena -> código */

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
    var scs = document.querySelectorAll('.office-scene'); if (!scs.length) return;
    var o = poly([P(0, 0, 0), P(N, 0, 0), P(N, 0, WALL), P(0, 0, WALL)], 'wa') +
      poly([P(0, 0, 0), P(0, N, 0), P(0, N, WALL), P(0, 0, WALL)], 'wb');
    for (var i = 0; i < N; i++) for (var j = 0; j < N; j++)
      o += poly([P(i, j, 0), P(i + 1, j, 0), P(i + 1, j + 1, 0), P(i, j + 1, 0)], 't' + ((i + j) % 2));
    /* tapete central */
    o += poly([P(1.6, 3, 0), P(6.4, 3, 0), P(6.4, 7, 0), P(1.6, 7, 0)], 'rug');
    /* letreiro da marca na parede do fundo */
    /* slogan pintado no chao */
    var sp = P(2.5, 7.2, 0).split(',');
    o += '<text class="decal" transform="matrix(0.85,0.425,-0.85,0.425,' + sp[0] + ',' + sp[1] + ')">NADA \u00c9 S\u00d3 O QUE PARECE</text>';
    /* quadro com lembretes na parede esquerda */
    o += poly([P(0, 1.6, 26), P(0, 4.6, 26), P(0, 4.6, 40), P(0, 1.6, 40)], 'board') +
      poly([P(0, 2, 35), P(0, 2.7, 35), P(0, 2.7, 37.5), P(0, 2, 37.5)], 'note') +
      poly([P(0, 3.1, 30.5), P(0, 3.8, 30.5), P(0, 3.8, 33), P(0, 3.1, 33)], 'note2') +
      poly([P(0, 3.9, 35.5), P(0, 4.4, 35.5), P(0, 4.4, 38), P(0, 3.9, 38)], 'note');
    var parts = [], labels = [];
    TEAM.forEach(function (a, ai) {
      var cx = a.x + a.w / 2, ay = a.y;
      var g = '<g class="rb" data-rb="' + a.id + '" data-st="sem-sinal" style="animation-delay:-' + (ai * 0.37).toFixed(2) + 's">';
      g += box(cx - 0.24, ay - 0.64, 0.18, 0.5, 0, 6) + box(cx + 0.06, ay - 0.64, 0.18, 0.5, 0, 6) +
        box(cx - 0.3, ay - 0.7, 0.6, 0.6, 6, 9) +
        box(cx - 0.22, ay - 0.62, 0.44, 0.44, 15, 7);
      if (a.top === 'visor')
        g += poly([P(cx - 0.15, ay - 0.18, 18.5), P(cx + 0.15, ay - 0.18, 18.5), P(cx + 0.15, ay - 0.18, 20.5), P(cx - 0.15, ay - 0.18, 20.5)], 'eye');
      else
        g += poly([P(cx - 0.13, ay - 0.18, 18.5), P(cx - 0.05, ay - 0.18, 18.5), P(cx - 0.05, ay - 0.18, 20.5), P(cx - 0.13, ay - 0.18, 20.5)], 'eye') +
          poly([P(cx + 0.03, ay - 0.18, 18.5), P(cx + 0.11, ay - 0.18, 18.5), P(cx + 0.11, ay - 0.18, 20.5), P(cx + 0.03, ay - 0.18, 20.5)], 'eye');
      if (a.top === 'antenna') g += box(cx - 0.04, ay - 0.44, 0.08, 0.08, 22, 2.5) + poly([P(cx - 0.09, ay - 0.47, 24.5), P(cx + 0.09, ay - 0.47, 24.5), P(cx + 0.09, ay - 0.47, 26.3), P(cx - 0.09, ay - 0.47, 26.3)], 'tip');
      else if (a.top === 'cap') g += '<g class="hat">' + box(cx - 0.28, ay - 0.68, 0.56, 0.56, 22, 1.6) + '</g>';
      else if (a.top === 'band') g += '<g class="hat">' + box(cx - 0.26, ay - 0.66, 0.52, 0.52, 21.6, 1.2) + '</g>' + poly([P(cx + 0.2, ay - 0.2, 16.4), P(cx + 0.3, ay - 0.2, 16.4), P(cx + 0.3, ay - 0.2, 17.4), P(cx + 0.2, ay - 0.2, 17.4)], 'tip');
      else if (a.top === 'horns') g += box(cx - 0.32, ay - 0.5, 0.12, 0.12, 22, 1.8) + box(cx + 0.2, ay - 0.5, 0.12, 0.12, 22, 1.8);
      else if (a.top === 'ears') g += box(cx - 0.36, ay - 0.56, 0.1, 0.24, 17, 3) + box(cx + 0.26, ay - 0.56, 0.1, 0.24, 17, 3);
      else if (a.top === 'bun') g += '<g class="hat">' + box(cx - 0.13, ay - 0.53, 0.26, 0.26, 22, 2.2) + '</g>';
      g += '<polygon class="chest" data-ch="' + a.id + '" data-st="sem-sinal" points="' + [P(cx - 0.07, ay - 0.1, 9), P(cx + 0.07, ay - 0.1, 9), P(cx + 0.07, ay - 0.1, 11.5), P(cx - 0.07, ay - 0.1, 11.5)].join(' ') + '"/></g>';
      parts.push({ d: cx + ay, svg: g });
      /* mesa com monitor (tela acende conforme o status) */
      var mon = '<g class="mon" data-mon="' + a.id + '" data-st="sem-sinal">' +
        poly([P(a.x + 0.15, ay + 0.75, 11), P(a.x + 0.65, ay + 0.75, 11), P(a.x + 0.65, ay + 0.75, 15.5), P(a.x + 0.15, ay + 0.75, 15.5)], 'scr') +
        poly([P(a.x + 0.36, ay + 0.78, 10.4), P(a.x + 0.44, ay + 0.78, 10.4), P(a.x + 0.44, ay + 0.78, 11), P(a.x + 0.36, ay + 0.78, 11)], 'mst') + '</g>';
      var extra = '';
      if (a.id === 'joao') extra = '<g class="mug">' + box(a.x + a.w - 0.4, ay + 0.15, 0.18, 0.18, 11, 1.8) + '</g>';
      parts.push({ d: a.x + ay + a.w + 1, svg: box(a.x, ay, a.w, 1, 0, 11) + mon + extra });
      var p = P(cx, a.y - 0.4, 46).split(',');
      labels.push({ d: cx + ay + 0.02, svg: '<text x="' + p[0] + '" y="' + p[1] + '" text-anchor="middle">' + a.nome + '</text>' +
        '<rect data-lamp="' + a.id + '" data-st="sem-sinal" x="' + (p[0] - 3) + '" y="' + (+p[1] + 3) + '" width="6" height="6"/>' });
    });
    /* vaso de planta no canto */
    parts.push({ d: 14.4, svg: '<g class="plant">' + box(6.9, 7, 0.6, 0.6, 0, 3.5) +
      poly([P(7.2, 7.3, 3.5), P(6.7, 7.3, 10), P(7.2, 7.3, 6.5)], 'leaf') +
      poly([P(7.2, 7.3, 3.5), P(7.2, 6.75, 9), P(7.2, 7.3, 6.5)], 'leaf') +
      poly([P(7.2, 7.3, 3.5), P(7.75, 7.55, 10.5), P(7.2, 7.3, 6.5)], 'leaf') + '</g>' });
    parts = parts.concat(labels);
    parts.sort(function (a, b) { return a.d - b.d; });
    var html = o + parts.map(function (p) { return p.svg; }).join('');
    scs.forEach(function (s) { s.innerHTML = html; });
    var agL = $('ag'); if (agL) agL.innerHTML = DEPS.map(function (d) {
      return '<div class="dep"><div class="lb">' + d.nome + '</div>' + d.ag.map(function (a) {
        return '<div class="ag" id="ag-' + a[0] + '" data-st="sem-sinal"><div><b>' + a[0].toUpperCase() + '</b><div class="lb">' + a[1] +
          '</div><div class="lb tf"></div></div><span class="st"><span class="dot"></span><span class="tx">' + STATUS['sem-sinal'] + '</span></span></div>';
      }).join('') + '</div>';
    }).join('');
  }
  /* ponto de entrada do tempo real: FP.setStatus('m01','trabalhando') */
  function setStatus(id, st) {
    if (!STATUS[st]) return;
    var row = $('ag-' + (ALIAS[id] || id));
    if (row) { row.dataset.st = st; row.querySelector('.tx').textContent = STATUS[st]; }
    document.querySelectorAll('[data-lamp="' + id + '"],[data-ch="' + id + '"],[data-rb="' + id + '"],[data-mon="' + id + '"]').forEach(function (el) { el.dataset.st = st; });
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
      var nomes = {}; rr[0].forEach(function (p) { var m = /\b([gmoi]\d{2})\b/i.exec(p.nome || ''); nomes[p.id] = m ? m[1].toLowerCase() : normId(p.nome); });
      rr[1].forEach(function (st) {
        var id = nomes[st.pessoa_id], rid = ALIAS[id] || id; if (!id || !$('ag-' + rid)) { if (id) setStatus(id, st.estado); return; }
        setStatus(id, st.estado);
        var tx = $('ag-' + rid).querySelector('.tx');
        if (tx && STATUS[st.estado]) tx.textContent = STATUS[st.estado] + (st.atualizado_em ? ' \u00b7 ' + quando(st.atualizado_em) : '');
        var lb = $('ag-' + rid).querySelector('.tf');
        if (lb) lb.textContent = st.tarefa || '';
      });
    }).catch(function () {});
  }
  loadStatus();
  setInterval(function () { if (!document.hidden) loadStatus(); }, 60000);

  /* ---------- instalar o app ---------- */
  var deferredPrompt = null;
  var instBtn = $('inst'), iosTip = $('ios-tip');
  var standalone = window.matchMedia && matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferredPrompt = e; if (instBtn) instBtn.hidden = false;
  });
  window.addEventListener('appinstalled', function () { deferredPrompt = null; if (instBtn) instBtn.hidden = true; if (iosTip) iosTip.hidden = true; });
  if (!standalone && iosTip && /iphone|ipad|ipod/i.test(navigator.userAgent)) iosTip.hidden = false;
  if (instBtn) instBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.finally(function () { deferredPrompt = null; instBtn.hidden = true; });
  });

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

