// blog.js - theme toggle + question archive filtering.
// The page is re-written into the document by StatiCrypt after decryption,
// so init() must be safe to call more than once.
(function () {
  'use strict';
  var root = document.documentElement;

  function initTheme() {
    var btn = document.getElementById('theme');
    if (!btn || btn.getAttribute('data-bound') === '1') return;
    btn.setAttribute('data-bound', '1');
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('dl-theme', next); } catch (e) {}
    });
  }

  function initQuestions() {
    var list = document.getElementById('qlist');
    if (!list || list.getAttribute('data-bound') === '1') return;
    list.setAttribute('data-bound', '1');
    var items = Array.prototype.slice.call(list.querySelectorAll('.q'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
    var search = document.getElementById('qsearch');
    var count = document.getElementById('qcount');
    var empty = document.getElementById('qempty');
    var state = { kind: 'all', tool: null, q: '' };

    function apply() {
      var shown = 0;
      for (var i = 0; i < items.length; i++) {
        var el = items[i];
        var ok = true;
        if (state.kind !== 'all' && el.getAttribute('data-kind') !== state.kind) ok = false;
        if (ok && state.tool && el.getAttribute('data-tool') !== state.tool) ok = false;
        if (ok && state.q && el.textContent.toLowerCase().indexOf(state.q) === -1) ok = false;
        el.classList.toggle('hide', !ok);
        if (ok) shown++;
      }
      if (count) count.textContent = shown + ' of ' + items.length;
      if (empty) empty.style.display = shown ? 'none' : 'block';
    }

    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        if (c.hasAttribute('data-tool')) {
          var t = c.getAttribute('data-tool');
          state.tool = state.tool === t ? null : t;
          chips.forEach(function (o) { if (o.hasAttribute('data-tool')) o.classList.toggle('on', o.getAttribute('data-tool') === state.tool); });
        } else {
          state.kind = c.getAttribute('data-filter');
          chips.forEach(function (o) { if (o.hasAttribute('data-filter')) o.classList.toggle('on', o === c); });
        }
        apply();
      });
    });

    if (search) {
      var timer = null;
      search.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () { state.q = search.value.trim().toLowerCase(); apply(); }, 110);
      });
    }

    items.forEach(function (el) {
      var btn = el.querySelector('.morebtn');
      var txt = el.querySelector('.txt');
      if (!btn || !txt) return;
      btn.addEventListener('click', function () {
        var clipped = txt.classList.toggle('clip');
        btn.textContent = clipped ? 'Show more' : 'Show less';
      });
    });

    apply();
  }

  function init() { initTheme(); initQuestions(); }

  try { var saved = localStorage.getItem('dl-theme'); if (saved) root.setAttribute('data-theme', saved); } catch (e) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  init();
  window.addEventListener('load', init);
  setTimeout(init, 400);
  window.__dogmatixInit = init;
})();