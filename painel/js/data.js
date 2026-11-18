/* PAINEL FP - dados ao vivo (Supabase): Decidir, Produtos, Tarefas, Ouvidoria */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var DB = window.FPDB;
  var IBC = { 'Copiar código': 'Copiar', 'Salvar comentário': 'Salvar', 'Adicionar foto': 'Foto', 'Tratada': 'Tratar', 'Histórico': 'Hist.', 'Começar': 'Começar', 'Concluir': 'Concluir', 'Decidir': 'Decidir', 'Derivar': 'Derivar', 'Aprovar': 'Aprovar', 'Reprovar': 'Reprovar', 'Devolver para Fazendo': 'Devolver' };
  function ib(cls, ic, label, attrs) { return '<button class="cp ib ' + cls + '" type="button" aria-label="' + label + '" title="' + label + '" ' + (attrs || '') + '>' + ic + '<span class="ibl">' + esc(IBC[label] || label) + '</span></button>'; }
  var TEAM = ['João', 'Cláudio', 'Osvaldo', 'M01', 'M02', 'M03', 'M04', 'O01', 'O02', 'O03', 'O04', 'I01', 'I02', 'I03', 'I04', 'I05', 'I06', 'I07', 'I08']; /* organograma: decisão 9 */
  var ART = { 'João': 'o', 'Cláudio': 'o', 'Osvaldo': 'o' }; function art(n) { return ART[n] || 'o'; }
  var DEPT = { 'Osvaldo': 'G01' };
  function rsel(tab, id, cur) {
    var o = '<option value="">Sem responsável</option>', list = TEAM.slice(); if (cur && list.indexOf(cur) < 0) list.push(cur);
    list.forEach(function (n) { o += '<option' + (n === cur ? ' selected' : '') + '>' + esc(n) + '</option>'; });
    return '<label class="src">Responsável<select class="rs" data-t="' + tab + '" data-id="' + id + '" aria-label="Responsável">' + o + '</select></label>';
  }
  document.addEventListener('change', function (e) {
    var sl = e.target; if (!(sl.matches && sl.matches('select.rs'))) return;
    var tab = sl.dataset.t, id = sl.dataset.id, col = tab === 'tarefas' ? 'dono' : 'responsavel', row = {}; row[col] = sl.value || null;
    DB.update(tab, 'id=eq.' + id, row).then(function () { log((tab === 'tarefas' ? 'tarefa' : 'ouvidoria') + '_responsavel', { ref: (tab === 'tarefas' ? 'tf:' : 'ov:') + id }); return tab === 'tarefas' ? loadTf() : loadOv(); }).catch(function (er) { alert('Não gravou: ' + er.message); });
  });
  var CACHE = { dec: [], prod: [], tf: [], ov: [] };
  var ETAPAS = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'];
  var FAIXAS = { 1: ['Faixa 1 · Decidir agora', 'Trava a primeira venda', 'y'], 2: ['Faixa 2 · Esta semana', 'Prepara a loja', ''], 3: ['Faixa 3 · Depois', 'Não bloqueia', ''] };
  var ESTADOS = { aberta: 'Pendente', decidida: 'Decidida', 'em-execucao': 'Em execução', aguardando: 'Aguardando', arquivada: 'Arquivada' };
  function stag(e) { return '<span class="stag st-' + e + '">' + (ESTADOS[e] || esc(e)) + '</span>'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(d) { if (!d) return ''; var x = new Date(d); return x.toLocaleDateString('pt-BR') + ' ' + x.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); }
  function fmtD(d) { if (!d) return '-'; return new Date(String(d).length === 10 ? d + 'T12:00:00' : d).toLocaleDateString('pt-BR'); }
  function hoje() { return new Date().toLocaleDateString('en-CA'); }
  function emMin(m) { return new Date(Date.now() + m * 60000); }
  function prazoISO(v) { var m = parseInt(v, 10); return m ? emMin(m).toISOString() : null; }
  function revisaoData(v) { var m = parseInt(v, 10); return m ? emMin(m).toLocaleDateString('en-CA') : null; }
  function fmtPrazo(p) { var d = new Date(p); if (d.getTime() === Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())) return d.toLocaleDateString('pt-BR', { timeZone: 'UTC' }); return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }); }
  function msg(form, text, bad) { var m = form.querySelector('.msg'); if (m) { m.textContent = text; m.style.color = bad ? '#C8342B' : ''; } }
  function log(acao, detalhe) { return DB.insert('eventos_log', { acao: acao, detalhe: detalhe }, 'return=minimal').catch(function () {}); }
  function fail(e, el) { if (e && e.auth) { showLogin(); return; } if (el) el.innerHTML = '<p class="src">Erro: ' + esc(e.message) + '</p>'; }
  var HIST = { tarefa_responsavel: 'Responsável alterado', ouvidoria_responsavel: 'Responsável alterado', ouvidoria_descartada: 'Descartado', produto_foto: 'Foto adicionada', produto_foto_apagada: 'Foto apagada', pendencia_criada: 'Criada', pendencia_resolvida: 'Resolvida', pendencia_decidida: 'Decidida', pendencia_executada: 'Virou tarefa', pendencia_adiada: 'Adiada', pendencia_arquivada: 'Arquivada', pendencia_reaberta: 'Reaberta', pendencia_desfeita: 'Ação desfeita', condicao_cumprida: 'Condição cumprida', pendencia_comentada: 'Comentário salvo', tarefa_criada: 'Criada', tarefa_nova: 'Criada', tarefa_recebida: 'Recebida', tarefa_fazendo: 'Começou', tarefa_feita: 'Concluída', tarefa_aberta: 'Reaberta', tarefa_apagada: 'Apagada', tarefa_esperando: 'Esperando você', tarefa_conferindo: 'Para conferir', tarefa_devolvida: 'Devolvida', tarefa_retomada: 'Retomada', tarefa_pendente: 'Pendente', tarefa_aprovacao: 'Para aprovação', tarefa_decidir: 'Para o João decidir', tarefa_aprovada: 'Aprovada e concluída', tarefa_reprovada: 'Reprovada', tarefa_decidida: 'Decisão do João', tarefa_derivada: 'Derivada', produto_criado: 'Cadastrado', produto_editado: 'Editado', arquivo_enviado: 'Arquivo enviado', arquivo_apagado: 'Arquivo apagado' };
  function loadHist(ref, box) {
    box.innerHTML = '<p class="src">Carregando…</p>';
    DB.get('eventos_log?select=acao,quando&detalhe-%3E%3Eref=eq.' + encodeURIComponent(ref) + '&order=quando.desc&limit=30').then(function (rows) {
      box.innerHTML = rows.length ? rows.map(function (r) { return '<p class="src hi">' + fmt(r.quando) + ' · ' + esc(HIST[r.acao] || r.acao) + '</p>'; }).join('') : '<p class="src">Sem registros ainda.</p>';
    }).catch(function (e) { box.innerHTML = '<p class="src">Erro: ' + esc(e.message) + '</p>'; });
  }
  /* ---------- login ---------- */
  var started = false, timer = null;
  function showLogin() { $('lg').hidden = false; document.body.classList.add('locked'); clearInterval(timer); started = false; var f = $('lg-f').elements.email; if (f) f.focus(); }
  $('lg-f').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, m = $('lg-m'); m.textContent = 'Entrando…';
    DB.login(f.elements.email.value.trim(), f.elements.password.value).then(function () {
      f.elements.password.value = ''; m.textContent = ''; $('lg').hidden = true; document.body.classList.remove('locked'); start();
    }).catch(function (er) { m.textContent = er.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : er.message; });
  });

  /* ---------- retorno com desfazer (5 s) ---------- */
  var UNDO = null, toastT = null;
  function toast(txt, undoFn) {
    var t = $('toast'); if (!t) return;
    clearTimeout(toastT); UNDO = undoFn || null;
    t.innerHTML = '<span>' + esc(txt) + '</span>' + (undoFn ? '<button type="button" class="cp" id="toast-u">Desfazer</button>' : '');
    t.hidden = false;
    if (undoFn) $('toast-u').addEventListener('click', function () {
      clearTimeout(toastT); t.hidden = true;
      var u = UNDO; UNDO = null; if (u) u();
    });
    toastT = setTimeout(function () { t.hidden = true; UNDO = null; }, 5000);
  }

  /* ---------- folha de ações da pendência ---------- */
  var DCS = { id: null, acao: null };
  function sheetRow() { var id = DCS.id; return CACHE.dec.filter(function (r) { return r.id === id; })[0]; }
  function snapOf(r) {
    var k = ['estado', 'decisao_texto', 'decidido_por', 'revisao_em', 'condicao', 'motivo_arquivo', 'motivo_reabertura', 'resolvido_em', 'posicao', 'comentario'], o = {};
    k.forEach(function (x) { o[x] = r[x] === undefined ? null : r[x]; });
    return o;
  }
  function openSheet(id) { DCS.id = +id; DCS.acao = null; renderSheet(); $('dcs').hidden = false; }
  function closeSheet() { $('dcs').hidden = true; DCS.id = null; DCS.acao = null; }
  function sheetDirty() {
    var f = $('dcs-f'); if (!f) return false;
    if (f.matches(':focus-within')) return true;
    return [].some.call(f.querySelectorAll('input,textarea'), function (i) { return i.value; });
  }
  function resumo(r) {
    if (r.estado === 'decidida') return r.decisao_texto ? '\u201C' + esc(r.decisao_texto) + '\u201D' : '';
    if (r.estado === 'em-execucao') return 'Virou tarefa' + (r.decisao_texto ? ': \u201C' + esc(r.decisao_texto) + '\u201D' : '') + (r.decidido_por ? ' · ' + esc(r.decidido_por) : '');
    if (r.estado === 'aguardando') return 'Revisão ' + fmtD(r.revisao_em) + (r.condicao ? ' · ' + esc(r.condicao) : '');
    if (r.estado === 'arquivada') return r.motivo_arquivo ? esc(r.motivo_arquivo) : '';
    if (r.estado === 'aberta' && r.motivo_reabertura) return 'Reaberta: ' + esc(r.motivo_reabertura);
    return '';
  }
  function quemSel(def) {
    var o = '';
    TEAM.forEach(function (n) { o += '<option' + (n === (def || 'João') ? ' selected' : '') + '>' + n + '</option>'; });
    return '<label class="lb">Quem registra<select name="quem">' + o + '</select></label>';
  }
  function dbtn(a, ic, lb) { return '<button type="button" class="cp" data-act="dcs-acao" data-a="' + a + '" aria-label="' + lb + '">' + ic + '<span>' + lb + '</span></button>'; }
  function renderSheet() {
    var r = sheetRow(); if (!r) { closeSheet(); return; }
    $('dcs-h').textContent = 'ger-' + r.id;
    var venc = r.estado === 'aguardando' && r.revisao_em && r.revisao_em <= hoje();
    var h = '<h3>' + esc(r.titulo) + '</h3>' +
      (r.opcoes ? '<p>' + esc(r.opcoes) + '</p>' : '') +
      '<p>' + stag(r.estado) + (venc ? ' <span class="tag y">Revisão vencida</span>' : '') + (resumo(r) ? ' <span class="src">' + resumo(r) + '</span>' : '') + '</p>' +
      (r.comentario ? '<p class="cmt"><span class="lb">Comentário</span><br>' + esc(r.comentario) + '</p>' : '');
    if (r.estado === 'aberta') {
      h += '<div class="dgrid">' + dbtn('decidir', '⚖', 'Decidir') + dbtn('executar', '▶', 'Executar') + dbtn('adiar', '⏸', 'Adiar') + dbtn('arquivar', '🗄', 'Arquivar') + '</div>';
    } else {
      h += '<div class="dgrid">' + (r.estado === 'aguardando' ? dbtn('condok', '✓', 'Condição cumprida') : '') + dbtn('reabrir', '↺', 'Reabrir') + '</div>';
    }
    h += '<div id="dcs-form"></div>';
    h += '<div class="dcs-dt"><div class="lb">Detalhe</div><div class="acts">' +
      ib('', '✎', 'Comentar', 'data-act="comentar" data-id="' + r.id + '"') +
      ib('', '⧉', 'Copiar código', 'data-code="[Painel FP] DECIDIR - pendência: ' + esc(r.titulo) + ' (ger-' + r.id + ')"') +
      ib('', '⏱', 'Histórico', 'data-act="hist" data-ref="dec:' + r.id + '"') + '</div>' +
      '<div class="hbox" hidden id="h-' + ('dec:' + r.id).replace(/[^a-z0-9]/gi, '_') + '"></div>' +
      '<div id="cm-' + r.id + '" hidden class="cmbox"><textarea rows="3" maxlength="800" placeholder="Comentário ou ajuste">' + esc(r.comentario || '') + '</textarea>' + ib('ok2', '✓', 'Salvar comentário', 'data-act="salvar-cm" data-id="' + r.id + '"') + '</div></div>';
    $('dcs-body').innerHTML = h;
    if (DCS.acao) renderForm();
  }
  function renderForm() {
    var r = sheetRow(); if (!r) return;
    var a = DCS.acao, f = '';
    if (a === 'decidir') f = '<textarea name="decisao" rows="2" maxlength="400" required placeholder="Decisão do João, em uma frase"></textarea>' + quemSel('João');
    else if (a === 'executar') f = '<textarea name="decisao" rows="2" maxlength="400" required placeholder="Decisão do João, em uma frase"></textarea><input name="comentario" maxlength="140" placeholder="Comentário (opcional)"><input name="titulo" required maxlength="160" value="' + esc(r.titulo) + '" aria-label="Título da tarefa"><label class="lb">Responsável<select name="dono" required><option value="">Escolher…</option>' + TEAM.map(function (n) { return '<option>' + n + '</option>'; }).join('') + '</select></label><label class="lb">Prazo<select name="prazo" required><option value="15">15 min</option><option value="30">30 min</option><option value="60">60 min</option><option value="120">2 h</option><option value="1440" selected>1 dia</option></select></label>' + quemSel('João');
    else if (a === 'adiar') f = '<label class="lb">Revisão em<select name="revisao" required><option value="">Escolher…</option><option value="15">15 min</option><option value="30">30 min</option><option value="60">60 min</option><option value="120">2 h</option><option value="1440">1 dia</option></select></label><input name="condicao" maxlength="140" placeholder="Condição para voltar (opcional)">' + quemSel('João');
    else if (a === 'arquivar') f = '<input name="motivo" required maxlength="140" placeholder="Motivo do arquivamento">' + quemSel('João');
    else if (a === 'reabrir') f = '<input name="motivo" required maxlength="140" placeholder="Motivo da reabertura">' + quemSel('João');
    else if (a === 'condok') f = '<p class="src">A pendência volta para a Faixa 1 · Decidir agora.</p>' + quemSel('João');
    else return;
    $('dcs-form').innerHTML = '<form class="fm" id="dcs-f">' + f + '<button class="btn" type="submit">Confirmar</button><p class="msg src" role="status"></p></form>';
    $('dcs-f').addEventListener('submit', function (e) { e.preventDefault(); doAcao(e.target); });
    var i = $('dcs-f').querySelector('input,textarea'); if (i) i.focus();
  }
  function doAcao(f) {
    var r = sheetRow(); if (!r) return;
    var a = DCS.acao, el = f.elements, id = r.id, quem = el.quem.value;
    var snap = snapOf(r);
    function ok(rotulo, acaoLog, extra, tarefaId) {
      log(acaoLog, Object.assign({ ref: 'dec:' + id, quem: quem }, extra || {}));
      return loadGer().then(function () {
        closeSheet();
        toast(rotulo + ' · ' + quem + ' · ' + fmt(new Date().toISOString()), function () {
          DB.update('decisoes', 'id=eq.' + id, snap).then(function () {
            return tarefaId ? DB.remove('tarefas', 'id=eq.' + tarefaId) : null;
          }).then(function () { log('pendencia_desfeita', { ref: 'dec:' + id }); loadGer(); loadTf(); });
        });
      });
    }
    var b = f.querySelector('button'); b.disabled = true;
    if (a === 'executar') {
      var dono = el.dono.value;
      DB.insert('tarefas', { titulo: el.titulo.value.trim(), dono: dono, prazo: prazoISO(el.prazo.value), estado: 'pendente', decisao_id: id, comentario: el.comentario.value.trim() || null }).then(function (rr) {
        var tid = rr && rr[0] && rr[0].id;
        var drow = { estado: 'em-execucao', decidido_por: quem, decisao_texto: el.decisao.value.trim() };
        var cm = el.comentario.value.trim(); if (cm) drow.comentario = cm;
        return DB.update('decisoes', 'id=eq.' + id, drow).then(function () {
          return ok('Em execução · tarefa para ' + dono, 'pendencia_executada', { tf: tid, dono: dono, decisao: drow.decisao_texto }, tid);
        });
      }).catch(function (er) { b.disabled = false; msg(f, 'Não gravou: ' + er.message, 1); });
      return;
    }
    var row = { decidido_por: quem }, rotulo = '', acaoLog = '', extra = {};
    if (a === 'decidir') { row.estado = 'decidida'; row.decisao_texto = el.decisao.value.trim(); row.resolvido_em = new Date().toISOString(); rotulo = 'Decidida'; acaoLog = 'pendencia_decidida'; }
    else if (a === 'adiar') { row.estado = 'aguardando'; row.revisao_em = revisaoData(el.revisao.value); row.condicao = el.condicao.value.trim() || null; rotulo = 'Adiada até ' + fmtD(row.revisao_em); acaoLog = 'pendencia_adiada'; extra = { revisao: row.revisao_em, condicao: row.condicao }; }
    else if (a === 'arquivar') { row.estado = 'arquivada'; row.motivo_arquivo = el.motivo.value.trim(); rotulo = 'Arquivada'; acaoLog = 'pendencia_arquivada'; extra = { motivo: row.motivo_arquivo }; }
    else if (a === 'reabrir') { row.estado = 'aberta'; row.resolvido_em = null; row.revisao_em = null; row.motivo_reabertura = el.motivo.value.trim(); rotulo = 'Reaberta'; acaoLog = 'pendencia_reaberta'; extra = { motivo: row.motivo_reabertura }; }
    else if (a === 'condok') { row.estado = 'aberta'; row.posicao = 1; row.revisao_em = null; rotulo = 'De volta à fila'; acaoLog = 'condicao_cumprida'; }
    else return;
    DB.update('decisoes', 'id=eq.' + id, row).then(function () { return ok(rotulo, acaoLog, extra); })
      .catch(function (er) { b.disabled = false; msg(f, 'Não gravou: ' + er.message, 1); });
  }

  /* ---------- ações por toque ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-act]'); if (!b) return;
    var act = b.dataset.act, id = b.dataset.id;
    if (act === 'sair') { DB.logout(); showLogin(); return; }
    if (act === 'card-open') { openSheet(id); return; }
    if (act === 'dcs-acao') { DCS.acao = b.dataset.a; renderForm(); return; }
    if (act === 'comentar') {
      var box = document.querySelector('#cm-' + id); box.hidden = !box.hidden; if (!box.hidden) box.querySelector('textarea').focus();
    } else if (act === 'salvar-cm') {
      var box2 = document.querySelector('#cm-' + id), v = box2.querySelector('textarea').value.trim();
      DB.update('decisoes', 'id=eq.' + id, { comentario: v || null }).then(function () { log('pendencia_comentada', { ref: 'dec:' + id }); return loadGer(); }).catch(function (er) { alert('Não gravou: ' + er.message); });
    } else if (act === 'tf-estado') {
      var to = b.dataset.to, tr = CACHE.tf.filter(function (r) { return r.id === +id; })[0] || {};
      var up = { estado: to }, quem = tr.dono || 'equipe', agora = new Date().toISOString();
      var acao = 'tarefa_' + to;
      if (to === 'fazendo') { up.fazendo_por = quem; up.fazendo_em = agora; }
      if (to === 'aprovacao') { acao = 'tarefa_aprovacao'; }
      if (to === 'decidir') { acao = 'tarefa_decidir'; }
      if (to === 'concluida') { quem = 'João'; up.feita_por = 'João'; up.feita_em = agora; acao = 'tarefa_aprovada'; }
      DB.update('tarefas', 'id=eq.' + id, up).then(function () { log(acao, { ref: 'tf:' + id, quem: quem }); return loadTf(); }).catch(function (er) { alert('Não gravou: ' + er.message); });
    } else if (act === 'tf-fila') {
      tfF = b.dataset.f; loadTf();
    } else if (act === 'tf-del') {
      if (confirm('Apagar esta tarefa?')) DB.remove('tarefas', 'id=eq.' + id).then(function () { log('tarefa_apagada', { ref: 'tf:' + id }); return loadTf(); }).catch(function (er) { alert('Não gravou (só o dono apaga): ' + er.message); });
    } else if (act === 'tf-rep') {
      var trr = CACHE.tf.filter(function (r) { return r.id === +id; })[0];
      if (trr) openRep(trr);
    } else if (act === 'tf-deriv') {
      var trd = CACHE.tf.filter(function (r) { return r.id === +id; })[0];
      if (trd) derivarTarefa(trd);
    } else if (act === 'tf-dec-resp') {
      var ta = $('tfd-' + id), dec = ta ? ta.value.trim() : '';
      if (!dec) { alert('Escreva a decisão do João.'); return; }
      var tr2 = CACHE.tf.filter(function (r) { return r.id === +id; })[0] || {};
      var cm2 = (tr2.comentario ? tr2.comentario + ' · ' : '') + 'Decisão do João: ' + dec;
      DB.update('tarefas', 'id=eq.' + id, { estado: 'fazendo', comentario: cm2 }).then(function () { log('tarefa_decidida', { ref: 'tf:' + id, decisao: dec }); toast('Decisão registrada; tarefa de volta para Fazendo'); return loadTf(); }).catch(function (er) { alert('Não gravou: ' + er.message); });
    } else if (act === 'ov-criar') {
      var ovr = CACHE.ov.filter(function (r) { return r.id === +id; })[0];
      if (ovr) ovCriarTarefa(ovr);
    } else if (act === 'ov-descartar') {
      var ovd = CACHE.ov.filter(function (r) { return r.id === +id; })[0] || {};
      if (!confirm('Descartar este registro da ouvidoria? Ele sai do painel (fica no histórico).')) return;
      b.disabled = true;
      DB.remove('ouvidoria', 'id=eq.' + id).then(function () { log('ouvidoria_descartada', { ref: 'ov:' + id, trecho: (ovd.texto || '').slice(0, 80) }); toast('Registro descartado'); return loadOv(); }).catch(function (er) { b.disabled = false; alert('Não gravou: ' + er.message); });
    } else if (act === 'hist') {
      var hb = document.getElementById('h-' + b.dataset.ref.replace(/[^a-z0-9]/gi, '_')); hb.hidden = !hb.hidden; if (!hb.hidden) loadHist(b.dataset.ref, hb);
    } else if (act === 'aq-toggle') {
      var qb = $('aqb-' + b.dataset.cod); qb.hidden = !qb.hidden; if (!qb.hidden) { AQ.etapa = ''; loadAq(b.dataset.cod); }
    } else if (act === 'aq-chip') {
      AQ.etapa = b.dataset.e; loadAq(b.dataset.cod);
    } else if (act === 'aq-enviar') {
      var qf3 = $('aqf-' + b.dataset.cod); qf3.hidden = !qf3.hidden;
    } else if (act === 'aq-open') {
      openAfs(b.dataset.cod, b.dataset.id);
    } else if (act === 'afs-dl') {
      var r2 = AQ.arq; if (r2 && r2.caminho) photoUrl(r2.caminho).then(function (u) { var a2 = document.createElement('a'); a2.href = u; a2.download = r2.nome_original; document.body.appendChild(a2); a2.click(); a2.remove(); });
    } else if (act === 'afs-del') {
      var r3 = AQ.arq; if (!r3) return;
      if (confirm('Apagar "' + r3.nome_original + '"?')) {
        (r3.caminho ? DB.st('DELETE', 'object/produtos/' + r3.caminho.split('/').map(encodeURIComponent).join('/')) : Promise.resolve()).then(function () {
          return DB.update('arquivos', 'id=eq.' + r3.id, { apagado_em: new Date().toISOString() });
        }).then(function () { log('arquivo_apagado', { ref: 'prod:' + b.dataset.cod, nome: r3.nome_original }); $('afs').hidden = true; return loadAq(b.dataset.cod); }).catch(function (er) { alert('Não apagou: ' + er.message); });
      }
    } else if (act === 'afs-x') { $('afs').hidden = true;
    } else if (act === 'bc-edit') {
      var f2 = document.querySelector('#bf-' + b.dataset.cod); f2.hidden = !f2.hidden;
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.matches && e.target.matches('.it[data-act="card-open"]')) { e.preventDefault(); openSheet(e.target.dataset.id); }
    if (e.key === 'Escape' && !$('dcs').hidden) closeSheet();
  });
  $('dcs-x').addEventListener('click', closeSheet);
  $('afs-x').addEventListener('click', function () { $('afs').hidden = true; });
  $('dcs').addEventListener('click', function (e) { if (e.target.classList && e.target.classList.contains('md-bg')) closeSheet(); });

  /* ---------- Decidir (pendências do João) ---------- */
  function cardGer(r, n) {
    return '<div class="it" data-act="card-open" data-id="' + r.id + '" role="button" tabindex="0"><div class="n">' + n + '</div><div><b>' + esc(r.titulo) + '</b>' +
      (r.opcoes ? '<p>' + esc(r.opcoes) + '</p>' : '') +
      '<p>' + stag(r.estado) + (resumo(r) ? ' <span class="src">' + resumo(r) + '</span>' : '') + '</p>' +
      (r.comentario ? '<p class="cmt"><span class="lb">Comentário</span><br>' + esc(r.comentario) + '</p>' : '') +
      '</div></div>';
  }
  function loadGer() {
    return DB.get('decisoes?select=*&order=posicao.asc,id.asc').then(function (rows) {
      CACHE.dec = rows; doSearch(); renderDash();
      var open = rows.filter(function (r) { return r.estado === 'aberta'; });
      var ag = rows.filter(function (r) { return r.estado === 'aguardando'; });
      var fech = rows.filter(function (r) { return r.estado === 'decidida' || r.estado === 'em-execucao'; });
      var arq = rows.filter(function (r) { return r.estado === 'arquivada'; });
      var h = '', n = 0;
      [1, 2, 3].forEach(function (p) {
        var list = open.filter(function (r) { return r.posicao === p; }); if (!list.length) return;
        var F = FAIXAS[p];
        h += '<div class="blk"><span class="tag ' + F[2] + '">' + F[0] + '</span><div class="lb">' + F[1] + '</div>';
        list.forEach(function (r) { n++; h += cardGer(r, n); });
        h += '</div>';
      });
      if (ag.length) {
        h += '<div class="blk"><span class="tag">Aguardando</span><div class="lb">Fora da fila até a revisão ou a condição marcada cumprida</div></div>';
        h += ag.map(function (r) { return cardGer(r, '⏸'); }).join('');
      }
      $('ger-list').innerHTML = h || '<p class="src">Nenhuma pendência aberta.</p>';
      $('ger-done-list').innerHTML = fech.length ? fech.map(function (r) { return cardGer(r, '✓'); }).join('') : '<p class="src">Nada decidido ainda.</p>';
      $('ger-arch-list').innerHTML = arq.length ? arq.map(function (r) { return cardGer(r, '🗄'); }).join('') : '<p class="src">Nada arquivado.</p>';
      var f1 = open.filter(function (r) { return r.posicao === 1; });
      var venc = ag.filter(function (r) { return r.revisao_em && r.revisao_em <= hoje(); });
      $('dec-now').hidden = !(f1.length || venc.length);
      $('dec-now-list').innerHTML =
        venc.map(function (r) { return '<div class="it" data-act="card-open" data-id="' + r.id + '" role="button" tabindex="0"><div class="n">⏸</div><div><b>' + esc(r.titulo) + '</b><p>Revisão vencida ' + fmtD(r.revisao_em) + (r.condicao ? ' · ' + esc(r.condicao) : '') + '</p></div></div>'; }).join('') +
        f1.slice(0, 3).map(function (r) { return '<div class="it" data-act="card-open" data-id="' + r.id + '" role="button" tabindex="0"><div class="n">!</div><div><b>' + esc(r.titulo) + '</b>' + (r.opcoes ? '<p>' + esc(r.opcoes) + '</p>' : '') + '</div></div>'; }).join('') +
        (f1.length > 3 ? '<p class="src">+ ' + (f1.length - 3) + ' na Faixa 1</p>' : '');
      var ini = document.querySelector('#p-inicio a[href="#decidir"] p');
      if (ini) ini.textContent = open.length ? open.length + ' pendência' + (open.length > 1 ? 's' : '') + ' do João em aberto' + (ag.length ? ' · ' + ag.length + ' aguardando' : '') + '.' : (ag.length ? ag.length + ' pendência' + (ag.length > 1 ? 's' : '') + ' aguardando.' : 'Nenhuma pendência aberta.');
      if (DCS.id && !sheetDirty()) renderSheet();
    }).catch(function (e) { fail(e, $('ger-list')); });
  }
  $('ger-new').addEventListener('submit', function (e) {
    e.preventDefault(); var f = e.target;
    DB.insert('decisoes', { titulo: f.elements.titulo.value.trim(), opcoes: f.elements.opcoes.value.trim() || null, posicao: +f.elements.posicao.value, estado: 'aberta' }).then(function (rr) { if (rr && rr[0]) log('pendencia_criada', { ref: 'dec:' + rr[0].id }); f.reset(); msg(f, 'Adicionada.'); return loadGer(); }).catch(function (er) { msg(f, 'Não gravou: ' + er.message, 1); });
  });

  /* ---------- Produtos ---------- */
  function loadBc() {
    return DB.get('produtos?select=*&order=codigo.asc').then(function (rows) {
      CACHE.prod = rows; doSearch(); renderDash();
      $('bc-list').innerHTML = rows.length ? rows.map(function (r) {
        return '<div class="pc"><div class="pc-h"><b>' + esc(r.codigo) + (r.nome ? ' · ' + esc(r.nome) : ' · sem nome') + '</b><span class="tag' + (r.loja_bloqueada ? '' : ' y') + '">' + (r.loja_bloqueada ? 'Loja bloqueada' : 'Liberado p/ loja') + '</span></div>' +
          '<p class="src">Etapa ' + esc(r.etapa || '-') + (r.medidas ? ' · ' + esc(r.medidas) : '') + (r.peso ? ' · ' + esc(r.peso) : '') + (r.material ? ' · ' + esc(r.material) : '') + '</p>' +
          (r.pendencias ? '<p>' + esc(r.pendencias) + '</p>' : '') + (r.link_drive ? '<p><a href="' + esc(r.link_drive) + '" rel="noopener" target="_blank">Arquivos no Drive ↗</a></p>' : '') +
          '<div class="ph" id="ph-' + esc(r.codigo) + '"></div><p class="src" id="phs-' + esc(r.codigo) + '" role="status"></p><p class="src">Atualizado ' + fmt(r.atualizado_em) + '</p>' + '<div class="acts">' + '<label class="cp ib" title="Adicionar foto" aria-label="Adicionar foto">📷<span class="ibl">Foto</span><input type="file" accept="image/*" hidden data-ph="' + esc(r.codigo) + '"></label>' + ib('', '✎', 'Editar', 'data-act="bc-edit" data-cod="' + esc(r.codigo) + '"') + ib('', '⏱', 'Histórico', 'data-act="hist" data-ref="' + 'prod:' + esc(r.codigo) + '"') + ib('', '📎', 'Arquivos', 'data-act="aq-toggle" data-cod="' + esc(r.codigo) + '"') + '</div><div class="hbox" hidden id="h-' + ('prod:' + esc(r.codigo)).replace(/[^a-z0-9]/gi, '_') + '"></div><div class="aqbox" hidden id="aqb-' + esc(r.codigo) + '"></div>' +
          '<form class="fm" id="bf-' + esc(r.codigo) + '" data-cod="' + esc(r.codigo) + '" hidden>' +
          '<input name="nome" placeholder="Nome" value="' + esc(r.nome) + '"><select name="etapa">' + ETAPAS.map(function (x) { return '<option' + (x === r.etapa ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select>' +
          '<input name="medidas" placeholder="Medidas" value="' + esc(r.medidas) + '"><input name="peso" placeholder="Peso" value="' + esc(r.peso) + '"><input name="material" placeholder="Material" value="' + esc(r.material) + '">' +
          '<textarea name="pendencias" rows="2" placeholder="Pendências">' + esc(r.pendencias) + '</textarea><input name="link_drive" placeholder="Link do Drive" value="' + esc(r.link_drive) + '">' +
          '<label class="lb"><input type="checkbox" name="loja_bloqueada"' + (r.loja_bloqueada ? ' checked' : '') + '> Loja bloqueada (até a etapa E6)</label>' +
          '<button class="btn" type="submit" aria-label="Salvar" title="Salvar">✓</button><p class="msg src" role="status"></p></form></div>';
      }).join('') : '<p class="src">Nenhum produto cadastrado.</p>';
      rows.forEach(function (r) { loadPhotos(r.codigo); });
    }).catch(function (e) { fail(e, $('bc-list')); });
  }
  $('bc-list').addEventListener('submit', function (e) {
    e.preventDefault(); var f = e.target, el = f.elements, cod = f.dataset.cod;
    var link = el.link_drive.value.trim();
    if (link && !/^https:\/\//i.test(link)) { msg(f, 'O link precisa começar com https://', 1); return; }
    DB.update('produtos', 'codigo=eq.' + encodeURIComponent(cod), { nome: el.nome.value.trim() || null, etapa: el.etapa.value, medidas: el.medidas.value.trim() || null, peso: el.peso.value.trim() || null, material: el.material.value.trim() || null, pendencias: el.pendencias.value.trim() || null, link_drive: link || null, loja_bloqueada: el.loja_bloqueada.checked, atualizado_em: new Date().toISOString() })
      .then(function () { log('produto_editado', { ref: 'prod:' + cod }); return loadBc(); }).catch(function (er) { msg(f, 'Não gravou: ' + er.message, 1); });
  });
  $('bc-new').addEventListener('submit', function (e) {
    e.preventDefault(); var f = e.target;
    DB.insert('produtos', { codigo: f.elements.codigo.value.trim().toUpperCase(), nome: f.elements.nome.value.trim() || null, etapa: 'E1', loja_bloqueada: true }).then(function () { log('produto_criado', { ref: 'prod:' + f.elements.codigo.value.trim().toUpperCase() }); f.reset(); msg(f, 'Cadastrado.'); return loadBc(); }).catch(function (er) { msg(f, 'Não gravou: ' + er.message, 1); });
  });

  /* ---------- Tarefas ---------- */
  var TF = { pendente: 'Pendente', fazendo: 'Fazendo', aprovacao: 'Aprovação', decidir: 'Decidir', concluida: 'Concluída' };
  var tfF = '';
  var ALERTAS = [];
  function tfAlertas(rows) {
    var agora = Date.now(), out = [];
    rows.forEach(function (r) {
      if (r.estado === 'concluida') return;
      var prz = r.prazo ? new Date(r.prazo).getTime() : 0;
      if (prz && prz < agora) out.push({ id: r.id, titulo: r.titulo, texto: 'Prazo vencido (' + fmtPrazo(r.prazo) + ') — avisar ' + (r.dono || 'o dono') + ' e o Osvaldo' });
    });
    return out;
  }
  function renderBell(als) {
    ALERTAS = als;
    var n = $('bell-n'); if (!n) return;
    n.hidden = !als.length; n.textContent = als.length > 9 ? '9+' : String(als.length);
  }
  function loadTf() {
    return DB.get('tarefas?select=*&order=criado_em.desc').then(function (rows) {
      CACHE.tf = rows.slice(); doSearch(); renderDash();
      renderBell(tfAlertas(rows));
      var ord = { pendente: 0, fazendo: 1, aprovacao: 2, decidir: 3, concluida: 4 };
      rows.sort(function (a, b) { return (ord[a.estado] || 0) - (ord[b.estado] || 0); });
      var chips = [{ v: '', l: 'Todas (' + rows.length + ')' }];
      TEAM.forEach(function (n) { var c = rows.filter(function (r) { return r.dono === n; }).length; chips.push({ v: n, l: 'Para ' + art(n) + ' ' + n + (DEPT[n] ? ' · ' + DEPT[n] : '') + ' (' + c + ')' }); });
      var antigos = []; rows.forEach(function (r) { if (r.dono && TEAM.indexOf(r.dono) < 0 && antigos.indexOf(r.dono) < 0) antigos.push(r.dono); });
      antigos.forEach(function (n) { var c = rows.filter(function (r) { return r.dono === n; }).length; chips.push({ v: n, l: 'Antigo: ' + n + ' (' + c + ')' }); });
      var sem = rows.filter(function (r) { return !r.dono; }).length;
      chips.push({ v: '-', l: 'Sem responsável (' + sem + ')' });
      $('tf-filas').innerHTML = chips.map(function (c) { return '<button type="button" class="cp' + (tfF === c.v ? ' on' : '') + '" data-act="tf-fila" data-f="' + esc(c.v) + '">' + esc(c.l) + '</button>'; }).join('');
      var ativas = rows.filter(function (r) { return r.estado !== 'concluida'; });
      var list = ativas.filter(function (r) { return !tfF || (tfF === '-' ? !r.dono : r.dono === tfF); });
      var done = rows.filter(function (r) { return r.estado === 'concluida'; });
      function cardTf(r) {
        var venc = r.prazo && new Date(r.prazo).getTime() < Date.now() && r.estado !== 'concluida';
        var acts = '';
        if (r.estado === 'pendente') acts = ib('', '▶', 'Começar', 'data-act="tf-estado" data-id="' + r.id + '" data-to="fazendo"');
        else if (r.estado === 'fazendo') acts = ib('', '⚖', 'Decidir', 'data-act="tf-estado" data-id="' + r.id + '" data-to="decidir"') + ib('', '✓', 'Concluir', 'data-act="tf-estado" data-id="' + r.id + '" data-to="aprovacao"');
        var dica = r.estado === 'aprovacao' ? ' · esperando o João na aba Aprovação' : r.estado === 'decidir' ? ' · esperando o João na aba Decidir' : '';
        var trilha = [];
        if (r.recebida_em) trilha.push('recebida por ' + esc(r.recebida_por || '-') + ' ' + fmt(r.recebida_em));
        if (r.fazendo_em) trilha.push('fazendo por ' + esc(r.fazendo_por || '-') + ' ' + fmt(r.fazendo_em));
        if (r.feita_em) trilha.push('concluída por ' + esc(r.feita_por || '-') + ' ' + fmt(r.feita_em));
        return '<div class="row tf' + (venc ? ' atr' : '') + '"><div><b>' + esc(r.titulo) + '</b><p>' + (TF[r.estado] || esc(r.estado)) + (venc ? ' <span class="tag r">Vencida</span>' : '') + ' · criada ' + fmt(r.criado_em) + (r.prazo ? ' · prazo ' + fmtPrazo(r.prazo) : '') + (r.origem_tarefa_id ? ' · derivada de tf-' + r.origem_tarefa_id : '') + (r.decisao_id ? ' · da pendência ger-' + r.decisao_id : '') + (r.ouvidoria_id ? ' · da ouvidoria ov-' + r.ouvidoria_id : '') + dica + (r.descricao ? '<br>' + esc(r.descricao) : '') + (trilha.length ? '<br>' + trilha.join(' · ') : '') + (r.comentario ? '<br>Comentário: ' + esc(r.comentario) : '') + '</p>' + rsel('tarefas', r.id, r.dono) + '</div>' +
          '<div class="acts">' + acts + ib('', '⤴', 'Derivar', 'data-act="tf-deriv" data-id="' + r.id + '"') + ib('', '✕', 'Apagar', 'data-act="tf-del" data-id="' + r.id + '"') + ib('', '⏱', 'Histórico', 'data-act="hist" data-ref="' + 'tf:' + r.id + '"') + '</div>' + '<div class="hbox" hidden id="h-' + ('tf:' + r.id).replace(/[^a-z0-9]/gi, '_') + '"></div>' + '</div>';
      }
      $('tf-list').innerHTML = list.length ? list.map(cardTf).join('') : '<p class="src">Nenhuma tarefa' + (tfF ? ' nesta fila' : '') + ' em aberto.</p>';
      var doneBox = $('tf-done-list'); if (doneBox) doneBox.innerHTML = done.length ? done.map(cardTf).join('') : '<p class="src">Nenhuma concluída ainda.</p>';
      var tfd = rows.filter(function (r) { return r.estado === 'decidir'; });
      var wrap = $('tf-dec-wrap');
      if (wrap) {
        wrap.hidden = !tfd.length;
        $('tf-dec-list').innerHTML = tfd.map(function (r) {
          return '<div class="row tf"><div><b>' + esc(r.titulo) + '</b><p>de ' + esc(r.dono || '-') + (r.prazo ? ' · prazo ' + fmtPrazo(r.prazo) : '') + (r.descricao ? '<br>' + esc(r.descricao) : '') + '</p>' +
            '<div class="cmbox"><textarea rows="2" maxlength="500" placeholder="Decisão do João" id="tfd-' + r.id + '"></textarea>' + ib('ok2', '✓', 'Devolver para Fazendo', 'data-act="tf-dec-resp" data-id="' + r.id + '"') + '</div></div></div>';
        }).join('');
      }
      var ap = rows.filter(function (r) { return r.estado === 'aprovacao'; });
      var apBox = $('ap-list');
      if (apBox) apBox.innerHTML = ap.length ? ap.map(function (r) {
        return '<div class="row tf"><div><b>' + esc(r.titulo) + '</b><p>de ' + esc(r.dono || '-') + (r.prazo ? ' · prazo ' + fmtPrazo(r.prazo) : '') + (r.descricao ? '<br>' + esc(r.descricao) : '') + (r.comentario ? '<br>Comentário: ' + esc(r.comentario) : '') + '</p></div>' +
          '<div class="acts">' + ib('', '✓', 'Aprovar', 'data-act="tf-estado" data-id="' + r.id + '" data-to="concluida"') + ib('', '↺', 'Reprovar', 'data-act="tf-rep" data-id="' + r.id + '"') + '</div></div>';
      }).join('') : '<p class="src">Nada esperando aprovação.</p>';
    }).catch(function (e) { fail(e, $('tf-list')); });
  }
  $('tf-new').addEventListener('submit', function (e) {
    e.preventDefault(); var f = e.target, el = f.elements;
    DB.insert('tarefas', { titulo: el.titulo.value.trim(), dono: el.dono.value.trim() || null, prazo: prazoISO(el.prazo.value), descricao: el.descricao ? el.descricao.value.trim() || null : null, estado: 'pendente' }).then(function (rr) { if (rr && rr[0]) log('tarefa_criada', { ref: 'tf:' + rr[0].id }); f.reset(); msg(f, 'Adicionada.'); return loadTf(); }).catch(function (er) { msg(f, 'Não gravou: ' + er.message, 1); });
  });

  /* ---------- Ouvidoria ---------- */
  var TIPO = { ideia: 'Ideia', auditoria: 'Auditoria', reclamacao: 'Reclamação' };
  function loadOv() {
    return DB.get('ouvidoria?select=*&order=criado_em.desc').then(function (rows) {
      CACHE.ov = rows; doSearch(); renderDash();
      $('ov-list').innerHTML = rows.length ? rows.map(function (r) {
        var done = r.estado === 'tratada';
        return '<div class="row tf"><div><b>' + (TIPO[r.tipo] || esc(r.tipo)) + (done ? ' · tratada' : '') + '</b><p>' + esc(r.texto) + '</p><p class="src">' + (r.autor ? esc(r.autor) + ' · ' : '') + fmt(r.criado_em) + '</p>' + rsel('ouvidoria', r.id, r.responsavel) + '</div>' +
          (done ? '' : '<div class="acts">' + ib('', '⚑', 'Criar tarefa', 'data-act="ov-criar" data-id="' + r.id + '"') + ib('', '✕', 'Descartar', 'data-act="ov-descartar" data-id="' + r.id + '"') + '</div>') + '</div>';
      }).join('') : '<p class="src">Nenhum registro.</p>';
    }).catch(function (e) { fail(e, $('ov-list')); });
  }
  $('ov-new').addEventListener('submit', function (e) {
    e.preventDefault(); var f = e.target, el = f.elements;
    var ovTipo = el.tipo.value, ovTrecho = el.texto.value.trim().slice(0, 120);
    DB.insert('ouvidoria', { tipo: ovTipo, texto: el.texto.value.trim(), autor: el.autor.value.trim() || null, responsavel: el.responsavel.value || null, estado: 'nova' }).then(function () { DB.insert('chamadas', { texto: 'Ouvidoria nova (' + ovTipo + '): ' + ovTrecho }).catch(function () {}); f.reset(); msg(f, 'Registrado.'); return loadOv(); }).catch(function (er) { msg(f, 'Não gravou: ' + er.message, 1); });
  });

  /* ---------- fotos dos produtos (Storage, bucket privado) ---------- */
  var BLOBS = {};
  function photoUrl(path) {
    if (BLOBS[path]) return Promise.resolve(BLOBS[path]);
    return DB.st('GET', 'object/authenticated/produtos/' + path.split('/').map(encodeURIComponent).join('/')).then(function (r) { return r.blob(); }).then(function (bl) { return (BLOBS[path] = URL.createObjectURL(bl)); });
  }
  function loadPhotos(cod) {
    var box = document.getElementById('ph-' + cod); if (!box) return Promise.resolve();
    return DB.st('POST', 'object/list/produtos', JSON.stringify({ prefix: cod + '/', limit: 50, sortBy: { column: 'created_at', order: 'desc' } }), 'application/json').then(function (r) { return r.json(); }).then(function (files) {
      files = files.filter(function (f) { return f.name && f.id; });
      box.innerHTML = files.map(function (f) { return '<div class="th" data-p="' + esc(cod + '/' + f.name) + '"><img alt="Foto de ' + esc(cod) + '" loading="lazy"><button class="cp ib" type="button" aria-label="Apagar foto" title="Apagar foto" data-act="ph-del" data-p="' + esc(cod + '/' + f.name) + '">✕</button></div>'; }).join('');
      box.querySelectorAll('.th').forEach(function (t) { var p = t.dataset.p; photoUrl(p).then(function (u) { var im = t.querySelector('img'); im.src = u; im.onclick = function () { window.open(u, '_blank'); }; }).catch(function () {}); });
    }).catch(function (e) { if (e && e.auth) showLogin(); });
  }
  function shrink(file, max) {
    return new Promise(function (ok, no) {
      var img = new Image(), u = URL.createObjectURL(file);
      img.onload = function () {
        var k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(u);
        c.toBlob(function (bl) { bl ? ok(bl) : no(new Error('Imagem inválida')); }, 'image/jpeg', 0.82);
      };
      img.onerror = function () { no(new Error('Não foi possível ler a imagem')); }; img.src = u;
    });
  }
  document.addEventListener('change', function (e) {
    var inp = e.target; if (!(inp.matches && inp.matches('input[data-ph]'))) return;
    var cod = inp.dataset.ph, f = inp.files[0]; if (!f) return;
    var st = document.getElementById('phs-' + cod); st.textContent = 'Enviando…';
    shrink(f, 1280).then(function (bl) { return DB.st('POST', 'object/produtos/' + encodeURIComponent(cod) + '/' + Date.now() + '.jpg', bl, 'image/jpeg'); })
      .then(function () { st.textContent = ''; log('produto_foto', { ref: 'prod:' + cod }); return loadPhotos(cod); })
      .catch(function (er) { st.textContent = 'Não enviou: ' + er.message; }).then(function () { inp.value = ''; });
  });
  /* ---------- arquivos dos produtos (Storage + STL via Drive) ---------- */
  var AQ = { cod: null, etapa: '', arq: null };
  var AQICON = { imagem: '\ud83d\uddbc', stl: '\ud83e\udeca', pdf: '\ud83d\udcc4', outro: '\ud83d\udcce' };
  function fmtB(n) { if (!n) return ''; return n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB'; }
  function aqTipo(mime, nome) {
    if (/^image\//.test(mime || '')) return 'imagem';
    if (/pdf/i.test(mime || '') || /\.pdf$/i.test(nome || '')) return 'pdf';
    return 'outro';
  }
  function loadAq(cod) {
    return DB.get('arquivos?select=*&produto_id=eq.' + encodeURIComponent(cod) + '&apagado_em=is.null&order=enviado_em.desc').then(function (rows) {
      var box = $('aqb-' + cod); if (!box || box.hidden) return;
      var etapas = []; rows.forEach(function (r) { var et = r.etapa_envio || '-'; if (etapas.indexOf(et) < 0) etapas.push(et); });
      var chips = '<button type="button" class="cp' + (AQ.etapa === '' ? ' on' : '') + '" data-act="aq-chip" data-cod="' + esc(cod) + '" data-e="">Todas (' + rows.length + ')</button>' + etapas.map(function (et) { var c = rows.filter(function (r) { return (r.etapa_envio || '-') === et; }).length; return '<button type="button" class="cp' + (AQ.etapa === et ? ' on' : '') + '" data-act="aq-chip" data-cod="' + esc(cod) + '" data-e="' + esc(et) + '">' + esc(et) + ' (' + c + ')</button>'; }).join('');
      var vis = rows.filter(function (r) { return !AQ.etapa || (r.etapa_envio || '-') === AQ.etapa; });
      var grid = vis.length ? vis.map(function (r) {
        var inner = r.tipo === 'imagem' ? '<img alt="' + esc(r.nome_original) + '" loading="lazy" data-aqimg="' + r.id + '">' : '<span class="ic">' + (AQICON[r.tipo] || AQICON.outro) + '</span>';
        return '<div class="aqi" role="button" tabindex="0" data-act="aq-open" data-cod="' + esc(cod) + '" data-id="' + r.id + '">' + inner + '<b>' + esc(r.nome_original) + '</b><span class="src">' + esc(r.tipo) + (r.tamanho_bytes ? ' \u00b7 ' + fmtB(r.tamanho_bytes) : '') + ' \u00b7 ' + fmtD(r.enviado_em) + '</span></div>';
      }).join('') : '<p class="src">Nenhum arquivo.</p>';
      box.innerHTML = '<div class="aqchips">' + chips + '</div><div class="aqgrid">' + grid + '</div>' +
        '<form class="fm" id="aqf-' + esc(cod) + '" hidden><div class="lb">Enviar imagem ou PDF (m\u00e1x 50 MB)</div>' +
        '<label class="cp ib" title="Escolher arquivo" aria-label="Escolher arquivo">\u2912<span class="ibl">Escolher</span><input type="file" name="arq" accept=".jpg,.jpeg,.png,.webp,.pdf" hidden></label>' +
        '<div class="lb">ou anexar STL do Drive</div><input name="nome_stl" maxlength="120" placeholder="Nome do STL"><input name="url_stl" type="url" placeholder="Link do Drive (STL)"><button class="btn" type="submit">Anexar STL</button><p class="msg src" role="status"></p></form>' +
        '<div class="acts"><button class="cp ib" type="button" data-act="aq-enviar" data-cod="' + esc(cod) + '" aria-label="Enviar" title="Enviar">\uff0b<span class="ibl">Enviar</span></button></div><p class="src" id="aqs-' + esc(cod) + '" role="status"></p>';
      vis.forEach(function (r) { if (r.tipo === 'imagem' && r.caminho) photoUrl(r.caminho).then(function (u) { var im = box.querySelector('[data-aqimg="' + r.id + '"]'); if (im) im.src = u; }).catch(function () {}); });
      var form = $('aqf-' + cod);
      if (form) {
        form.elements.arq.addEventListener('change', function () { if (form.elements.arq.files[0]) aqUpload(cod, form.elements.arq.files[0], form); });
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var nome = form.elements.nome_stl.value.trim(), url = form.elements.url_stl.value.trim();
          if (!nome) { msg(form, 'D\u00ea um nome ao STL.', 1); return; }
          if (!/^https:\/\/(drive|docs)\.google\.com\//.test(url)) { msg(form, 'Cole um link do Google Drive.', 1); return; }
          aqInsert(cod, { tipo: 'stl', nome_original: nome, url_externa: url, mime: null, tamanho_bytes: null, caminho: null }, form);
        });
      }
    }).catch(function (e) { if (e && e.auth) showLogin(); });
  }
  function aqInsert(cod, row, form) {
    var prod = CACHE.prod.filter(function (pp) { return pp.codigo === cod; })[0] || {};
    row.produto_id = cod; row.etapa_envio = prod.etapa || null;
    return DB.insert('arquivos', row).then(function () {
      log('arquivo_enviado', { ref: 'prod:' + cod, nome: row.nome_original, tipo: row.tipo });
      if (form) { var mm = form.querySelector('.msg'); if (mm) mm.textContent = 'Enviado.'; form.reset(); }
      return loadAq(cod);
    }).catch(function (er) { if (form) msg(form, 'N\u00e3o gravou: ' + er.message, 1); else alert('N\u00e3o gravou: ' + er.message); });
  }
  function shrinkW(file, max) {
    return new Promise(function (ok, no) {
      var img = new Image(), u = URL.createObjectURL(file);
      img.onload = function () {
        var k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(u);
        c.toBlob(function (bl) { bl ? ok(bl) : no(new Error('Imagem inv\u00e1lida')); }, 'image/webp', 0.82);
      };
      img.onerror = function () { no(new Error('N\u00e3o foi poss\u00edvel ler a imagem')); }; img.src = u;
    });
  }
  function aqUpload(cod, file, form) {
    if (file.size > 50 * 1048576) { msg(form, 'M\u00e1ximo 50 MB por arquivo.', 1); form.reset(); return; }
    var tipo = aqTipo(file.type, file.name);
    if (tipo === 'outro') { msg(form, 'Aceito: JPG, PNG, WebP ou PDF. STL vai como link do Drive.', 1); form.reset(); return; }
    var st = $('aqs-' + cod); st.textContent = 'Enviando\u2026';
    var ext = tipo === 'imagem' ? '.webp' : '.pdf', path = cod + '/arq/' + crypto.randomUUID() + ext;
    (tipo === 'imagem' ? shrinkW(file, 1600) : Promise.resolve(file)).then(function (bl) {
      return DB.st('POST', 'object/produtos/' + path.split('/').map(encodeURIComponent).join('/'), bl, tipo === 'imagem' ? 'image/webp' : 'application/pdf').then(function () { return bl.size; });
    }).then(function (size) {
      st.textContent = '';
      return aqInsert(cod, { tipo: tipo, nome_original: file.name, mime: tipo === 'imagem' ? 'image/webp' : (file.type || 'application/pdf'), tamanho_bytes: size, caminho: path, url_externa: null }, form);
    }).catch(function (er) { st.textContent = ''; msg(form, 'N\u00e3o enviou: ' + er.message, 1); });
  }
  function openAfs(cod, id) {
    DB.get('arquivos?select=*&id=eq.' + id).then(function (rows) {
      var r = rows[0]; if (!r) return;
      AQ.arq = r;
      var body = '<p><span class="stag">' + esc(r.tipo) + '</span></p><p><b>' + esc(r.nome_original) + '</b></p>';
      body += '<p class="src">' + (r.tamanho_bytes ? fmtB(r.tamanho_bytes) + ' \u00b7 ' : '') + 'Enviado ' + fmt(r.enviado_em) + (r.etapa_envio ? ' \u00b7 etapa ' + esc(r.etapa_envio) : '') + '</p>';
      if (r.tipo === 'imagem' && r.caminho) body += '<img class="afs-prev" alt="" id="afs-img">';
      body += '<div class="acts">';
      if (r.tipo === 'stl' && r.url_externa) body += '<a class="cp ib" href="' + esc(r.url_externa) + '" target="_blank" rel="noopener">\u2197<span class="ibl">Abrir no Drive</span></a>';
      else if (r.caminho) body += '<button class="cp ib" type="button" data-act="afs-dl">\u2913<span class="ibl">Baixar</span></button>';
      body += '<button class="cp ib" type="button" data-act="afs-del" data-cod="' + esc(cod) + '">\u2715<span class="ibl">Apagar</span></button></div>';
      $('afs-h').textContent = 'Arquivo \u00b7 ' + cod;
      $('afs-body').innerHTML = body;
      $('afs').hidden = false;
      if (r.tipo === 'imagem' && r.caminho) photoUrl(r.caminho).then(function (u) { var im = $('afs-img'); if (im) { im.src = u; im.onclick = function () { window.open(u, '_blank'); }; } });
    });
  }
  /* ---------- adicionar pelo topo (modal) ---------- */
  var ADD = {
    pendencia: { rot: 'Pendência', campos: '<input name="titulo" required maxlength="140" placeholder="Título"><textarea name="opcoes" rows="2" placeholder="Detalhe (opcional)"></textarea><select name="posicao" aria-label="Faixa"><option value="1">Faixa 1 · Decidir agora</option><option value="2">Faixa 2 · Esta semana</option><option value="3" selected>Faixa 3 · Depois</option></select>', grava: function (el) { return DB.insert('decisoes', { titulo: el.titulo.value.trim(), opcoes: el.opcoes.value.trim() || null, posicao: +el.posicao.value, estado: 'aberta' }).then(function (rr) { if (rr && rr[0]) log('pendencia_criada', { ref: 'dec:' + rr[0].id }); return loadGer(); }); } },
    tarefa: { rot: 'Tarefa', campos: '<input name="titulo" required maxlength="160" placeholder="O que precisa ser feito"><textarea name="descricao" rows="2" maxlength="500" placeholder="Descrição (opcional)"></textarea><select name="dono" required aria-label="Responsável"><option value="">Escolher o responsável…</option><option>João</option><option>Cláudio</option><option>Osvaldo</option><option>M01</option><option>M02</option><option>M03</option><option>M04</option><option>O01</option><option>O02</option><option>O03</option><option>O04</option><option>I01</option><option>I02</option><option>I03</option><option>I04</option><option>I05</option><option>I06</option><option>I07</option><option>I08</option></select><label class="lb">Prazo<select name="prazo" required><option value="15">15 min</option><option value="30">30 min</option><option value="60">60 min</option><option value="120">2 h</option><option value="1440" selected>1 dia</option></select></label><textarea name="comentario" rows="2" maxlength="500" placeholder="Comentário (opcional)"></textarea>', grava: function (el) { var ovid = OV_ORIGEM, tfid = TF_ORIGEM; return DB.insert('tarefas', { titulo: el.titulo.value.trim(), dono: el.dono.value || null, prazo: prazoISO(el.prazo.value), descricao: el.descricao.value.trim() || null, comentario: el.comentario.value.trim() || null, estado: 'pendente', ouvidoria_id: ovid || null, origem_tarefa_id: tfid || null }).then(function (rr) { var tid = rr && rr[0] && rr[0].id; if (!tid) throw new Error('insert tarefa'); var det = { ref: 'tf:' + tid }; if (ovid) det.origem = 'ov:' + ovid; if (tfid) det.origem_tarefa = 'tf:' + tfid; log(tfid ? 'tarefa_derivada' : 'tarefa_criada', det); TF_ORIGEM = null; if (ovid) { OV_ORIGEM = null; return DB.update('ouvidoria', 'id=eq.' + ovid, { estado: 'tratada' }).then(function () { toast('Tarefa criada; registro tratado'); loadOv(); return loadTf(); }).catch(function () { toast('Tarefa criada'); return loadTf(); }); } return loadTf(); }); } },
    ouvidoria: { rot: 'Registro', campos: '<select name="tipo" aria-label="Tipo"><option value="ideia">Ideia</option><option value="auditoria">Auditoria</option><option value="reclamacao">Reclamação</option></select><textarea name="texto" required rows="3" maxlength="1500" placeholder="Descreva"></textarea><input name="autor" maxlength="40" placeholder="Quem registra"><select name="responsavel" aria-label="Responsável"><option value="">Sem responsável</option><option>João</option><option>Cláudio</option><option>Osvaldo</option><option>M01</option><option>M02</option><option>M03</option><option>M04</option><option>O01</option><option>O02</option><option>O03</option><option>O04</option><option>I01</option><option>I02</option><option>I03</option><option>I04</option><option>I05</option><option>I06</option><option>I07</option><option>I08</option></select>', grava: function (el) { var tp = el.tipo.value, tr = el.texto.value.trim().slice(0, 120); return DB.insert('ouvidoria', { tipo: tp, texto: el.texto.value.trim(), autor: el.autor.value.trim() || null, responsavel: el.responsavel.value || null, estado: 'nova' }).then(function () { DB.insert('chamadas', { texto: 'Ouvidoria nova (' + tp + '): ' + tr }).catch(function () {}); return loadOv(); }); } },
    produto: { rot: 'Produto', campos: '<input name="codigo" required pattern="FP-0[0-9]{2}" placeholder="Código, ex.: FP-011"><input name="nome" placeholder="Nome">', grava: function (el) { return DB.insert('produtos', { codigo: el.codigo.value.trim().toUpperCase(), nome: el.nome.value.trim() || null, etapa: 'E1', loja_bloqueada: true }).then(function () { log('produto_criado', { ref: 'prod:' + el.codigo.value.trim().toUpperCase() }); return loadBc(); }); } }
  };
  var ROTA_ADD = { decidir: 'pendencia', tarefas: 'tarefa', ouvidoria: 'ouvidoria', produtos: 'produto' };
  var OV_ORIGEM = null;
  var TF_ORIGEM = null;
  function derivarTarefa(tr) {
    TF_ORIGEM = tr.id;
    $('addm-tipo').value = 'tarefa';
    addmForm('tarefa');
    var f = $('addm-f');
    f.elements.titulo.value = ('Derivada de tf-' + tr.id + ': ').slice(0, 160);
    $('addm').hidden = false;
    f.elements.titulo.focus();
  }
  function ovCriarTarefa(ovr) {
    OV_ORIGEM = ovr.id;
    $('addm-tipo').value = 'tarefa';
    addmForm('tarefa');
    var f = $('addm-f');
    f.elements.titulo.value = ((TIPO[ovr.tipo] || ovr.tipo) + ': ' + (ovr.texto || '')).slice(0, 160);
    f.elements.dono.value = ovr.responsavel || '';
    f.elements.comentario.value = 'Origem: ouvidoria ov-' + ovr.id + ' (' + (TIPO[ovr.tipo] || ovr.tipo) + (ovr.autor ? ', ' + ovr.autor : '') + ')';
    $('addm').hidden = false;
    f.elements.titulo.focus();
  }
  function addmForm(tipo) {
    var A = ADD[tipo]; if (!A) return;
    $('addm-body').innerHTML = '<form class="fm" id="addm-f"><div class="lb">' + A.rot + '</div>' + A.campos + '<button class="btn" type="submit">Adicionar</button><p class="msg src" role="status"></p></form>';
    $('addm-f').addEventListener('submit', function (e) {
      e.preventDefault(); var f = e.target;
      A.grava(f.elements).then(function () { closeAddm(); }).catch(function (er) { if (er && er.auth) { closeAddm(); return; } msg(f, 'Não gravou: ' + er.message, 1); });
    });
  }
  function openAddm() {
    OV_ORIGEM = null; TF_ORIGEM = null;
    var r = (location.hash || '#inicio').slice(1);
    $('addm-tipo').value = ROTA_ADD[r] || 'tarefa';
    addmForm($('addm-tipo').value);
    $('addm').hidden = false;
    var i = document.querySelector('#addm-f input'); if (i) i.focus();
  }
  function closeAddm() { $('addm').hidden = true; OV_ORIGEM = null; TF_ORIGEM = null; }
  $('add-top').addEventListener('click', openAddm);
  $('addm-x').addEventListener('click', closeAddm);
  $('addm').addEventListener('click', function (e) { if (e.target.classList && e.target.classList.contains('md-bg')) closeAddm(); });
  $('addm-tipo').addEventListener('change', function () { OV_ORIGEM = null; TF_ORIGEM = null; addmForm(this.value); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('addm').hidden) closeAddm(); });

  /* ---------- campainha (chamar o Osvaldo) ---------- */
  function openChm() {
    var al = ALERTAS.length ? '<div class="albox"><div class="lb">Campainha (' + ALERTAS.length + ')</div>' + ALERTAS.map(function (a) { return '<p class="alitem">\uD83D\uDD14 <b>' + esc(a.titulo) + '</b> · ' + esc(a.texto) + '</p>'; }).join('') + '</div>' : '';
    $('chm-body').innerHTML = al + '<form class="fm" id="chm-f"><div class="lb">Mensagem para o Osvaldo</div><textarea name="mensagem" rows="4" maxlength="1000" required placeholder="O que o Osvaldo precisa fazer agora"></textarea><button class="btn" type="submit" aria-label="Enviar" title="Enviar">&#x27A4;</button><p class="msg src" role="status"></p></form>';
    $('chm-f').addEventListener('submit', function (e) { e.preventDefault(); sendChm(e.target); });
    $('chm').hidden = false;
    var t = document.querySelector('#chm-f textarea'); if (t) t.focus();
  }
  function closeChm() { $('chm').hidden = true; }
  function sendChm(f) {
    var b = f.querySelector('button'); b.disabled = true;
    DB.insert('chamadas', { texto: f.elements.mensagem.value.trim() }).then(function () {
      log('chamada_enviada', { ref: 'campainha' });
      closeChm(); toast('Chamada registrada');
    }).catch(function (er) { b.disabled = false; msg(f, 'N\u00e3o registrou: ' + er.message, 1); });
  }
  $('bell').addEventListener('click', openChm);
  $('chm-x').addEventListener('click', closeChm);
  $('chm').addEventListener('click', function (e) { if (e.target.classList && e.target.classList.contains('md-bg')) closeChm(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('chm').hidden) closeChm(); });

  /* ---------- reprovar (aprovação -> fazendo com motivo) ---------- */
  var REP = { id: null };
  function openRep(tr) {
    REP.id = tr.id;
    $('rep-body').innerHTML = '<form class="fm" id="rep-f"><div class="lb">Motivo da reprovação</div><p class="src">' + esc(tr.titulo) + '</p><textarea name="motivo" rows="3" maxlength="500" required placeholder="Por que reprovou? O motivo volta com a tarefa"></textarea><button class="btn" type="submit" aria-label="Reprovar" title="Reprovar">&#x27A4;</button><p class="msg src" role="status"></p></form>';
    $('rep-f').addEventListener('submit', function (e) { e.preventDefault(); sendRep(e.target); });
    $('rep').hidden = false;
    var t = document.querySelector('#rep-f textarea'); if (t) t.focus();
  }
  function closeRep() { $('rep').hidden = true; REP.id = null; }
  function sendRep(f) {
    var b = f.querySelector('button'); b.disabled = true;
    var tr = CACHE.tf.filter(function (r) { return r.id === REP.id; })[0] || {};
    var motivo = f.elements.motivo.value.trim();
    var cm = (tr.comentario ? tr.comentario + ' · ' : '') + 'Reprovada: ' + motivo;
    DB.update('tarefas', 'id=eq.' + REP.id, { estado: 'fazendo', comentario: cm }).then(function () {
      log('tarefa_reprovada', { ref: 'tf:' + REP.id, motivo: motivo });
      closeRep(); toast('Reprovada; voltou para Fazendo'); return loadTf();
    }).catch(function (er) { b.disabled = false; msg(f, 'N\u00e3o gravou: ' + er.message, 1); });
  }
  $('rep-x').addEventListener('click', closeRep);
  $('rep').addEventListener('click', function (e) { if (e.target.classList && e.target.classList.contains('md-bg')) closeRep(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('rep').hidden) closeRep(); });

  /* ---------- busca ---------- */
  function norm(s) { return String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  function doSearch() {
    var q = norm($('sq').value.trim()), box = $('sq-res');
    if (q.length < 2) { box.hidden = true; box.innerHTML = ''; return; }
    var out = [];
    function add(tag, href, title, sub, hay) { if (norm(hay).indexOf(q) > -1) out.push('<a class="row" href="' + href + '"><div><span class="lb">' + tag + '</span><b>' + esc(title) + '</b>' + (sub ? '<p>' + esc(String(sub).slice(0, 120)) + '</p>' : '') + '</div><span class="ar" aria-hidden="true">→</span></a>'); }
    CACHE.dec.forEach(function (r) { add('Decidir' + (r.estado !== 'aberta' ? ' · ' + (ESTADOS[r.estado] || r.estado) : ''), '#decidir', r.titulo, r.opcoes, [r.titulo, r.opcoes, r.comentario].join(' ')); });
    CACHE.prod.forEach(function (r) { add('Produtos', '#produtos', r.codigo + (r.nome ? ' · ' + r.nome : ''), r.pendencias, [r.codigo, r.nome, r.pendencias, r.material, r.medidas].join(' ')); });
    CACHE.tf.forEach(function (r) { add('Tarefas', '#tarefas', r.titulo, r.dono, [r.titulo, r.dono].join(' ')); });
    CACHE.ov.forEach(function (r) { add('Ouvidoria', '#ouvidoria', (TIPO[r.tipo] || r.tipo) + ': ' + r.texto, r.autor, [r.texto, r.autor, r.responsavel].join(' ')); });
    box.hidden = false; box.innerHTML = out.length ? out.slice(0, 25).join('') : '<p class="src">Nada encontrado.</p>';
  }
  $('sq').addEventListener('input', doSearch);
  $('sq-btn').addEventListener('click', function () {
    var b = $('bar-sq'), open = b.classList.toggle('open');
    this.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) $('sq').focus(); else { $('sq').value = ''; doSearch(); }
  });

  /* ---------- dashboard do início (resumo das abas) ---------- */
  function renderDash() {
    function num(id, v) { var e = $(id); if (e) e.textContent = v; }
    function cap(id, v) { var e = $(id); if (e) e.textContent = v; }
    var ab = CACHE.dec.filter(function (r) { return r.estado === 'aberta'; }).length;
    var agd = CACHE.dec.filter(function (r) { return r.estado === 'aguardando'; }).length;
    num('dnum-dec', ab + agd);
    num('dnum-prod', CACHE.prod.length);
    cap('dcap-prod', CACHE.prod.length ? CACHE.prod.length + ' produto' + (CACHE.prod.length > 1 ? 's' : '') + ' cadastrado' + (CACHE.prod.length > 1 ? 's' : '') + '.' : 'Nenhum produto ainda.');
    var tfAb = CACHE.tf.filter(function (r) { return r.estado !== 'concluida'; }).length;
    var tfFaz = CACHE.tf.filter(function (r) { return r.estado === 'fazendo'; }).length;
    var tfJoao = CACHE.tf.filter(function (r) { return r.estado === 'aprovacao' || r.estado === 'decidir'; }).length;
    num('dnum-tf', tfAb);
    cap('dcap-tf', tfAb ? tfAb + ' em aberto · ' + tfFaz + ' fazendo' + (tfJoao ? ' · ' + tfJoao + ' com o João' : '') + '.' : 'Nenhuma tarefa em aberto.');
    var ovAb = CACHE.ov.filter(function (r) { return r.estado !== 'tratada'; }).length;
    num('dnum-ouv', ovAb);
    cap('dcap-ouv', ovAb ? ovAb + ' registro' + (ovAb > 1 ? 's' : '') + ' em aberto.' : 'Nada em aberto.');
  }
  function all() { loadGer(); loadBc(); loadTf(); loadOv(); }
  function start() {
    if (started) return; started = true; all();
    timer = setInterval(function () { if (!document.hidden && !document.querySelector('form:focus-within') && !(document.activeElement && /^(TEXTAREA|INPUT)$/.test(document.activeElement.tagName)) && ![].some.call(document.querySelectorAll('textarea'), function (t) { return t.value; }) && !sheetDirty()) all(); }, 20000);
    var s = DB.session(); var sb = $('sub'); if (s && !$('sair')) { var a = document.createElement('a'); a.id = 'sair'; a.href = '#'; a.textContent = 'Sair'; a.title = s.email; a.dataset.act = 'sair'; $('drw').insertBefore(a, document.querySelector('.drw .ft')); }
  }
  if (DB.session()) start(); else showLogin();
})();

