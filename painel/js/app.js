/* PAINEL FP — menu, rotas por hash, escritório em pixel, avisos e service worker */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- dados ---------- */
  var ROUTES = { inicio: 'Painel', escritorio: 'Escritório', decidir: 'Decidir', aprovacao: 'Aprovação', produtos: 'Produtos', tarefas: 'Tarefas', ouvidoria: 'Ouvidoria', links: 'Links úteis' };
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
  route(); net();
  window.addEventListener('load', registerSW);
})();

