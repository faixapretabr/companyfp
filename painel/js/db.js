/* PAINEL FP - cliente Supabase (Auth por senha + REST). A chave abaixo é a publicável, feita para ir no navegador. */
(function () {
  'use strict';
  var URL_ = 'https://youljgxrlypnwqcjfrab.supabase.co';
  var KEY = 'sb_publishable_Naan6rBLlHEHVcZ25mfQNA_yf3I5qo3';
  var LS = 'fp_sess_v1';
  function load() { try { return JSON.parse(localStorage.getItem(LS) || 'null'); } catch (e) { return null; } }
  function save(s) { localStorage.setItem(LS, JSON.stringify(s)); }
  function clear() { localStorage.removeItem(LS); }
  async function authPost(grant, body) {
    var r = await fetch(URL_ + '/auth/v1/token?grant_type=' + grant, { method: 'POST', headers: { apikey: KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    var j = await r.json();
    if (!r.ok) throw new Error(j.error_description || j.msg || 'Não foi possível entrar');
    var s = { access: j.access_token, refresh: j.refresh_token, exp: Date.now() + j.expires_in * 1000 - 30000, email: (j.user && j.user.email) || '' };
    save(s); return s;
  }
  async function token() {
    var s = load(); if (!s) return null;
    if (Date.now() < s.exp) return s.access;
    try { s = await authPost('refresh_token', { refresh_token: s.refresh }); return s.access; }
    catch (e) { clear(); return null; }
  }
  async function req(method, path, body, prefer) {
    var tok = await token();
    if (!tok) { var e = new Error('auth'); e.auth = true; throw e; }
    var h = { apikey: KEY, Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' };
    if (method !== 'GET') h.Prefer = prefer || 'return=representation';
    var r = await fetch(URL_ + '/rest/v1/' + path, { method: method, headers: h, body: body ? JSON.stringify(body) : undefined, cache: 'no-store' });
    if (r.status === 401) { clear(); var e2 = new Error('auth'); e2.auth = true; throw e2; }
    var txt = await r.text(), j = txt ? JSON.parse(txt) : null;
    if (!r.ok) throw new Error((j && (j.message || j.hint)) || 'Erro ' + r.status);
    return j;
  }
  window.FPDB = {
    session: load,
    login: function (email, pw) { return authPost('password', { email: email, password: pw }); },
    logout: function () { clear(); },
    get: function (p) { return req('GET', p); },
    insert: function (t, row) { return req('POST', t, row); },
    update: function (t, filter, row) { return req('PATCH', t + '?' + filter, row); },
    remove: function (t, filter) { return req('DELETE', t + '?' + filter); },
    st: async function (method, path, body, ctype) {
      var tok = await token(); if (!tok) { var e = new Error('auth'); e.auth = true; throw e; }
      var h = { apikey: KEY, Authorization: 'Bearer ' + tok }; if (ctype) h['Content-Type'] = ctype;
      var r = await fetch(URL_ + '/storage/v1/' + path, { method: method, headers: h, body: body });
      if (r.status === 401) { clear(); var e2 = new Error('auth'); e2.auth = true; throw e2; }
      if (!r.ok) { var j = {}; try { j = await r.json(); } catch (x) {} throw new Error(j.message || j.error || 'Erro ' + r.status); }
      return r;
    }
  };
})();

