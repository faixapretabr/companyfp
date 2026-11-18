/* PAINEL FP — menu, rotas por hash, escritório em pixel, avisos e service worker */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- dados ---------- */
  var ROUTES = { inicio: 'Painel', escritorio: 'Escritório', decidir: 'Decidir', produtos: 'Produtos', tarefas: 'Tarefas', ouvidoria: 'Ouvidoria', links: 'Links úteis' };
  var STATUS = { 'sem-sinal': 'Sem sinal', trabalhando: 'Trabalhando', aguardando: 'Aguardando', parado: 'Parado' };
  /* Organograma (DECISOES 9): agentes por código, agrupados por departamento */
  var DEPS = [
    { nome: 'Gestão Geral', ag: [['g01', 'Osvaldo · coordenação']] },
    { nome: 'Marketing', ag: [['m01', 'Estratégia e marca'], ['m02', 'Conteúdo e criação'], ['m03', 'Tráfego pago'], ['m04', 'Relacionamento']] },
    { nome: 'Operação', ag: [['o01', 'Atendimento'], ['o02', 'Pedido e entrega'], ['o03', 'Insumo e estoque'], ['o04', 'Caixa e MEI']] },
    { nome: 'Inteligência Competitiva', ag: [['i01', 'Concorrentes'], ['i02', 'Demanda e nichos'], ['i03', 'Ofertas e revenda'], ['i04', 'Preço e frete'], ['i05', 'Fornecedores'], ['i06', 'Produtos de referência'], ['i07', 'Conferência legal'], ['i08', 'Coordenação de I01 a I07']] }
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
    var r = (location.hash || (/escritorio\.html$/.test(location.pathname) ? '#escritorio' : '#inicio')).slice(1); if (r === 'gerencia') r = 'decidir'; if (r === 'banco') r = 'produtos';
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

  /* ---------- escritório: cartões por departamento ---------- */
  function drawOffice() {
    $('ag').innerHTML = DEPS.map(function (d) {
      return '<div class="dep"><div class="lb">' + d.nome + '</div>' + d.ag.map(function (a) {
        return '<div class="ag" id="ag-' + a[0] + '" data-st="sem-sinal"><div><b>' + a[0].toUpperCase() + '</b><div class="lb">' + a[1] +
          '</div></div><span class="st"><span class="dot"></span><span class="tx">' + STATUS['sem-sinal'] + '</span></span></div>';
      }).join('') + '</div>';
    }).join('');
  }
  /* ponto de entrada do tempo real: FP.setStatus('m01','trabalhando') */
  function setStatus(id, st) {
    if (!STATUS[st]) return;
    var row = $('ag-' + id);
    if (!row) return;
    row.dataset.st = st; row.querySelector('.tx').textContent = STATUS[st];
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

  /* ---------- instalar o app ---------- */
  var deferredPrompt = null;
  var standalone = window.matchMedia && matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferredPrompt = e; $('inst').hidden = false;
  });
  window.addEventListener('appinstalled', function () { deferredPrompt = null; $('inst').hidden = true; $('ios-tip').hidden = true; });
  if (!standalone && /iphone|ipad|ipod/i.test(navigator.userAgent)) $('ios-tip').hidden = false;
  $('inst').addEventListener('click', function (e) {
    e.preventDefault();
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.finally(function () { deferredPrompt = null; $('inst').hidden = true; });
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
