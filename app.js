(function(){
'use strict';
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const view = $('#view');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
(window.ETS_LESSONS || []).forEach(l => LESSONS.push(l));
if (window.ETS_SECTIONS) SECTIONS.gre = ETS_SECTIONS.concat(SECTIONS.gre.map(x => x.id === 'quant' ? {id:'quant', name:'Quantitative Reasoning · fast methods'} : x));
const KMF_SEC = {};
const KMF_LET = 'ABCDEFGH';
(window.KMF || []).forEach(r => {
  const q = {id:'k' + r.s + '-' + r.k, exam:'gre', sec:'quant', src:'kmf', kmf:r, topic:r.topic, diff:r.diff === 'Hard' ? 3 : 2, img:true,
    stem:'KMF Section ' + r.s + ' (' + r.diff + ') · Question ' + r.k, exp:r.exp || 'The solutions file gives no note for this question; the answer is from its key.'};
  if (r.t === 'qc'){ q.type = 'qc'; q.answer = r.a; }
  else if (r.t === 'mc'){ q.type = 'mc'; q.options = KMF_LET.slice(0, r.n).split(''); q.answer = r.a; }
  else if (r.t === 'multi'){ q.type = 'multi'; q.options = KMF_LET.slice(0, r.n).split(''); q.answer = r.a; }
  else { q.type = 'numeric'; if (r.frac){ q.frac = true; q.answer = r.a; } else q.answer = r.a; }
  if (r.nokey) q.nokey = true;
  QUESTIONS.push(q);
  (KMF_SEC[r.s] = KMF_SEC[r.s] || []).push(q.id);
});
const KMF_LOADING = {};
function loadKmf(sn){
  if (window.KMF_IMG && KMF_IMG[sn]) return Promise.resolve();
  if (KMF_LOADING[sn]) return KMF_LOADING[sn];
  KMF_LOADING[sn] = new Promise((res, rej) => { const sc = document.createElement('script'); sc.src = 'kmfg/g' + String(Math.ceil(sn / 4)).padStart(2, '0') + '.js'; sc.onload = res; sc.onerror = () => { delete KMF_LOADING[sn]; rej(); }; document.head.appendChild(sc); });
  return KMF_LOADING[sn];
}
const LBY = {}; LESSONS.forEach(l => LBY[l.id] = l);
const QBY = {}; QUESTIONS.forEach(q => QBY[q.id] = q);
const vid = v => v.exam + ':' + v.w;
const VBY = {}; VOCAB.forEach(v => VBY[vid(v)] = v);
const LETTERS = 'ABCDEFGHIJ';
const ROMAN = ['(i)','(ii)','(iii)'];
const QC_OPTS = ['Quantity A is greater.','Quantity B is greater.','The two quantities are equal.','The relationship cannot be determined from the information given.'];
const TF = ['TRUE','FALSE','NOT GIVEN'], YN = ['YES','NO','NOT GIVEN'];
const TYPE_LABEL = {qc:'Quantitative Comparison', mc:'Multiple choice — select one', multi:'Select one or more', numeric:'Numeric Entry', tc:'Text Completion', se:'Sentence Equivalence', sip:'Select-in-Passage', tfng:'True / False / Not Given', ynng:'Yes / No / Not Given', gap:'Completion'};

/* ---------------- storage ---------------- */
const KEY = 'greIeltsPrep.v1';
function defaults(){ return {exam:'gre', theme:'', attempts:{}, mistakes:{}, lessons:{}, vocab:{}, tests:[], drafts:{}}; }
let S = defaults();
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(defaults(), JSON.parse(raw)); } catch(e) {}
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) {} }
if (S.theme) document.documentElement.setAttribute('data-theme', S.theme);

/* ---------------- icons ---------------- */
const I = {
  home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  guide:'<path d="M4 4h11a4 4 0 014 4v12H8a4 4 0 01-4-4z"/><path d="M8 9h7M8 13h5"/>',
  bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
  learn:'<path d="M2 8l10-4 10 4-10 4z"/><path d="M6 10v5c3 2.5 9 2.5 12 0v-5"/>',
  practice:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  test:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
  vocab:'<rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 012 2v13"/><path d="M7 11h5M7 15h4"/>',
  review:'<path d="M3 12a9 9 0 103-6.7"/><path d="M3 4v5h5"/>',
  calc:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
  check:'<path d="M5 12l5 5 9-10"/>', x:'<path d="M6 6l12 12M18 6L6 18"/>', play:'<path d="M7 4l13 8-13 8z"/>',
  flag:'<path d="M5 21V4h11l-2 4 2 4H5"/>', arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>', back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
  grid:'<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/>',
  sound:'<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>'
};
const ico = (n, cls) => `<svg class="${cls || 'ico'}" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;

/* ---------------- progress helpers ---------------- */
function examLessons(ex){ ex = ex || S.exam; return SECTIONS[ex].reduce((acc, sc) => acc.concat(LESSONS.filter(l => l.exam === ex && l.sec === sc.id)), []); }
function examQs(ex){ return QUESTIONS.filter(q => q.exam === (ex || S.exam)); }
function topicQs(t){ return QUESTIONS.filter(q => q.topic === t); }
function openMistakes(ex){
  return Object.keys(S.mistakes).filter(id => S.mistakes[id].open && QBY[id] && QBY[id].exam === (ex || S.exam)).map(id => Object.assign({id}, S.mistakes[id]));
}
function topicMistakes(ex){
  const m = {};
  openMistakes(ex).forEach(x => { const t = QBY[x.id].topic; (m[t] = m[t] || {topic:t, ids:[], n:0, ts:0}); m[t].ids.push(x.id); m[t].n += x.n; m[t].ts = Math.max(m[t].ts, x.ts); });
  return Object.values(m).sort((a, b) => b.ids.length - a.ids.length || b.ts - a.ts);
}
function vocabDue(ex){ return VOCAB.filter(v => v.exam === (ex || S.exam) && S.vocab[vid(v)] && S.vocab[vid(v)].due); }
function reviewCount(ex){ return openMistakes(ex).length + vocabDue(ex).length; }
function record(q, ok){
  const a = S.attempts[q.id] || {n:0, c:0};
  a.n++; if (ok) a.c++; a.last = ok; S.attempts[q.id] = a;
  const m = S.mistakes[q.id];
  if (!ok) S.mistakes[q.id] = {n:(m ? m.n : 0) + 1, ts:Date.now(), open:true};
  else if (m && m.open){ m.open = false; m.fixed = Date.now(); }
  save();
}
function accuracy(ids){
  let n = 0, c = 0; ids.forEach(id => { const a = S.attempts[id]; if (a){ n += a.n; c += a.c; } });
  return n ? Math.round(100 * c / n) : null;
}

/* ---------------- chrome ---------------- */
const NAV = [
  {h:'Start'}, {id:'home', label:'Home', icon:'home'}, {id:'official', label:'Official guide', icon:'guide'}, {id:'strategy', label:'Strategy & tricks', icon:'bulb'},
  {h:'Learning track'}, {id:'learn', label:'Lessons', icon:'learn'}, {id:'practice', label:'Practice questions', icon:'practice'}, {id:'vocab', label:'Vocabulary', icon:'vocab'},
  {h:'Test mode'}, {id:'tests', label:'Timed tests', icon:'test'},
  {h:'Progress'}, {id:'review', label:'Review mistakes', icon:'review', badge:true}
];
const TABS = [['home','Home','home'],['learn','Learn','learn'],['practice','Practice','practice'],['tests','Tests','test'],['vocab','Vocab','vocab']];
function segHTML(){
  return `<div class="seg" role="group" aria-label="Exam">
    <button type="button" data-act="exam" data-exam="gre" aria-pressed="${S.exam === 'gre'}">GRE</button>
    <button type="button" data-act="exam" data-exam="ielts" aria-pressed="${S.exam === 'ielts'}">IELTS</button></div>`;
}
const SOCIAL = [
  ['Facebook','https://www.facebook.com/brittanto.books','<path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z"/>'],
  ['Instagram','https://www.instagram.com/brittanto.books','<path d="M12 7.3A4.7 4.7 0 1012 16.7 4.7 4.7 0 0012 7.3zm0 7.7a3 3 0 110-6 3 3 0 010 6zm6-7.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0zM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.7-.1-4-1.4-4.1-4.1C3.6 15 3.6 14.7 3.6 12s0-3 .1-4.1C3.8 5.2 5.1 3.9 7.9 3.8 9 3.6 9.3 3.6 12 3.6zM12 2c-2.7 0-3.1 0-4.2.1C4.1 2.2 2.2 4.1 2.1 7.8 2 8.9 2 9.3 2 12s0 3.1.1 4.2c.1 3.7 2 5.6 5.7 5.7 1.1.1 1.5.1 4.2.1s3.1 0 4.2-.1c3.7-.1 5.6-2 5.7-5.7.1-1.1.1-1.5.1-4.2s0-3.1-.1-4.2c-.1-3.7-2-5.6-5.7-5.7C15.1 2 14.7 2 12 2z"/>'],
  ['YouTube','https://www.youtube.com/@BrittantoBooks','<path d="M23 7.2a3 3 0 00-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 001 7.2 31 31 0 00.5 12a31 31 0 00.5 4.8 3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1 31 31 0 00.5-4.8 31 31 0 00-.5-4.8zM9.7 15V9l5.8 3-5.8 3z"/>']
];
const socialHTML = () => `<div class="social">${SOCIAL.map(s => `<a href="${s[1]}" target="_blank" rel="noopener" aria-label="Brittanto on ${s[0]}"><svg viewBox="0 0 24 24" aria-hidden="true">${s[2]}</svg>${s[0]}</a>`).join('')}</div>`;
function brandHTML(){
  const mark = window.BRAND_LOGO ? `<img class="brand-logo" src="${BRAND_LOGO}" alt="Brittanto logo">` : `<span class="brand-mark">B</span>`;
  return `<a class="brand" href="#home">${mark}<span><span class="brand-name">Brittanto</span><br><span class="brand-sub">GRE &amp; IELTS Prep</span></span></a>`;
}
function renderChrome(active){
  const rc = reviewCount();
  $('#side').innerHTML = brandHTML() + segHTML() + `<nav class="nav">` + NAV.map(n => n.h ? `<div class="nav-h">${n.h}</div>` :
    `<a href="#${n.id}" ${active === n.id ? 'aria-current="page"' : ''}>${ico(n.icon)}<span>${n.label}</span>${n.badge && rc ? `<span class="badge">${rc}</span>` : ''}</a>`).join('') + `</nav>
    <div class="side-foot">${socialHTML()}<p class="credit">Created by <b>Atikur Rahman</b><br><span>atikurrahman7150@gmail.com</span></p><button class="theme-btn" data-act="theme">Theme: ${S.theme ? (S.theme === 'dark' ? 'Dark' : 'Light') : 'System'}</button></div>`;
  $('#top').innerHTML = brandHTML() + segHTML() + `<a class="icon-btn" href="#review" aria-label="Review mistakes">${ico('review')}${rc ? `<span class="badge">${rc}</span>` : ''}</a>`;
  $('#tabbar').innerHTML = TABS.map(t => `<a href="#${t[0]}" ${active === t[0] ? 'aria-current="page"' : ''}>${ico(t[2])}<span>${t[1]}</span></a>`).join('');
}

/* ---------------- router ---------------- */
let route = 'home';
function render(keepScroll){
  let h = (location.hash || '#home').slice(1) || 'home';
  if (h.indexOf('lesson-') === 0){
    const l = LBY[h.slice(7)];
    if (!l) h = 'learn'; else if (l.exam !== S.exam){ S.exam = l.exam; save(); }
  }
  if (h === 'test' && !T) h = 'tests';
  if (h !== route && h !== 'test'){ stopSpeech(); stopCamAudio(); if (h !== 'practice') CP = null; }
  route = h;
  document.body.dataset.exam = S.exam;
  document.body.classList.toggle('testing', h === 'test');
  const base = h.indexOf('lesson-') === 0 ? 'learn' : h;
  renderChrome(base);
  const views = {home:homeView, official:officialView, strategy:strategyView, learn:learnView, practice:practiceView, tests:testsView, test:testView, vocab:vocabView, review:reviewView};
  let html;
  if (h.indexOf('lesson-') === 0) html = lessonView(h.slice(7));
  else html = (views[h] || homeView)();
  view.innerHTML = html;
  afterRender();
  if (!keepScroll) window.scrollTo(0, 0);
}
function paint(){ render(true); }
function go(h){ if ((location.hash || '#home').slice(1) === h) render(); else location.hash = h; }
window.addEventListener('hashchange', () => render());

/* ================= HOME ================= */
function homeView(){
  const g = GUIDES[S.exam];
  const ex = S.exam;
  const L = examLessons(), done = L.filter(l => S.lessons[l.id]).length;
  const Qs = examQs(); const answered = Qs.filter(q => S.attempts[q.id]).length;
  const acc = accuracy(Qs.map(q => q.id));
  const words = VOCAB.filter(v => v.exam === ex), known = words.filter(v => S.vocab[vid(v)] && S.vocab[vid(v)].known).length;
  const tm = topicMistakes();
  const nextLesson = L.find(l => !S.lessons[l.id]) || L[0];
  const scale = ex === 'gre'
    ? `<div class="scale"><div class="scale-track">${[130,135,140,145,150,155,160,165].map(n => `<span class="${n >= 160 ? 'hi' : ''}">${n}</span>`).join('')}</div><div class="scale-cap"><span>Verbal and Quant are each scored 130–170</span><span>170</span></div></div>`
    : `<div class="scale"><div class="scale-track">${[1,2,3,4,5,6,7,8,9].map(n => `<span class="${n >= 7 ? 'hi' : ''}">${n}</span>`).join('')}</div><div class="scale-cap"><span>Each skill and the overall score: bands 0–9</span><span>Band 7+ is the common university target</span></div></div>`;
  const tdefs = testDefs(ex);
  return `
  <section class="hero">
    <p class="eyebrow">${ex === 'gre' ? 'GRE General Test · shorter format since Sept 2023' : 'IELTS Academic & General Training'}</p>
    <h1>${ex === 'gre' ? 'Prepare for the GRE' : 'Prepare for IELTS'}</h1>
    <div class="facts">${g.facts.map(f => `<span class="chip">${f}</span>`).join('')}</div>
    ${scale}
  </section>

  <div class="sec-title"><h2>Start here</h2></div>
  <div class="startrow">
    <a class="card startcard" href="#official"><span class="ico-b">${ico('guide')}</span><div><h3>1 · Official guide</h3><p class="small">Sections, timing, question types, scoring and rules from ${ex === 'gre' ? 'ETS' : 'IELTS'}.</p></div></a>
    <a class="card startcard" href="#strategy"><span class="ico-b">${ico('bulb')}</span><div><h3>2 · Strategy &amp; tricks</h3><p class="small">Pacing, the methods that save the most time, and common traps.</p></div></a>
  </div>

  ${tm.length ? `<div class="card review-card" style="margin-top:22px">
    <h2>Questions to revisit</h2>
    <p class="small" style="color:var(--ink)">You missed questions in ${tm.length} ${tm.length === 1 ? 'topic' : 'topics'}. Re-read the lesson, then practise similar questions.</p>
    <ul class="review-list">${tm.slice(0, 3).map(t => `<li><span class="rl-t">${esc(LBY[t.topic].title)}</span><span class="small">${t.ids.length} missed</span><a class="btn small ghost" href="#lesson-${t.topic}">Read lesson</a><button class="btn small" data-act="similar" data-topic="${t.topic}">Practise similar</button></li>`).join('')}</ul>
  </div>` : ''}

  <div class="sec-title"><h2>Choose a mode</h2></div>
  <div class="grid2">
    <div class="card mode">
      <p class="eyebrow">Learning track</p>
      <h2>Learn, then practise one question at a time</h2>
      <p class="small">Every answer is explained. Right answers get the concept again; wrong ones show why your choice fails.</p>
      <ul class="steps">
        <li><a href="#lesson-${nextLesson.id}"><span class="step-n">1</span><span><span class="s-t">Lessons</span><br><span class="s-d">Next: ${esc(nextLesson.title)}</span></span><span class="s-r">${done}/${L.length}</span></a></li>
        <li><a href="#practice"><span class="step-n">2</span><span><span class="s-t">Practice questions</span><br><span class="s-d">By topic, with instant explanations</span></span><span class="s-r">${answered}/${Qs.length}</span></a></li>
        <li><a href="#vocab"><span class="step-n">3</span><span><span class="s-t">Vocabulary</span><br><span class="s-d">Definitions, sentences, flashcards, quiz</span></span><span class="s-r">${known}/${words.length}</span></a></li>
      </ul>
      <div class="bar" aria-label="Lessons completed"><i style="width:${L.length ? Math.round(100 * done / L.length) : 0}%"></i></div>
    </div>
    <div class="card mode test">
      <p class="eyebrow">Test mode</p>
      <h2>Timed sections under exam rules</h2>
      <p class="small">Official timings, no hints until the end.${ex === 'gre' ? ' Mark, Review and the on-screen calculator work as on test day.' : ' Word limits and spelling are marked as an examiner would.'}</p>
      <ul class="steps">${tdefs.slice(0, 4).map(t => `<li><a href="#tests" data-act="starttest" data-test="${t.id}"><span class="step-n">${ico('test')}</span><span><span class="s-t">${esc(t.short || t.title)}</span><br><span class="s-d">${t.meta.slice(0, 2).join(' · ')}</span></span><span class="s-r">${ico('arrow')}</span></a></li>`).join('')}</ul>
    </div>
  </div>

  <div class="sec-title"><h2>Your progress</h2><a class="small" href="#review">Review mistakes</a></div>
  <div class="stats">
    <div class="card stat"><b>${done}<span class="small"> / ${L.length}</span></b><span>lessons read</span></div>
    <div class="card stat"><b>${answered}</b><span>questions answered</span></div>
    <div class="card stat"><b>${acc == null ? '—' : acc + '%'}</b><span>accuracy</span></div>
    <div class="card stat"><b>${known}</b><span>words known</span></div>
  </div>
  <footer class="site-foot"><span><b>Brittanto</b> · GRE &amp; IELTS Prep</span>${socialHTML()}<span>Created by Atikur Rahman · <span style="user-select:all">atikurrahman7150@gmail.com</span></span></footer>`;
}

/* ================= GUIDES ================= */
function officialView(){
  return `<div class="page-head"><p class="eyebrow">Step 1 · Official guide</p><h1>${S.exam === 'gre' ? 'The GRE General Test' : 'The IELTS test'}</h1>
  <p>${S.exam === 'gre' ? 'From ETS: test structure, question types, scoring and on-screen calculator rules.' : 'From the IELTS partners (British Council, IDP): both test types, all four skills, marking rules and band scores.'}</p></div>
  <article class="prose">${GUIDES[S.exam].official}</article>
  <div class="lesson-foot" style="margin-top:28px"><span class="small">Next: how to use these rules to score higher.</span><a class="btn" href="#strategy">Strategy &amp; tricks ${ico('arrow')}</a></div>`;
}
function strategyView(){
  return `<div class="page-head"><p class="eyebrow">Step 2 · Strategy &amp; tricks</p><h1>How to do better on the ${S.exam === 'gre' ? 'GRE' : 'IELTS'}</h1></div>
  <article class="prose">${GUIDES[S.exam].strategy}</article>
  <div class="lesson-foot" style="margin-top:28px"><span class="small">Next: learn each topic in depth.</span><a class="btn" href="#learn">Open the learning track ${ico('arrow')}</a></div>`;
}

/* ================= LEARN ================= */
function learnView(){
  const tm = {}; topicMistakes().forEach(t => tm[t.topic] = t.ids.length);
  let n = 0;
  return `<div class="page-head"><p class="eyebrow">Learning track</p><h1>Lessons</h1>
  <p>${S.exam === 'gre' ? 'Start with the official ETS material: the complete Math Review (every section, with its exercises and answers), the Mathematical Conventions and the official sample questions. Then use the fast-method lessons to learn the quickest way to solve each question type.' : 'Work through them in order. Each lesson explains the concept, the fastest method, a worked example and the traps to avoid, then links to practice questions.'}</p></div>` +
  SECTIONS[S.exam].map(sec => {
    const ls = LESSONS.filter(l => l.exam === S.exam && l.sec === sec.id);
    if (!ls.length) return '';
    const d = ls.filter(l => S.lessons[l.id]).length;
    return `<div class="sec-title"><h2>${sec.name}</h2><span class="small">${d}/${ls.length} read</span></div>
    <div class="lesson-list">${ls.map(l => { n++; const qn = topicQs(l.id).length; return `<a class="lrow" href="#lesson-${l.id}">
      <span class="tick ${S.lessons[l.id] ? 'done' : ''}">${S.lessons[l.id] ? '✓' : n}</span>
      <span class="t">${esc(l.title)}</span><span class="d">${esc(l.summary)}</span>
      <span class="m"><span>${l.official ? (l.pages.length + (l.answers ? l.answers.length : 0)) + ' official pages' : l.mins + ' min'}${qn ? ' · ' + qn + ' Qs' : ''}</span>${tm[l.id] ? `<span class="flag">${tm[l.id]} to review</span>` : ''}</span></a>`; }).join('')}</div>`;
  }).join('');
}
const DOCS = {mr:'ETS GRE Math Review', mc:'ETS Mathematical Conventions', sq:'ETS GRE Sample Questions'};
const ETS_LOADING = {};
function etsChunk(doc, n){ return doc === 'mr' ? 'mr-' + (Math.floor((n - 1) / 50) + 1) : doc; }
function loadEts(name){
  if (ETS_LOADING[name]) return ETS_LOADING[name];
  ETS_LOADING[name] = new Promise((res, rej) => { const sc = document.createElement('script'); sc.src = 'etsg/' + name + '.js'; sc.onload = res; sc.onerror = () => { delete ETS_LOADING[name]; rej(); }; document.head.appendChild(sc); });
  return ETS_LOADING[name];
}
function pageImgs(l, list){
  const need = {};
  const html = list.map(n => { const key = l.doc + '-' + String(n).padStart(3, '0'); const src = window.ETS_IMG && ETS_IMG[key];
    if (!src) need[etsChunk(l.doc, n)] = 1;
    return `<figure class="page">${src ? `<img src="${src}" alt="${DOCS[l.doc]}, page ${n}">` : `<div class="qimg loading" style="aspect-ratio:1000/1294;border:0"><span class="small">Loading page ${n}…</span></div>`}<figcaption>${DOCS[l.doc]} · page ${n}</figcaption></figure>`; }).join('');
  const ks = Object.keys(need);
  if (ks.length) Promise.all(ks.map(loadEts)).then(() => { if (route.indexOf('lesson-') === 0) paint(); }).catch(() => {});
  return html;
}
function officialLessonView(l, prev, next, sec){
  const id = l.id;
  const rel = Object.keys(ETS_LINKS).filter(k => ETS_LINKS[k].includes(id) && LBY[k]);
  return `<a class="crumb" href="#learn">${ico('back')} All lessons</a>
  <div class="page-head" style="margin-top:12px"><p class="eyebrow">${sec ? sec.name : ''}</p><h1>${esc(l.title)}</h1><p>${esc(l.summary)}</p>
  <div class="lesson-meta"><span class="chip">Official ${DOCS[l.doc]}</span><span class="chip">${l.pages.length} pages</span>${S.lessons[id] ? `<span class="chip" style="color:var(--ok)">${ico('check')} Learned</span>` : ''}</div></div>
  <div class="lesson-body">
    <div class="row"><button class="btn small plain" data-act="zoom">${document.body.classList.contains('zoom') ? 'Fit pages to screen' : 'Enlarge pages'}</button>${rel.length ? `<span class="small">Fast method for this topic: ${rel.map(k => `<a href="#lesson-${k}">${esc(LBY[k].title)}</a>`).join(', ')}</span>` : ''}</div>
    <div class="pages">${pageImgs(l, l.pages)}</div>
    ${l.answers ? `<section class="box ex"><h3>Official answers</h3><p class="small">Work through every exercise first, then check.</p><div id="ans-pages" hidden><div class="pages">${pageImgs(l, l.answers)}</div></div><button class="btn small" data-act="showans">Show the answers</button></section>` : ''}
    <div class="lesson-foot">
      <div class="row"><button class="btn ${S.lessons[id] ? 'plain' : ''}" data-act="learned" data-id="${id}">${S.lessons[id] ? 'Marked as learned' : 'Mark as learned'}</button>
      ${rel.length && topicQs(rel[0]).length ? `<button class="btn ghost" data-act="similar" data-topic="${rel[0]}">Practise this topic (${topicQs(rel[0]).length})</button>` : ''}</div>
      <div class="row">${prev ? `<a class="btn small plain" href="#lesson-${prev.id}">${ico('back')} Previous</a>` : ''}${next ? `<a class="btn small plain" href="#lesson-${next.id}">Next lesson ${ico('arrow')}</a>` : ''}</div>
    </div>
  </div>`;
}
function lessonView(id){
  const l = LBY[id];
  const list = examLessons(); const i = list.indexOf(l);
  const prev = list[i - 1], next = list[i + 1];
  const qn = topicQs(id).length;
  const sec = SECTIONS[l.exam].find(s => s.id === l.sec);
  const tmis = (topicMistakes().find(t => t.topic === id) || {ids:[]}).ids.length;
  if (l.official) return officialLessonView(l, prev, next, sec);
  const off = (window.ETS_LINKS && ETS_LINKS[id] || []).filter(x => LBY[x]);
  return `<a class="crumb" href="#learn">${ico('back')} All lessons</a>
  <div class="page-head" style="margin-top:12px"><p class="eyebrow">${sec ? sec.name : ''}</p><h1>${esc(l.title)}</h1>
  <div class="lesson-meta"><span class="chip">${l.mins} min read</span>${qn ? `<span class="chip">${qn} practice questions</span>` : ''}${S.lessons[id] ? `<span class="chip" style="color:var(--ok)">${ico('check')} Learned</span>` : ''}${tmis ? `<span class="chip flag">${tmis} missed — read again</span>` : ''}</div></div>
  <div class="lesson-body">
    <article class="prose">${l.body}</article>
    <section class="box fast"><h3>${ico('bulb')} Fastest method</h3><ul>${l.fast.map(f => `<li>${f}</li>`).join('')}</ul></section>
    <section class="box ex"><h3>Worked example</h3><div class="ex-q">${l.example.q}</div>
      <div id="exsol" hidden><p>${l.example.a}</p></div>
      <button class="btn small plain" data-act="showsol">Show the solution</button></section>
    <section class="box trap"><h3>${ico('flag')} Common traps</h3><ul>${l.traps.map(t => `<li>${t}</li>`).join('')}</ul></section>
    ${off.length ? `<section class="box ex"><h3>${ico('guide')} Full official explanation</h3><p class="small" style="margin-bottom:8px">Read the complete ETS treatment of this topic:</p><div class="row">${off.map(x => `<a class="btn small plain" href="#lesson-${x}">${esc(LBY[x].title)}</a>`).join('')}</div></section>` : ''}
    <div class="lesson-foot">
      <div class="row">
        <button class="btn ${S.lessons[id] ? 'plain' : ''}" data-act="learned" data-id="${id}">${S.lessons[id] ? 'Marked as learned' : 'Mark as learned'}</button>
        ${qn ? `<button class="btn ghost" data-act="similar" data-topic="${id}">Practise this topic (${qn})</button>` : ''}
      </div>
      <div class="row">${prev ? `<a class="btn small plain" href="#lesson-${prev.id}">${ico('back')} Previous</a>` : ''}${next ? `<a class="btn small plain" href="#lesson-${next.id}">Next lesson ${ico('arrow')}</a>` : ''}</div>
    </div>
  </div>`;
}

/* ================= QUESTION RENDERING ================= */
function optLabels(q){
  if (q.type === 'qc') return QC_OPTS;
  if (q.type === 'tfng') return TF;
  if (q.type === 'ynng') return YN;
  return q.options;
}
function passageHTML(pid, q, o){
  const p = PASSAGES[pid]; let k = 0;
  const sip = q && q.type === 'sip' && !o.locked;
  const sipReveal = q && q.type === 'sip' && o.reveal;
  return `<div class="passage ${sip ? 'sip' : ''}">` + p.paras.map((para, pi) => {
    const hl = q && q.para === pi;
    return `<p class="${hl ? 'hl' : ''}">${p.labels ? `<span class="pl">${'ABCDEFG'[pi]}</span>` : ''}` + para.map(s => {
      const idx = k++;
      let cls = 'sent';
      if (q && q.type === 'sip'){
        if (sipReveal){ if (idx === q.answer) cls += ' ok'; else if (o.ans === idx) cls += ' bad'; }
        else if (o.ans === idx) cls += ' sel';
      }
      const attrs = sip ? ` data-act="sip" data-s="${idx}" role="button" tabindex="0"` : '';
      return `<span class="${cls}"${attrs}>${s}</span>`;
    }).join(' ') + `</p>`;
  }).join('') + `</div>`;
}
function stimHTML(q, o){
  if (q.passage){
    const p = PASSAGES[q.passage];
    return `<div class="stim"><h3>${p.title === 'Passage' ? 'Passage' : 'Reading passage: ' + esc(p.title)}</h3>${passageHTML(q.passage, q, o)}</div>`;
  }
  if (q.set){
    const st = SETS[q.set];
    if (st.cam) return camStim(st, o);
    if (st.listen) return `<div class="stim"><h3>${esc(st.title)}</h3>${listenHTML(q.set, o)}</div>`;
    return `<div class="stim"><h3>${esc(st.title)}</h3>${st.html}<p class="small" style="margin-top:8px">Questions in this set refer to this table.</p></div>`;
  }
  return '';
}
function listenHTML(setId, o){
  const st = SETS[setId];
  const once = o.mode === 'test';
  const played = once && T && T.played;
  const showT = o.reveal || o.mode === 'review';
  const supported = 'speechSynthesis' in window;
  return `<div class="listen">
    <button class="btn small" data-act="listen" data-set="${setId}" ${played ? 'disabled' : ''}>${ico('play')} ${played ? 'Recording played' : (once ? 'Play recording (once only)' : 'Play recording')}</button>
    ${!once && supported ? `<button class="btn small plain" data-act="stoplisten">Stop</button>` : ''}
    ${!supported ? `<span class="small">Audio isn't available in this browser. ${once ? 'The transcript appears with your results.' : ''}</span>` : `<span class="small">The audio is read by your device's voice.</span>`}
  </div>
  <p class="small" style="margin-top:8px">${st.notes}</p>
  ${(showT || (!supported && !once)) ? `<details class="transcript" ${showT ? 'open' : ''}><summary class="small">Transcript</summary>${st.lines.map(l => `<div><b>${l[0]}</b>${esc(l[1])}</div>`).join('')}</details>` : ''}`;
}
/* o: {ans, locked, reveal, mode} */
function kmfImg(q){
  const r = q.kmf;
  const src = window.KMF_IMG && KMF_IMG[r.s] && KMF_IMG[r.s][r.k - 1];
  if (!src){ loadKmf(r.s).then(() => { if (curQuestion() && curQuestion().id === q.id || route === 'test') paint(); else $$('[data-kmf="' + q.id + '"]').forEach(el => { el.outerHTML = kmfImg(q); }); }).catch(() => {}); return `<div class="qimg loading" data-kmf="${q.id}" style="aspect-ratio:${r.w || 1100}/${r.h}"><span class="small">Loading question…</span></div>`; }
  return `<div class="qimg" data-kmf="${q.id}"><img src="${src}" alt="KMF section ${r.s}, question ${r.k}"></div>`;
}
function kmfQuestionHTML(q, o){
  const a = o.ans; let body = '';
  const hint = {qc:'Choose the answer for this Quantitative Comparison.', mc:'Choices are lettered from the top: A is the first choice on the screen, B the second, and so on (left to right, then down, when choices sit side by side).', multi:'Select every correct choice. Choices are lettered from the top: A is the first choice on the screen.', numeric:q.frac ? 'Enter the fraction.' : 'Enter a number (an integer, decimal or fraction such as 3/4).'}[q.type];
  if (q.type === 'qc'){
    body = `<div class="opts" role="radiogroup">` + QC_OPTS.map((t, i) => { let cls = 'opt'; if (o.reveal && !q.nokey){ if (i === q.answer) cls += ' ok'; else if (a === i) cls += ' bad'; } else if (a === i) cls += ' sel';
      return `<button type="button" class="${cls}" data-act="pick" data-i="${i}" ${o.locked ? 'disabled' : ''} role="radio" aria-checked="${a === i}"><span class="k">${LETTERS[i]}</span><span>${t}</span></button>`; }).join('') + `</div>`;
  } else if (q.type === 'mc' || q.type === 'multi'){
    const multi = q.type === 'multi'; const sel = multi ? (Array.isArray(a) ? a : []) : [a];
    body = `<div class="lgrid">` + q.options.map((t, i) => { const on = sel.includes(i); const right = multi ? q.answer.includes(i) : q.answer === i; let cls = 'lopt' + (multi ? ' sq' : '');
      if (o.reveal){ if (right) cls += ' ok'; else if (on) cls += ' bad'; } else if (on) cls += ' sel';
      return `<button type="button" class="${cls}" data-act="pick" data-i="${i}" ${o.locked ? 'disabled' : ''} aria-pressed="${on}" aria-label="Choice ${t}">${t}</button>`; }).join('') + `</div>`;
  } else {
    if (q.frac){ const v = a || {}; body = `<div class="numin"><span class="frac"><input id="fn-${q.id}" inputmode="numeric" data-in="fn" aria-label="Numerator" value="${esc(v.n || '')}" ${o.locked ? 'disabled' : ''}><hr><input id="fd-${q.id}" inputmode="numeric" data-in="fd" aria-label="Denominator" value="${esc(v.d || '')}" ${o.locked ? 'disabled' : ''}></span></div>`; }
    else body = `<div class="numin"><input id="ni-${q.id}" inputmode="decimal" autocomplete="off" data-in="num" aria-label="Your answer" value="${esc(a == null ? '' : a)}" ${o.locked ? 'disabled' : ''}></div>`;
  }
  return `<div class="qcard"><div class="qtype"><span>${TYPE_LABEL[q.type]}</span><span class="chip">${esc(q.stem)}</span>${q.nokey ? '<span class="flag">No answer key</span>' : ''}<button type="button" class="btn small plain" data-act="zoom" style="margin-left:auto">${document.body.classList.contains('zoom') ? 'Fit' : 'Enlarge'}</button></div>${kmfImg(q)}<p class="hint" style="margin-top:12px">${hint}</p>${body}</div>`;
}
function questionHTML(q, o){
  const a = o.ans;
  const L = optLabels(q);
  let body = '';
  const typeLbl = q.tc ? 'Text Completion — one blank' : TYPE_LABEL[q.type];
  let stem = `<div class="qstem${q.tc ? ' read' : ''}">${q.tc && a != null ? q.stem.replace(/<span class="blank">\(i\)<\/span>/, `<span class="blank">${q.options[a]}</span>`) : (q.stem || '')}</div>`;
  if (q.img) return kmfQuestionHTML(q, o);
  if (q.type === 'qc'){
    stem = (q.stem ? `<div class="qstem" style="text-align:center">${q.stem}</div>` : '') + `<div class="qc"><div><small>Quantity A</small><span class="qv">${q.qa}</span></div><div><small>Quantity B</small><span class="qv">${q.qb}</span></div></div>`;
  }
  if (['mc','qc','tfng','ynng'].includes(q.type)){
    body = `<div class="opts" role="radiogroup">` + L.map((t, i) => {
      let cls = 'opt';
      if (o.reveal){ if (i === q.answer) cls += ' ok'; else if (a === i) cls += ' bad'; }
      else if (a === i) cls += ' sel';
      return `<button type="button" class="${cls}" data-act="pick" data-i="${i}" ${o.locked ? 'disabled' : ''} role="radio" aria-checked="${a === i}"><span class="k">${LETTERS[i]}</span><span>${t}</span></button>`;
    }).join('') + `</div>`;
  } else if (q.type === 'multi' || q.type === 'se'){
    const sel = Array.isArray(a) ? a : [];
    body = `<p class="hint" style="margin-top:12px">${q.type === 'se' ? 'Select exactly two answer choices.' : 'Select all that apply. Credit only if every correct choice and no wrong one is selected.'}</p><div class="opts">` + q.options.map((t, i) => {
      let cls = 'opt sq'; const on = sel.includes(i), right = q.answer.includes(i);
      if (o.reveal){ if (right) cls += ' ok'; else if (on) cls += ' bad'; }
      else if (on) cls += ' sel';
      return `<button type="button" class="${cls}" data-act="pick" data-i="${i}" ${o.locked ? 'disabled' : ''} role="checkbox" aria-checked="${on}"><span class="k">${o.reveal && right ? '✓' : (on ? '✓' : LETTERS[i])}</span><span>${t}</span></button>`;
    }).join('') + `</div>`;
  } else if (q.type === 'tc'){
    const arr = Array.isArray(a) ? a : [];
    stem = `<div class="qstem read">${q.stem.replace(/<span class="blank">\((i+)\)<\/span>/g, (m, r) => { const bi = r.length - 1; const ch = arr[bi]; return `<span class="blank">${ch != null ? esc(q.blanks[bi].options[ch]) : ROMAN[bi]}</span>`; })}</div>`;
    body = `<div class="tcgrid">` + q.blanks.map((b, bi) => `<div class="tccol"><h4>Blank ${ROMAN[bi]}</h4><div class="opts">` + b.options.map((t, i) => {
      let cls = 'opt';
      if (o.reveal){ if (i === b.answer) cls += ' ok'; else if (arr[bi] === i) cls += ' bad'; }
      else if (arr[bi] === i) cls += ' sel';
      return `<button type="button" class="${cls}" data-act="tcpick" data-b="${bi}" data-i="${i}" ${o.locked ? 'disabled' : ''}><span>${t}</span></button>`;
    }).join('') + `</div></div>`).join('') + `</div>`;
  } else if (q.type === 'numeric'){
    if (q.frac){
      const v = a || {};
      body = `<div class="numin"><span class="frac"><input id="fn-${q.id}" inputmode="numeric" data-in="fn" aria-label="Numerator" value="${esc(v.n || '')}" ${o.locked ? 'disabled' : ''}><hr><input id="fd-${q.id}" inputmode="numeric" data-in="fd" aria-label="Denominator" value="${esc(v.d || '')}" ${o.locked ? 'disabled' : ''}></span></div>`;
    } else {
      body = `<div class="numin">${q.prefix || ''}<input id="ni-${q.id}" inputmode="decimal" autocomplete="off" data-in="num" aria-label="Your answer" value="${esc(a == null ? '' : a)}" ${o.locked ? 'disabled' : ''}>${q.suffix ? `<span>${q.suffix}</span>` : ''}</div>`;
    }
  } else if (q.type === 'gap'){
    body = `<div class="gapin"><span class="limit">Write ${q.limitText}</span><input id="gi-${q.id}" data-in="gap" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer" value="${esc(a == null ? '' : a)}" ${o.locked ? 'disabled' : ''}></div>`;
  } else if (q.type === 'sip'){
    body = `<p class="hint" style="margin-top:12px">${o.locked ? '' : 'Click a sentence in the passage.'} ${a != null ? `Selected: sentence ${a + 1}.` : ''}</p>`;
  }
  return `<div class="qcard"><div class="qtype"><span>${typeLbl}</span>${o.extra || ''}</div>${stem}${body}</div>`;
}

/* ---------------- grading ---------------- */
const sameSet = (a, b) => Array.isArray(a) && a.length === b.length && b.every(x => a.includes(x));
function parseNum(s){ s = String(s == null ? '' : s).replace(/,/g, '').replace(/%$/, '').replace(/\u2212|\u2013/g, '-').trim(); const fr = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/); if (fr) return parseFloat(fr[2]) ? parseFloat(fr[1]) / parseFloat(fr[2]) : NaN; if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return NaN; return parseFloat(s); }
function numVal(q, a){ if (q.frac){ if (!a) return NaN; const n = parseNum(a.n), d = parseNum(a.d); return d ? n / d : NaN; } return parseNum(a); }
function answered(q, a){
  switch (q.type){
    case 'multi': return Array.isArray(a) && a.length > 0;
    case 'se': return Array.isArray(a) && a.length > 0;
    case 'tc': return Array.isArray(a) && q.blanks.every((b, i) => a[i] != null);
    case 'numeric': return q.frac ? !!(a && String(a.n || '').trim() && String(a.d || '').trim()) : a != null && String(a).trim() !== '';
    case 'gap': return a != null && String(a).trim() !== '';
    default: return a != null;
  }
}
function norm(s){ return String(s).toLowerCase().replace(/[£$€]/g, '').replace(/[“”"'.,;:!?()]/g, '').replace(/-/g, ' ').replace(/\s+/g, ' ').trim(); }
function lev(a, b){ const m = a.length, n = b.length; const d = Array.from({length:m + 1}, (_, i) => [i].concat(Array(n).fill(0))); for (let j = 1; j <= n; j++) d[0][j] = j; for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1)); return d[m][n]; }
function gapCheck(q, a){
  const raw = String(a || '').trim();
  if (!raw) return {ok:false, reason:'blank'};
  const toks = raw.replace(/[£$€]/g, '').split(/\s+/).filter(Boolean);
  const nums = toks.filter(t => /^\d[\d,.:/]*(st|nd|rd|th)?$/i.test(t)).length;
  const words = toks.length - nums;
  const allowNum = /NUMBER/.test(q.limitText);
  if (words > q.limit || (!allowNum && nums + words > q.limit) || (allowNum && nums > 1)) return {ok:false, reason:'over', words:toks.length};
  const n = norm(raw);
  if (q.answer.some(x => norm(x) === n || norm(x).replace(/\s/g, '') === n.replace(/\s/g, ''))) return {ok:true};
  if (q.answer.some(x => /[a-z]{4,}/.test(x) && lev(norm(x), n) <= (norm(x).length >= 9 ? 2 : 1))) return {ok:false, reason:'spelling'};
  return {ok:false, reason:'wrong'};
}
function grade(q, a){
  if (q.nokey) return false;
  if (!answered(q, a)) return false;
  switch (q.type){
    case 'multi': case 'se': return sameSet(a, q.answer);
    case 'tc': return q.blanks.every((b, i) => a[i] === b.answer);
    case 'numeric': { const v = numVal(q, a); const t = q.frac ? q.answer[0] / q.answer[1] : q.answer; return Math.abs(v - t) < (q.img ? Math.max(1e-6, Math.abs(t) * 1e-6) : 1e-9); }
    case 'gap': return gapCheck(q, a).ok;
    default: return a === q.answer;
  }
}
const ORD = ['first','second','third','fourth','fifth','sixth','seventh','eighth'];
function correctText(q){
  if (q.img && (q.type === 'mc' || q.type === 'multi')){ const arr = q.type === 'mc' ? [q.answer] : q.answer; return arr.map(i => `<b>${LETTERS[i]}</b> <span class="small">(the ${ORD[i]} choice on the screen)</span>`).join('<br>'); }
  if (q.img && q.type === 'numeric' && !q.frac) return `<b>${+q.answer.toFixed(6)}</b>`;
  switch (q.type){
    case 'multi': case 'se': return q.answer.map(i => `<b>${LETTERS[i]}</b> ${q.options[i]}`).join('<br>');
    case 'tc': return q.blanks.map((b, i) => `Blank ${ROMAN[i]}: <b>${b.options[b.answer]}</b>`).join('<br>');
    case 'numeric': return q.frac ? `<b>${q.answer[0]}/${q.answer[1]}</b> (any equivalent fraction, such as ${q.answer[0] * 6}/${q.answer[1] * 6}, is accepted)` : `<b>${q.prefix || ''}${q.answer}${q.suffix || ''}</b>`;
    case 'gap': return `<b>${esc(q.answer[0])}</b>${q.answer.length > 1 ? ` <span class="small">(also accepted: ${q.answer.slice(1).map(esc).join(', ')})</span>` : ''}`;
    case 'sip': { const s = flatSentences(q.passage)[q.answer]; return `Sentence ${q.answer + 1}: <i>“${s}”</i>`; }
    default: { const L = optLabels(q); return `<b>${LETTERS[q.answer]}</b> ${L[q.answer]}`; }
  }
}
function flatSentences(pid){ return PASSAGES[pid].paras.reduce((x, p) => x.concat(p), []); }
function kmfWhy(q, a){
  if (q.type === 'qc'){
    const c = q.answer, L = ['Quantity A is greater','Quantity B is greater','the quantities are equal','the relationship cannot be determined'];
    let m;
    if (c === 3) m = 'The relationship is not fixed: some values allowed by the conditions make one quantity larger and other values do not. Before choosing a fixed relationship, test values from different families (0, negatives, fractions, large numbers).';
    else if (a === 3) m = `The relationship is fixed: every value the conditions allow gives the same result (${L[c]}). Choose (D) only when two allowed cases disagree.`;
    else if (c === 2) m = 'The two quantities are exactly equal once both are simplified, so neither side is larger.';
    else if (a === 2) m = `They are not equal: ${L[c]} for every allowed value.`;
    else m = 'You have the comparison reversed. Simplify both sides with the same safe steps and check which side is larger.';
    return `<p>You chose <b>${LETTERS[a]}</b> (${L[a]}). ${m}</p>`;
  }
  if (q.type === 'mc') return `<p>You chose <b>${q.options[a]}</b> (the ${ORD[a]} choice). It doesn't give the value or condition the question asks for. Follow the solution note below and compare it with your working to find the step where they part.</p>`;
  if (q.type === 'multi'){
    const out = [];
    q.options.forEach((t, i) => { const on = a.includes(i), right = q.answer.includes(i);
      if (on && !right) out.push(`<li><span class="mini-bad">You selected ${t}.</span> This choice fails the condition in the question; test it against the conditions directly.</li>`);
      if (!on && right) out.push(`<li><span class="mini-bad">You missed ${t}.</span> This choice also satisfies the conditions; check the extreme or less obvious cases.</li>`); });
    return `<p>Select-all questions give credit only when every correct choice and no wrong one is selected.</p><ul>${out.join('')}</ul>`;
  }
  return null;
}
function wrongWhy(q, a){
  if (!answered(q, a)) return '<p>No answer was given. On both exams a blank scores nothing, so always enter your best guess.</p>';
  if (q.img){ const w = kmfWhy(q, a); if (w) return w; }
  switch (q.type){
    case 'multi': case 'se': {
      const out = [];
      if (q.type === 'se' && a.length !== 2) out.push(`<li>Sentence Equivalence needs exactly two choices; you selected ${a.length}.</li>`);
      q.options.forEach((t, i) => {
        const on = a.includes(i), right = q.answer.includes(i);
        if (on && !right) out.push(`<li><span class="mini-bad">You selected “${t}”.</span> ${q.why[i]}</li>`);
        if (!on && right) out.push(`<li><span class="mini-bad">You missed “${t}”.</span> ${q.why[i] || 'This choice is also correct.'}</li>`);
      });
      return `<ul>${out.join('')}</ul>`;
    }
    case 'tc': return `<ul>${q.blanks.map((b, i) => a[i] !== b.answer ? `<li>Blank ${ROMAN[i]}: you chose <b>${b.options[a[i]]}</b>. ${b.why[a[i]]}</li>` : `<li>Blank ${ROMAN[i]}: <span class="mini-ok">correct</span>. But every blank must be right to earn the point.</li>`).join('')}</ul>`;
    case 'numeric': {
      const v = numVal(q, a);
      if (isNaN(v)) return '<p>That isn\'t a valid number. Use digits, one decimal point, and a minus sign if needed.</p>';
      const e = (q.errors || []).find(x => Math.abs(x.v - v) < Math.max(0.006, Math.abs(x.v) * 0.002));
      return `<p>You entered <b>${esc(q.frac ? a.n + '/' + a.d : a)}</b>. ${e ? e.why : 'That value doesn\'t match. Compare your working with the steps below to find where it went wrong.'}</p>`;
    }
    case 'gap': {
      const g = gapCheck(q, a);
      const msg = {over:`Your answer has ${g.words} words, which is over the limit (${q.limitText}). Answers over the limit are marked wrong even if the idea is right.`, spelling:'Very close, but misspelled. IELTS marks misspelled answers wrong.', wrong:'That isn\'t what the ' + (q.set ? 'speaker confirms' : 'text says') + '.'}[g.reason] || '';
      return `<p>You wrote <b>${esc(a)}</b>. ${msg}</p>`;
    }
    case 'sip': return `<p>You chose sentence ${a + 1}. ${q.why[a]}</p>`;
    default: { const L = optLabels(q); return `<p>You chose <b>${LETTERS[a]}</b> ${L[a]}. ${q.why[a]}</p>`; }
  }
}
function fbHTML(q, a, ok, ctx){
  const L = LBY[q.topic];
  const lessonLink = L ? `<a href="#lesson-${q.topic}">${esc(L.title)}</a>` : '';
  if (q.nokey) return `<div class="fb" role="status"><div class="fb-h">No answer key</div><div class="fb-b"><div class="fb-s"><p>${q.exp}</p></div></div></div>`;
  if (q.img){
    const off = (ETS_LINKS[q.topic] || []).filter(x => LBY[x]).map(x => `<a href="#lesson-${x}">${esc(LBY[x].title)}</a>`).join(', ');
    q.concept = (L ? esc(L.summary) + ' ' : '') + `Read: ${lessonLink}${off ? ' · Official ETS: ' + off : ''}.`;
    q.fast = L && L.fast ? L.fast[0] : '';
  }
  if (ok){
    return `<div class="fb ok" role="status"><div class="fb-h">${ico('check')} Correct</div><div class="fb-b">
      <div class="fb-s"><h4>${q.img ? 'Solution note (KMF key)' : 'Why it\'s right'}</h4><p>${q.img ? esc(q.exp) : q.exp}</p></div>
      <div class="fb-s"><h4>The concept, once more</h4><p>${q.concept}</p></div>
      ${q.fast ? `<div class="fb-s"><h4>Fastest method</h4><p>${q.fast}</p></div>` : ''}
      ${L ? `<div class="fb-s"><p class="small">Lesson: ${lessonLink}</p></div>` : ''}</div></div>`;
  }
  return `<div class="fb bad" role="status"><div class="fb-h">${ico('x')} ${answered(q, a) ? 'Not quite' : 'Not answered'}</div><div class="fb-b">
    <div class="fb-s"><h4>Correct answer</h4><p>${correctText(q)}</p></div>
    <div class="fb-s"><h4>Why your answer is wrong</h4><div class="fb-why">${wrongWhy(q, a)}</div></div>
    <div class="fb-s"><h4>${q.img ? 'Solution note (KMF key)' : 'How to get the right answer'}</h4><p>${q.img ? esc(q.exp) : q.exp}</p></div>
    ${q.img ? `<div class="fb-s"><h4>The concept to review</h4><p>${q.concept}</p></div>` : ''}
    ${q.fast ? `<div class="fb-s"><h4>Fastest method</h4><p>${q.fast}</p></div>` : ''}
    ${ctx === 'practice' && L ? `<div class="fb-note">${ico('review')}<span>Saved to <a href="#review">Review</a>. Questions like this will be suggested again. Re-read: ${lessonLink}</span></div>` : ''}
  </div></div>`;
}

/* ================= PRACTICE ================= */
let P = null;
function startPractice(ids, title){
  if (!ids.length) return;
  P = {title, ids, i:0, ans:null, checked:false, res:{}};
  if (route === 'practice') render(); else go('practice');
}
function similarIds(topic){
  const ids = topicQs(topic).map(q => q.id);
  const rank = id => (S.mistakes[id] && S.mistakes[id].open) ? 0 : (!S.attempts[id] ? 1 : 2);
  return ids.sort((x, y) => rank(x) - rank(y)).slice(0, 8);
}
function orderForPractice(ids){
  // keep passage / set questions together
  const out = [], seen = {};
  ids.forEach(id => {
    const q = QBY[id]; const g = q.passage || q.set;
    if (!g){ out.push(id); return; }
    if (seen[g]) return; seen[g] = 1;
    ids.filter(x => (QBY[x].passage || QBY[x].set) === g).forEach(x => out.push(x));
  });
  return out;
}
function kmfPicker(mode){
  const nums = Object.keys(KMF_SEC).map(Number).sort((a, b) => a - b);
  return `<div class="card stack" style="gap:12px;margin-bottom:8px"><div><p class="eyebrow">KMF 74 Quant sections</p><h2 style="margin-top:4px">${mode === 'test' ? 'Take any KMF section under exam timing' : 'Practise the KMF sections'}</h2>
  <p class="small" style="margin-top:6px">All ${QUESTIONS.filter(q => q.src === 'kmf').length} questions from your KMF file, in their original order. Odd sections are Medium (12 questions), even sections are Hard (15). ${mode === 'test' ? 'Medium sections run 21 minutes and Hard sections 26, with the calculator, Mark and Review.' : 'Each answer shows the KMF solution note and links to the matching lesson.'}</p></div>
  <div class="kgrid">${nums.map(n => { const ids = KMF_SEC[n]; const done = ids.filter(id => S.attempts[id]).length; const hard = n % 2 === 0;
    return `<button class="kcell ${done === ids.length ? 'full' : done ? 'part' : ''}" data-act="${mode === 'test' ? 'kmftest' : 'kmfprac'}" data-s="${n}" title="Section ${n}, ${hard ? 'Hard' : 'Medium'}, ${done} of ${ids.length} answered"><b>${n}</b><span>${hard ? 'H' : 'M'} · ${done}/${ids.length}</span></button>`; }).join('')}</div></div>`;
}
function practiceView(){
  if (CP) return camPracticeView();
  if (P && !P.done) return practiceQView();
  if (P && P.done) return practiceSummary();
  const tm = topicMistakes();
  const missed = openMistakes().map(m => m.id);
  return `<div class="page-head"><p class="eyebrow">Learning track</p><h1>Practice questions</h1>
  <p>One question at a time. After each answer you'll see the correct answer and a full explanation. If you get it right, the concept is explained again; if not, you'll see exactly why your choice doesn't work.</p></div>
  ${S.exam === 'gre' && window.KMF ? kmfPicker('practice') : ''}${S.exam === 'ielts' ? camPicker('practice') : ''}
  <div class="sec-title"><h2>By topic</h2></div>
  <div class="row">
    <button class="btn" data-act="pmix">Mixed practice (${examQs().length})</button>
    ${missed.length ? `<button class="btn ghost" data-act="pmissed">Retry missed questions (${missed.length})</button>` : ''}
  </div>` +
  SECTIONS[S.exam].map(sec => {
    const ls = LESSONS.filter(l => l.exam === S.exam && l.sec === sec.id && topicQs(l.id).length);
    if (!ls.length) return '';
    const secIds = examQs().filter(q => q.sec === sec.id).map(q => q.id);
    return `<div class="sec-title"><h2>${sec.name}</h2><button class="btn small plain" data-act="psec" data-sec="${sec.id}">All ${secIds.length}</button></div>
    <div class="topic-grid">${ls.map(l => { const ids = topicQs(l.id).map(q => q.id); const acc = accuracy(ids); const mis = (tm.find(t => t.topic === l.id) || {ids:[]}).ids.length;
      return `<div class="trow"><span class="t">${esc(l.title)}</span><span class="d">${ids.length} question${ids.length > 1 ? 's' : ''}${acc != null ? ` · ${acc}% correct so far` : ''}${mis ? ` · <span class="mini-bad">${mis} to review</span>` : ''}</span><button class="btn small" data-act="similar" data-topic="${l.id}">Start</button></div>`; }).join('')}</div>`;
  }).join('');
}
function practiceQView(){
  const q = QBY[P.ids[P.i]];
  const ok = P.checked ? grade(q, P.ans) : null;
  const o = {ans:P.ans, locked:P.checked, reveal:P.checked, mode:'practice'};
  const stim = stimHTML(q, o);
  const calcBtn = isQuant(q) ? `<button class="btn small plain" data-act="calc">${ico('calc')} Calculator</button>` : '';
  const pct = Math.round(100 * (P.i + (P.checked ? 1 : 0)) / P.ids.length);
  return `<div class="qhead"><div class="qprog"><span class="small">${esc(P.title)} · Question ${P.i + 1} of ${P.ids.length}</span><div class="bar"><i style="width:${pct}%"></i></div></div>
    <div class="row">${calcBtn}<button class="btn small plain" data-act="pexit">End practice</button></div></div>
  <div class="qwrap ${stim ? 'split' : ''}">${stim}
    <div class="stack">${questionHTML(q, o)}
      ${P.checked ? fbHTML(q, P.ans, ok, 'practice') : ''}
      <div class="qactions">${P.checked
        ? `<button class="btn" data-act="pnext">${P.i + 1 < P.ids.length ? 'Next question' : 'See summary'} ${ico('arrow')}</button>`
        : `<button class="btn" data-act="pcheck" ${answered(q, P.ans) ? '' : 'disabled'}>Check answer</button><button class="btn plain small" data-act="pskip">Skip</button>`}
      </div>
    </div></div>`;
}
function practiceSummary(){
  const ids = Object.keys(P.res);
  const right = ids.filter(id => P.res[id]).length;
  const wrongTopics = [...new Set(ids.filter(id => !P.res[id]).map(id => QBY[id].topic))];
  return `<div class="page-head"><p class="eyebrow">Practice complete</p><h1>${right} of ${ids.length} correct</h1><p>${esc(P.title)}</p></div>
  ${wrongTopics.length ? `<div class="card review-card"><h3>Read these again</h3><ul class="review-list">${wrongTopics.map(t => `<li><span class="rl-t">${esc(LBY[t].title)}</span><a class="btn small ghost" href="#lesson-${t}">Read lesson</a><button class="btn small" data-act="similar" data-topic="${t}">Practise similar</button></li>`).join('')}</ul></div>` : `<div class="card"><p>Every answer was right. Try a timed test next.</p></div>`}
  <div class="sec-title"><h2>Your answers</h2></div>
  <div class="rlist">${ids.map((id, n) => `<div class="ritem"><div class="rrow"><span class="rs ${P.res[id] ? 'ok' : 'bad'}">${P.res[id] ? '✓' : '✕'}</span><span class="rt">${n + 1}. ${stripTags(QBY[id].stem || QBY[id].qa || '')}</span><a class="small" href="#lesson-${QBY[id].topic}">Lesson</a></div></div>`).join('')}</div>
  <div class="row" style="margin-top:20px"><button class="btn" data-act="pdone">Back to practice</button><a class="btn plain" href="#tests">Try a timed test</a></div>`;
}
function stripTags(s){ const d = document.createElement('div'); d.innerHTML = s; return esc((d.textContent || '').slice(0, 110)); }
function isQuant(q){ return q.exam === 'gre' && q.sec === 'quant'; }

/* ================= TESTS ================= */
const GRE_Q1 = ['gq01','gq02','gq03','gq06','gq09','gq10','gq11','gq18','gq20','gq22','gq24','gq25'];
const GRE_V1 = ['gv01','gv02','gv04','gv06','gv11','gv12','gv13','gv07','gv08','gv09','gv10','gv17'];
const IE_R = ['ir01','ir02','ir03','ir04','ir05','ir06','ir07','ir08','ir09','ir10','ir11','ir12'];
const IE_L = ['il01','il02','il03','il04','il05','il06'];
function testDefs(ex){
  if (ex === 'gre') return [
    {id:'gq1', title:'Quantitative Reasoning — Section 1', short:'Quant section 1', desc:'The average-difficulty first section, with the on-screen calculator.', meta:['12 questions','21 min','Calculator','Mark & Review'], kind:'q', sections:[{name:'Quantitative Reasoning · Section 1', minutes:21, ids:GRE_Q1, calc:true}]},
    {id:'gqf', title:'Quantitative Reasoning — Both sections', short:'Quant, both sections', desc:'Your section 1 score decides how hard section 2 is, as on the real test.', meta:['12 + 15 questions','21 + 26 min','Calculator','Adaptive'], kind:'q', adaptive:true, sections:[{name:'Quantitative Reasoning · Section 1', minutes:21, ids:GRE_Q1, calc:true}]},
    {id:'gv1', title:'Verbal Reasoning — Section 1', short:'Verbal section 1', desc:'Text Completion, Sentence Equivalence and Reading Comprehension.', meta:['12 questions','18 min','Mark & Review'], kind:'q', sections:[{name:'Verbal Reasoning · Section 1', minutes:18, ids:GRE_V1}]},
    {id:'gaw', title:'Analytical Writing — Analyze an Issue', short:'Issue essay', desc:'Plain editor with no spell-check, like the ETS word processor.', meta:['1 task','30 min','No spell-check'], kind:'write', task:'gre_issue'}
  ];
  return [
    {id:'il', title:'Listening — Part 1', short:'Listening Part 1', desc:'A booking conversation. The recording plays once; spelling and word limits are checked.', meta:['6 questions','Played once','8 min'], kind:'q', form:true, sections:[{name:'Listening · Part 1', minutes:8, ids:IE_L, form:true}]},
    {id:'ir', title:'Academic Reading — Passage 1', short:'Reading passage', desc:'Headings, True/False/Not Given, Yes/No/Not Given, completion and multiple choice.', meta:['12 questions','20 min'], kind:'q', sections:[{name:'Academic Reading · Passage 1', minutes:20, ids:IE_R}]},
    {id:'iw1', title:'Writing Task 1 (Academic)', short:'Writing Task 1', desc:'Describe a line graph in at least 150 words.', meta:['1 task','20 min','150+ words'], kind:'write', task:'ielts_t1'},
    {id:'iw2', title:'Writing Task 2', short:'Writing Task 2', desc:'Advantages and disadvantages essay, at least 250 words.', meta:['1 task','40 min','250+ words'], kind:'write', task:'ielts_t2'},
    {id:'isp', title:'Speaking — Parts 2 and 3', short:'Speaking cue card', desc:'Cue card with 1 minute to prepare and up to 2 minutes to talk, then discussion questions.', meta:['1 min prep','2 min talk','Part 3 questions'], kind:'speak', task:'ielts_sp'}
  ];
}
function testsView(){
  const defs = testDefs(S.exam);
  const hist = S.tests.filter(t => t.exam === S.exam).slice(-5).reverse();
  return `<div class="page-head"><p class="eyebrow">Test mode</p><h1>Timed tests</h1>
  <p>${S.exam === 'gre' ? 'Official section lengths and timings. Inside a section you can move back and forth, Mark questions and use Review. Explanations appear only after you finish.' : 'Official timing and marking rules: recordings play once, word limits and spelling are enforced, and writing has a live word count.'}</p></div>
  ${S.exam === 'gre' && window.KMF ? kmfPicker('test') + '<div class="sec-title"><h2>Official-format sections</h2></div>' : ''}${S.exam === 'ielts' && window.CAM ? camPicker('test') + '<div class="sec-title"><h2>Practice tests</h2></div>' : ''}
  <div class="testlist">${defs.map(t => `<div class="card tcard"><h3>${esc(t.title)}</h3><p class="small">${t.desc}</p><div class="meta">${t.meta.map(m => `<span class="chip">${m}</span>`).join('')}</div><button class="btn" data-act="starttest" data-test="${t.id}">Start ${ico('arrow')}</button></div>`).join('')}</div>
  ${hist.length ? `<div class="sec-title"><h2>Recent results</h2></div><div class="rlist">${hist.map(h => `<div class="ritem"><div class="rrow"><span class="rt">${esc(h.title)}</span><span class="small tnum">${h.score} · ${new Date(h.date).toLocaleDateString()}</span></div></div>`).join('')}</div>` : ''}`;
}

let T = null, timerId = null;
function kmfDef(n){
  const ids = KMF_SEC[n]; const hard = n % 2 === 0;
  return {id:'kmf' + n, title:'KMF Quant Section ' + n + ' (' + (hard ? 'Hard' : 'Medium') + ')', meta:[], kind:'q', sections:[{name:'KMF Section ' + n + ' · ' + (hard ? 'Hard' : 'Medium'), minutes: ids.length >= 16 ? 28 : hard ? 26 : 21, ids, calc:true}]};
}
function startTest(id){
  const def = id.indexOf('kmf') === 0 ? kmfDef(+id.slice(3)) : testDefs(S.exam).find(t => t.id === id);
  if (!def) return;
  stopTimer(); P = null;
  if (def.kind === 'q'){
    T = {kind:'q', def, exam:S.exam, title:def.title, sections:def.sections.map(s => Object.assign({}, s)), si:0, qi:0, answers:{}, marked:{}, mode:'q', hide:false, played:false};
    T.left = T.sections[0].minutes * 60;
  } else if (def.kind === 'write'){
    const task = TASKS[def.task];
    T = {kind:'write', def, exam:S.exam, title:def.title, task:def.task, text:(S.drafts[def.task] || ''), left:task.minutes * 60, mode:'write', hist:[], fut:[], hide:false};
  } else {
    T = {kind:'speak', def, exam:S.exam, title:def.title, task:def.task, stage:'card', left:0, notes:''};
  }
  T.started = Date.now();
  go('test');
  if (T.kind !== 'speak') startTimer();
}
function startTimer(){
  stopTimer();
  timerId = setInterval(() => {
    if (!T) return stopTimer();
    if (T.kind === 'q' && T.mode !== 'q' && T.mode !== 'review') return;
    if (T.kind === 'write' && T.mode !== 'write') return;
    if (T.kind === 'speak' && !(T.stage === 'prep' || T.stage === 'talk')) return;
    if (T.kind === 'cam' && T.mode !== 'q') return;
    T.left--;
    const el = $('#timer'); if (el){ el.textContent = T.hide ? 'Time hidden' : fmt(T.left); el.classList.toggle('low', T.left <= 60 && !T.hide); }
    if (T.left <= 0){
      if (T.kind === 'q') endSection();
      else if (T.kind === 'cam') camEndSection();
      else if (T.kind === 'write') finishWrite();
      else speakNext();
    }
  }, 1000);
}
function stopTimer(){ if (timerId){ clearInterval(timerId); timerId = null; } }
function fmt(s){ s = Math.max(0, s); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
function curSection(){ return T.sections[T.si]; }
function curQ(){ return QBY[curSection().ids[T.qi]]; }
function timerHTML(){ return `<span id="timer" class="timer ${T.left <= 60 && !T.hide ? 'low' : ''}" aria-live="off">${T.hide ? 'Time hidden' : fmt(T.left)}</span><button class="tbtn" data-act="hidetime">${T.hide ? 'Show time' : 'Hide time'}</button>`; }

function testView(){
  if (T.kind === 'cam') return camTestView();
  if (T.kind === 'write') return writeView();
  if (T.kind === 'speak') return speakView();
  if (T.mode === 'results') return resultsView();
  const sec = curSection();
  if (T.mode === 'between'){
    const nx = T.sections[T.si];
    return `<div class="tbar"><span class="tt">${esc(T.title)}</span></div>
    <div class="card stack" style="max-width:620px;margin:30px auto"><p class="eyebrow">Section complete</p><h2>Next: ${esc(nx.name)}</h2>
    <p>${nx.ids.length} questions · ${nx.minutes} minutes.${T.adaptNote ? ' ' + T.adaptNote : ''}</p>
    <p class="small">On the real GRE there is no break between sections, and you cannot return to a finished section.</p>
    <div class="row"><button class="btn" data-act="nextsection">Begin section ${ico('arrow')}</button></div></div>`;
  }
  const head = `<div class="tbar"><span class="tt">${esc(sec.name)}<small>${sec.form ? esc(T.title) : (T.mode === 'review' ? 'Review' : `Question ${T.qi + 1} of ${sec.ids.length}`)}</small></span>
    <span class="tools">${timerHTML()}
      ${sec.calc ? `<button class="tbtn" data-act="calc">${ico('calc')} Calculator</button>` : ''}
      ${!sec.form && T.mode === 'q' ? `<button class="tbtn" data-act="mark" aria-pressed="${!!T.marked[curQ().id]}">${ico('flag')} Mark</button>` : ''}
      ${!sec.form ? `<button class="tbtn" data-act="treview">${ico('grid')} Review</button>` : ''}
      <button class="tbtn" data-act="texit">Exit</button></span></div>`;
  if (T.mode === 'review'){
    return head + `<h2 style="margin-bottom:6px">Review</h2><p class="small" style="margin-bottom:14px">Choose a question to go to it. Marked questions are highlighted.</p>
    <div class="legend" style="margin-bottom:12px"><span><i class="ans"></i>Answered</span><span><i></i>Not answered</span><span><i class="mk"></i>Marked</span></div>
    <div class="rgrid">${sec.ids.map((id, n) => { const q = QBY[id]; const an = answered(q, T.answers[id]); return `<button class="rcell ${an ? 'ans' : ''} ${T.marked[id] ? 'mk' : ''} ${n === T.qi ? 'cur' : ''}" data-act="goto" data-n="${n}"><b>${n + 1}</b><span>${an ? 'Answered' : 'Not answered'}${T.marked[id] ? ' · Marked' : ''}</span></button>`; }).join('')}</div>
    <div class="tfoot"><button class="btn plain" data-act="goto" data-n="${T.qi}">${ico('back')} Return to question</button><button class="btn" data-act="endsec">End section</button></div>`;
  }
  if (sec.form){
    const setId = QBY[sec.ids[0]].set;
    return head + `<div class="stack"><div class="stim">${listenHTML(setId, {mode:'test'})}</div>
      <div class="qcard"><div class="qtype">Form completion · ${esc(SETS[setId].title)}</div>
      <div class="formq">${sec.ids.map((id, n) => { const q = QBY[id]; return `<label><span><span class="qn">${n + 1}</span>${esc(q.stem.replace('______', '…'))}</span><input id="fq-${id}" data-in="form" data-q="${id}" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(T.answers[id] || '')}"></label>`; }).join('')}</div></div></div>
      <div class="tfoot"><span class="small">Answers save as you type.</span><button class="btn" data-act="endsec">Finish and see results</button></div>`;
  }
  const q = curQ();
  const o = {ans:T.answers[q.id], locked:false, reveal:false, mode:'test'};
  const stim = stimHTML(q, o);
  const last = T.qi === sec.ids.length - 1;
  return head + `<div class="qwrap ${stim ? 'split' : ''}">${stim}<div>${questionHTML(q, o)}</div></div>
    <div class="tfoot"><button class="btn plain" data-act="tprev" ${T.qi === 0 ? 'disabled' : ''}>${ico('back')} Back</button>
    ${last ? `<button class="btn" data-act="treview">Review section ${ico('grid')}</button>` : `<button class="btn" data-act="tnext">Next ${ico('arrow')}</button>`}</div>`;
}
function endSection(){
  const sec = curSection();
  sec.done = true;
  if (T.def.adaptive && T.si === 0){
    const right = sec.ids.filter(id => grade(QBY[id], T.answers[id])).length;
    const used = new Set(sec.ids);
    let pool = QUESTIONS.filter(q => q.exam === 'gre' && q.sec === 'quant' && !q.src && !used.has(q.id));
    const level = right >= 8 ? 'harder' : right <= 4 ? 'easier' : 'medium';
    if (pool.length > 15){
      const pref = level === 'harder' ? (q => -q.diff) : level === 'easier' ? (q => q.diff) : (q => Math.abs(q.diff - 2));
      pool = pool.sort((a, b) => pref(a) - pref(b)).slice(0, 15);
    }
    const order = {qc:0, mc:1, multi:2, numeric:3};
    pool.sort((a, b) => (a.set ? 9 : order[a.type]) - (b.set ? 9 : order[b.type]));
    T.sections.push({name:'Quantitative Reasoning · Section 2', minutes:26, ids:pool.map(q => q.id), calc:true});
    T.adaptNote = `You answered ${right} of 12 correctly in section 1, so the real test would give you a ${level} second section.` + (QUESTIONS.filter(q => q.exam === 'gre' && q.sec === 'quant' && !q.src).length - 12 <= 15 ? ' (This practice bank currently uses all remaining questions for section 2.)' : '');
  }
  hideCalc();
  if (T.si + 1 < T.sections.length){ T.si++; T.qi = 0; T.left = T.sections[T.si].minutes * 60; T.mode = 'between'; paint(); window.scrollTo(0, 0); return; }
  finishQTest();
}
function finishQTest(){
  stopTimer(); stopSpeech();
  T.mode = 'results';
  let right = 0, total = 0;
  T.sections.forEach(s => s.ids.forEach(id => { if (QBY[id].nokey) return; const ok = grade(QBY[id], T.answers[id]); total++; if (ok) right++; record(QBY[id], ok); }));
  T.right = right; T.total = total;
  let score = right + '/' + total;
  if (T.exam === 'ielts'){ const b = bandEstimate(right, total, T.def.id === 'il' ? 'L' : 'R'); T.band = b; score += ' · ≈ band ' + b; }
  S.tests.push({title:T.title, exam:T.exam, date:Date.now(), score});
  if (S.tests.length > 40) S.tests = S.tests.slice(-40);
  save();
  paint(); window.scrollTo(0, 0);
}
function bandEstimate(r, t, skill){
  const s40 = Math.round(r / t * 40);
  const tbl = skill === 'L' ? [[35,'8 or higher'],[30,'7'],[23,'6'],[16,'5']] : [[35,'8 or higher'],[30,'7'],[23,'6'],[15,'5']];
  for (const [min, b] of tbl) if (s40 >= min) return b;
  return 'below 5';
}
function resultsView(){
  const wrongTopics = [...new Set([].concat(...T.sections.map(s => s.ids)).filter(id => !grade(QBY[id], T.answers[id])).map(id => QBY[id].topic))];
  let n = 0;
  return `<div class="tbar"><span class="tt">${esc(T.title)}<small>Results</small></span><span class="tools"><button class="tbtn" data-act="tclose">Close</button></span></div>
  <div class="stack">
    <div class="card stack"><p class="eyebrow">Your result</p><div class="score-big"><b>${T.right}</b><span class="muted">of ${T.total} correct</span></div>
    ${T.exam === 'ielts' ? `<p>Approximate band: <b>${T.band}</b>. <span class="small">Scaled to 40 questions using the published ielts.org raw-score table; a short test gives only a rough guide.</span></p>` : `<p class="small">ETS converts the number correct to the 130–170 scale by equating across test editions and second-section difficulty. A short practice set can't reproduce that reliably, so use the number correct and the topics below to guide your study.</p>`}
    ${T.sections.length > 1 ? `<p class="small">${T.sections.map(s => `${esc(s.name)}: ${s.ids.filter(id => grade(QBY[id], T.answers[id])).length}/${s.ids.length}`).join(' · ')}</p>` : ''}</div>
    ${wrongTopics.length ? `<div class="card review-card"><h3>Topics to strengthen</h3><p class="small" style="color:var(--ink)">These were added to Review. Read the lesson, then practise similar questions.</p><ul class="review-list">${wrongTopics.map(t => `<li><span class="rl-t">${esc(LBY[t].title)}</span><a class="btn small ghost" href="#lesson-${t}" data-act="tclose-go" data-href="#lesson-${t}">Read lesson</a><button class="btn small" data-act="similar" data-topic="${t}">Practise similar</button></li>`).join('')}</ul></div>` : ''}
    <h2>Every question, explained</h2>
    <div class="rlist">${T.sections.map(s => s.ids.map(id => { n++; const q = QBY[id]; const a = T.answers[id]; const ok = grade(q, a); const an = answered(q, a);
      return `<div class="ritem"><details><summary><span class="rs ${ok ? 'ok' : an ? 'bad' : 'skip'}">${ok ? '✓' : an ? '✕' : '–'}</span><span class="rt">${n}. ${stripTags(q.stem || q.qa)}</span></summary>
      <div class="stack">${q.set && SETS[q.set].listen ? '' : stimHTML(q, {ans:a, locked:true, reveal:true, mode:'review'})}${questionHTML(q, {ans:a, locked:true, reveal:true, mode:'review'})}${fbHTML(q, a, ok, 'review')}</div></details></div>`; }).join('')).join('')}</div>
    ${T.sections.some(s => s.form) ? `<div class="stim">${listenHTML(QBY[T.sections[0].ids[0]].set, {mode:'review', reveal:true})}</div>` : ''}
    <div class="row"><button class="btn" data-act="tclose">Back to tests</button><a class="btn plain" href="#review" data-act="tclose-go" data-href="#review">Review mistakes</a></div>
  </div>`;
}

/* ---------- writing ---------- */
function wc(s){ return (String(s).trim().match(/\S+/g) || []).length; }
function writeView(){
  const task = TASKS[T.task];
  if (T.mode === 'done') return writeDone();
  const min = task.words || 0;
  const words = wc(T.text);
  return `<div class="tbar"><span class="tt">${esc(T.title)}<small>${T.exam === 'gre' ? 'Analytical Writing' : 'IELTS Writing'}</small></span><span class="tools">${timerHTML()}<button class="tbtn" data-act="texit">Exit</button></span></div>
  <div class="stack">
    ${T.exam === 'gre' ? `<div class="prompt">${esc(task.prompt)}</div><p class="small">${esc(task.instructions)}</p>` : `<div class="prompt">${esc(task.prompt)}</div>${task.chart ? `<div class="chart-box">${lineChart(task.chart)}</div>` : ''}<p class="small">Write at least ${min} words.</p>`}
    <div><div class="ed-tools"><div class="row"><button class="btn small plain" data-act="undo">Undo</button><button class="btn small plain" data-act="redo">Redo</button><span class="small">Cut, copy and paste work with your keyboard. No spell-check, as on the real test.</span></div>
      <span class="wc ${min && words < min ? 'under' : ''}" id="wc">${words} words${min ? ' / ' + min : ''}</span></div>
      <textarea class="editor" id="editor" data-in="essay" spellcheck="false" autocorrect="off" autocapitalize="off" autocomplete="off" aria-label="Your response">${esc(T.text)}</textarea></div>
  </div>
  <div class="tfoot"><span class="small">Your draft saves on this device.</span><button class="btn" data-act="wfinish">Finish and review</button></div>`;
}
function finishWrite(){ stopTimer(); T.mode = 'done'; T.used = Date.now() - T.started; S.drafts[T.task] = T.text; save(); paint(); window.scrollTo(0, 0); }
function writeDone(){
  const task = TASKS[T.task];
  const crit = T.exam === 'gre'
    ? ['I took a clear position with a nuance, as the instructions asked.','Each body paragraph has a specific, real example.','I addressed a counter-argument or the limits of my position.','My paragraphs follow a logical order with clear transitions.','I proof-read for spelling and grammar.']
    : [(T.task === 'ielts_t1' ? 'Task Achievement: I wrote a clear overview of the main trends and compared the data.' : 'Task Response: I answered every part of the question with a clear position.'), 'Coherence and Cohesion: clear paragraphs, linking words used naturally.', 'Lexical Resource: precise, varied vocabulary; few spelling errors.', 'Grammatical Range and Accuracy: a mix of simple and complex sentences, mostly error-free.', `I wrote at least ${task.words} words.`];
  const words = wc(T.text);
  return `<div class="tbar"><span class="tt">${esc(T.title)}<small>Review</small></span><span class="tools"><button class="tbtn" data-act="tclose">Close</button></span></div>
  <div class="stack">
    <div class="card stack"><p class="eyebrow">Submitted</p><div class="score-big"><b>${words}</b><span class="muted">words · ${Math.round(T.used / 60000)} min used</span></div>
    ${task.words && words < task.words ? `<p class="mini-bad">Under the ${task.words}-word minimum. In the real test this lowers your Task ${T.task === 'ielts_t1' ? 'Achievement' : 'Response'} score.</p>` : ''}
    <p class="small">${T.exam === 'gre' ? 'Essays are scored 0–6 by a human rater and ETS e-rater.' : 'Essays are scored by a certified examiner on four equally weighted criteria. Compare with the official descriptors linked in the Official guide.'} Check your essay honestly against the list below.</p></div>
    <div><h3 style="margin-bottom:10px">Self-assessment</h3><div class="checklist">${crit.map((c, i) => `<label><input type="checkbox" id="crit-${i}"><span>${c}</span></label>`).join('')}</div></div>
    <details class="card"><summary><b>Your response</b></summary><div class="model" style="margin-top:12px;white-space:pre-wrap">${esc(T.text) || '<i>Empty</i>'}</div></details>
    <div class="card"><h3>A strong plan</h3><ul style="margin-top:8px;padding-left:20px">${task.plan.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>
    <div class="card"><h3>Model answer</h3><div class="model" style="margin-top:10px">${task.model}</div></div>
    <div class="row"><button class="btn" data-act="tclose">Back to tests</button><a class="btn plain" href="#lesson-${T.exam === 'gre' ? 'w-issue' : (T.task === 'ielts_t1' ? 'iw-task1' : 'iw-task2')}" data-act="tclose-go" data-href="#lesson-${T.exam === 'gre' ? 'w-issue' : (T.task === 'ielts_t1' ? 'iw-task1' : 'iw-task2')}">Read the lesson</a></div>
  </div>`;
}
function lineChart(c){
  const W = 560, H = 300, m = {l:44, r:66, t:20, b:36};
  const max = 40, xs = c.years.length;
  const x = i => m.l + i * (W - m.l - m.r) / (xs - 1);
  const y = v => m.t + (1 - v / max) * (H - m.t - m.b);
  const cols = ['var(--gre)', 'var(--ielts)', 'var(--muted)'];
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(c.title)}"><text x="${m.l}" y="12" font-size="12" fill="var(--muted)" font-family="IBM Plex Sans, sans-serif">${esc(c.title)}</text>`;
  [0,10,20,30,40].forEach(v => { s += `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1"/><text x="${m.l - 8}" y="${y(v) + 4}" font-size="11" text-anchor="end" fill="var(--muted)" font-family="IBM Plex Mono, monospace">${v}</text>`; });
  c.years.forEach((yr, i) => { s += `<text x="${x(i)}" y="${H - m.b + 18}" font-size="11" text-anchor="middle" fill="var(--muted)" font-family="IBM Plex Mono, monospace">${yr}</text>`; });
  c.series.forEach((se, k) => {
    s += `<polyline fill="none" stroke="${cols[k]}" stroke-width="2.5" ${k === 2 ? 'stroke-dasharray="6 4"' : ''} points="${se.v.map((v, i) => x(i) + ',' + y(v)).join(' ')}"/>`;
    se.v.forEach((v, i) => { s += `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="${cols[k]}"/>`; });
    const lv = se.v[se.v.length - 1];
    s += `<text x="${x(xs - 1) + 8}" y="${y(lv) + (k === 2 ? 4 : k === 0 ? 10 : -2)}" font-size="12" fill="${cols[k]}" font-weight="600" font-family="IBM Plex Sans, sans-serif">${esc(se.name)}</text>`;
  });
  return s + `</svg>`;
}

/* ---------- speaking ---------- */
let rec = null;
function speakView(){
  const t = TASKS[T.task];
  const card = `<div class="cue"><b>${esc(t.card.topic)}</b><p style="margin-top:8px">You should say:</p><ul>${t.card.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>`;
  const head = `<div class="tbar"><span class="tt">${esc(T.title)}<small>${{card:'Read the card', prep:'Preparation — 1 minute', talk:'Long turn — up to 2 minutes', part3:'Part 3 — discussion', done:'Self-check'}[T.stage]}</small></span><span class="tools">${(T.stage === 'prep' || T.stage === 'talk') ? `<span id="timer" class="timer">${fmt(T.left)}</span>` : ''}<button class="tbtn" data-act="texit">Exit</button></span></div>`;
  let body = '';
  if (T.stage === 'card') body = `${card}<p>In the test, the examiner gives you this card, paper and a pencil. You have one minute to make notes, then speak for up to two minutes.</p><div class="row"><button class="btn" data-act="sp-prep">Start 1-minute preparation</button></div>`;
  if (T.stage === 'prep') body = `${card}<label class="stack" for="notes"><b>Your notes</b><textarea class="editor" id="notes" data-in="notes" style="min-height:160px" placeholder="Keywords for each point">${esc(T.notes)}</textarea></label><div class="row"><button class="btn" data-act="sp-talk">I'm ready — start talking</button></div>`;
  if (T.stage === 'talk') body = `${card}${T.notes ? `<div class="card"><b>Your notes</b><p style="white-space:pre-wrap;margin-top:6px">${esc(T.notes)}</p></div>` : ''}
    <div class="card stack"><p>Speak aloud now. Keep going until the time runs out; the examiner will stop you.</p>
    <div class="row">${rec && rec.state === 'recording' ? `<button class="btn" data-act="rec-stop">${ico('mic')} Stop recording</button>` : `<button class="btn plain" data-act="rec-start">${ico('mic')} Record my answer</button>`}<span class="small" id="rec-msg">${T.recMsg || ''}</span></div></div>
    <div class="row"><button class="btn" data-act="sp-part3">Finish long turn</button></div>`;
  if (T.stage === 'part3') body = `${T.audio ? `<div class="card stack"><b>Your recording</b><audio controls src="${T.audio}"></audio></div>` : ''}
    <div class="card"><h3>Part 3 — discussion questions</h3><p class="small" style="margin:6px 0 12px">Answer each aloud in 4–5 sentences: opinion → reason → example → the other side.</p><ol style="padding-left:20px;display:grid;gap:10px">${t.part3.map(q => `<li>${esc(q)}</li>`).join('')}</ol></div>
    <div class="row"><button class="btn" data-act="sp-done">Finish</button></div>`;
  if (T.stage === 'done') body = `<div class="checklist">${['Fluency and Coherence: I kept talking for close to 2 minutes without long pauses.','Lexical Resource: I used topic words and paraphrased when stuck.','Grammatical Range and Accuracy: I used past tenses correctly and some complex sentences.','Pronunciation: I stressed key words and spoke clearly.'].map((c, i) => `<label><input type="checkbox" id="spc-${i}"><span>${c}</span></label>`).join('')}</div>
    <div class="card"><h3>Example notes for this card</h3><ul style="margin-top:8px;padding-left:20px">${t.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>
    <div class="row"><button class="btn" data-act="tclose">Back to tests</button><a class="btn plain" href="#lesson-is-parts" data-act="tclose-go" data-href="#lesson-is-parts">Read the speaking lesson</a></div>`;
  return head + `<div class="stack">${(T.stage === 'prep' || T.stage === 'talk') ? `<div class="bigtime" aria-hidden="true" id="bigtime">${fmt(T.left)}</div>` : ''}${body}</div>`;
}
function speakNext(){
  if (T.stage === 'prep'){ T.stage = 'talk'; T.left = TASKS[T.task].talk; startTimer(); }
  else if (T.stage === 'talk'){ stopRec(); T.stage = 'part3'; stopTimer(); }
  paint();
}
async function startRec(){
  try {
    if (!navigator.mediaDevices || !window.MediaRecorder) throw new Error('x');
    const stream = await navigator.mediaDevices.getUserMedia({audio:true});
    const chunks = [];
    rec = new MediaRecorder(stream);
    rec.ondataavailable = e => chunks.push(e.data);
    rec.onstop = () => { stream.getTracks().forEach(t => t.stop()); T && (T.audio = URL.createObjectURL(new Blob(chunks, {type: rec.mimeType || 'audio/webm'}))); paint(); };
    rec.start(); T.recMsg = 'Recording…';
  } catch(e){ T.recMsg = 'Recording isn\'t available here. Speak aloud and time yourself; the installed app can record.'; }
  paint();
}
function stopRec(){ try { if (rec && rec.state === 'recording') rec.stop(); } catch(e){} }

/* ---------- speech for listening ---------- */
function stopSpeech(){ try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch(e){} }
function playSet(setId){
  const st = SETS[setId];
  const ss = window.speechSynthesis; if (!ss) return;
  ss.cancel();
  const all = ss.getVoices().filter(v => /^en/i.test(v.lang));
  const pref = all.filter(v => /GB|AU|IE|NZ/i.test(v.lang));
  const pool = pref.length >= 2 ? pref : (all.length ? all : []);
  const vA = pool[0], vB = pool[1] || pool[0];
  st.lines.forEach(l => {
    const u = new SpeechSynthesisUtterance(l[1].replace(/\.\.\./g, ', '));
    const v = l[0] === 'R' ? vA : vB;
    if (v){ u.voice = v; u.lang = v.lang; } else u.lang = 'en-GB';
    u.rate = 0.95; u.pitch = l[0] === 'R' ? 1.08 : 0.9;
    ss.speak(u);
  });
}

/* ================= CAMBRIDGE IELTS LISTENING ================= */
const CAM_LOADING = {};
let CP = null;
const camAudio = new Audio(); camAudio.preload = 'auto';
camAudio.addEventListener('timeupdate', () => { const b = $('#campbar'); if (b && camAudio.duration) b.style.width = (100 * camAudio.currentTime / camAudio.duration) + '%'; const tt = $('#camtime'); if (tt) tt.textContent = fmt(Math.floor(camAudio.currentTime)) + ' / ' + fmt(Math.floor(camAudio.duration || 0)); });
camAudio.addEventListener('ended', () => { const b = $('#camstate'); if (b) b.textContent = 'Recording finished. Check your answers.'; });
function stopCamAudio(){ try { camAudio.pause(); } catch(e){} }
function loadCam(t){
  if (CAM_LOADING[t]) return CAM_LOADING[t];
  CAM_LOADING[t] = new Promise((res, rej) => { const sc = document.createElement('script'); sc.src = 'cam/t' + t + '.js'; sc.onload = res; sc.onerror = () => { delete CAM_LOADING[t]; rej(); }; document.head.appendChild(sc); });
  return CAM_LOADING[t];
}
function camPages(t, pages, label){
  let missing = false;
  const html = pages.map(p => { const k = 'c8-' + String(p).padStart(3, '0'); const src = window.CAM_IMG && CAM_IMG[k]; if (!src) missing = true;
    return `<figure class="page">${src ? `<img src="${src}" alt="${label}, page ${p}">` : `<div class="qimg loading" style="aspect-ratio:1000/1414;border:0"><span class="small">Loading page ${p}…</span></div>`}<figcaption>${esc(CAM.book)} · page ${p}</figcaption></figure>`; }).join('');
  if (missing) loadCam(t).then(() => paint()).catch(() => {});
  return `<div class="pages">${html}</div>`;
}
const camKey = (t, n) => CAM.key[t + '-' + n];
const camSecOf = n => Math.ceil(n / 10);
function camCheck(t, n, answers){
  const k = camKey(t, n); const raw = String(answers[n] || '').trim();
  if (!raw) return {ok:false, reason:'blank'};
  const nn = norm(raw);
  if (k.group){
    const letter = nn.replace(/\s/g, '');
    if (!k.group.includes(letter)) return {ok:false, reason:'wrong'};
    for (let m = n - 1; m >= 1; m--){ const km = camKey(t, m); if (!km.group || km.group.join() !== k.group.join()) break; if (norm(answers[m] || '').replace(/\s/g, '') === letter) return {ok:false, reason:'dup'}; }
    return {ok:true};
  }
  const squash = x => norm(x).replace(/\s/g, '');
  if (k.acc.some(a => norm(a) === nn || squash(a) === squash(raw))) return {ok:true};
  if (k.acc.some(a => /[a-z]{4,}/.test(a) && lev(norm(a), nn) <= (norm(a).length >= 9 ? 2 : 1))) return {ok:false, reason:'spelling'};
  return {ok:false, reason:'wrong'};
}
/* register each Cambridge question so Review and "practise similar" work */
(window.CAM ? CAM.tests : []).forEach(tt => {
  for (let n = 1; n <= 40; n++){
    const k = camKey(tt.t, n), s = camSecOf(n);
    SETS['cam-' + tt.t + '-' + s] = SETS['cam-' + tt.t + '-' + s] || {title:CAM.book + ' · Test ' + tt.t + ' · Section ' + s, cam:true, t:tt.t, s};
    const q = {id:'c8-' + tt.t + '-' + n, exam:'ielts', sec:'listening', type:'gap', src:'cam', cam:{t:tt.t, n, s}, set:'cam-' + tt.t + '-' + s,
      topic: s === 1 ? 'il-forms' : 'il-technique', stem:'Question ' + n + ' (see the question paper)', label:'Question ' + n,
      answer: k.group ? k.group : k.acc, limit:9, limitText:'within the word limit printed on the question paper',
      exp:'Official answer: ' + k.disp + '. Read the tapescript to find the exact moment it is said, and notice any distractor before it.',
      concept:'In IELTS Listening the answer usually comes after a distractor or a correction, and spelling and word limits are strictly marked.',
      fast:'Read the questions before the audio starts, predict the type of word, and follow the order of the questions.'};
    QUESTIONS.push(q); QBY[q.id] = q;
  }
});
function camStim(st, o){
  const sec = CAM.tests[st.t - 1].sections[st.s - 1];
  return `<div class="stim"><h3>${esc(st.title)}</h3><audio controls preload="none" src="${sec.audio}" style="width:100%"></audio>
    <details style="margin-top:10px" open><summary class="small">Question paper</summary>${camPages(st.t, sec.pages, 'Question paper')}</details>
    ${o.reveal ? `<details style="margin-top:10px"><summary class="small">Tapescript</summary>${camPages(st.t, CAM.tests[st.t - 1].script, 'Tapescript')}</details>` : ''}</div>`;
}
function camBand(sc){ const t = [[39,'9'],[37,'8.5'],[35,'8'],[32,'7.5'],[30,'7'],[26,'6.5'],[23,'6'],[18,'5.5'],[16,'5'],[13,'4.5'],[10,'4'],[8,'3.5'],[6,'3'],[4,'2.5']]; for (const [m, b] of t) if (sc >= m) return b; return 'below 2.5'; }
function camPicker(mode){
  if (!window.CAM) return '';
  return `<div class="card stack" style="gap:12px;margin-bottom:8px"><div><p class="eyebrow">${esc(CAM.book)} · Listening</p><h2 style="margin-top:4px">${mode === 'test' ? 'Full listening tests with the original recordings' : 'Practise with the original Cambridge recordings'}</h2>
  <p class="small" style="margin-top:6px">${mode === 'test' ? 'Four official tests, 40 questions each. Each recording plays once, as in the exam, and you get a band estimate at the end.' : 'Pick a section. You can pause and replay, then check your answers against the official key and read the tapescript.'}</p></div>
  ${mode === 'test' ? `<div class="kgrid">${CAM.tests.map(tt => `<button class="kcell" data-act="camtest" data-t="${tt.t}"><b>Test ${tt.t}</b><span>40 Qs · 4 parts</span></button>`).join('')}</div>`
  : `<div class="camgrid">${CAM.tests.map(tt => `<div class="camrow"><b>Test ${tt.t}</b>${tt.sections.map((s, i) => { const ids = Array.from({length:10}, (_, j) => 'c8-' + tt.t + '-' + (i * 10 + j + 1)); const done = ids.filter(id => S.attempts[id]).length;
      return `<button class="kcell ${done === 10 ? 'full' : done ? 'part' : ''}" data-act="campractice" data-t="${tt.t}" data-s="${i + 1}"><b>S${i + 1}</b><span>${done}/10</span></button>`; }).join('')}</div>`).join('')}</div>`}</div>`;
}
function camSheet(t, s, answers, o){
  return `<div class="formq">${Array.from({length:10}, (_, j) => { const n = (s - 1) * 10 + j + 1; const k = camKey(t, n); let mark = '';
    if (o.reveal){ const r = camCheck(t, n, answers); mark = r.ok ? `<span class="mini-ok">✓</span>` : `<span class="mini-bad">✕ ${esc(k.disp)}${r.reason === 'spelling' ? ' · spelling' : r.reason === 'dup' ? ' · same letter used twice' : ''}</span>`; }
    return `<label><span><span class="qn">${n}</span>${k.group ? 'Letter' : 'Answer'}</span><span class="row" style="gap:8px;flex-wrap:nowrap"><input id="cam-${t}-${n}" data-in="cam" data-n="${n}" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(answers[n] || '')}" ${o.locked ? 'disabled' : ''}>${mark}</span></label>`; }).join('')}</div>`;
}
function camPracticeView(){
  const t = CP.t, s = CP.s, sec = CAM.tests[t - 1].sections[s - 1];
  const score = CP.checked ? Array.from({length:10}, (_, j) => (s - 1) * 10 + j + 1).filter(n => camCheck(t, n, CP.ans).ok).length : null;
  return `<div class="qhead"><div class="qprog"><span class="small">${esc(CAM.book)} · Test ${t} · Section ${s} · Questions ${(s - 1) * 10 + 1}–${s * 10}</span></div><button class="btn small plain" data-act="camexit">Back to practice</button></div>
  <div class="stim" style="margin-bottom:16px"><audio controls preload="metadata" src="${sec.audio}" style="width:100%"></audio><p class="small" style="margin-top:6px">Read the questions first, then play. Write answers in the boxes; letters for multiple-choice and matching questions.</p></div>
  <div class="qwrap split"><div class="stim"><h3>Question paper</h3><button type="button" class="btn small plain" data-act="zoom" style="margin-bottom:8px">${document.body.classList.contains('zoom') ? 'Fit pages to screen' : 'Enlarge pages'}</button>${camPages(t, sec.pages, 'Question paper')}</div>
  <div class="stack"><div class="qcard"><div class="qtype">Answer sheet ${score != null ? `<span class="chip">${score} / 10 correct</span>` : ''}</div>${camSheet(t, s, CP.ans, {locked:CP.checked, reveal:CP.checked})}
    <div class="qactions">${CP.checked ? `<button class="btn" data-act="camretry">Try again</button>${s < 4 ? `<button class="btn plain" data-act="campractice" data-t="${t}" data-s="${s + 1}">Next section ${ico('arrow')}</button>` : ''}` : `<button class="btn" data-act="camcheck">Check answers</button>`}</div></div>
    ${CP.checked ? `<div class="fb ${score >= 7 ? 'ok' : 'bad'}"><div class="fb-h">${score} of 10 correct</div><div class="fb-b"><div class="fb-s"><p>Wrong answers were saved to Review. For each one, find the line in the tapescript: the answer usually comes just after a distractor or a correction. Re-read: <a href="#lesson-il-technique">Prediction, signposts &amp; distractors</a> · <a href="#lesson-il-forms">Word limits and spelling</a>.</p></div></div></div>
    <details class="card"><summary><b>Tapescript</b></summary>${camPages(t, CAM.tests[t - 1].script, 'Tapescript')}</details>` : ''}</div></div>`;
}
function camTestView(){
  const t = T.t, sec = CAM.tests[t - 1].sections[T.si];
  const qs = Array.from({length:40}, (_, i) => i + 1);
  if (T.mode === 'results'){
    const right = qs.filter(n => camCheck(t, n, T.answers).ok).length;
    return `<div class="tbar"><span class="tt">${esc(CAM.book)} · Listening Test ${t}<small>Results</small></span><span class="tools"><button class="tbtn" data-act="tclose">Close</button></span></div>
    <div class="stack"><div class="card stack"><p class="eyebrow">Your result</p><div class="score-big"><b>${right}</b><span class="muted">of 40 correct</span></div><p>Approximate band: <b>${camBand(right)}</b> <span class="small">(the usual Listening raw-score conversion; it varies slightly between tests)</span></p>
    <p class="small">${[1,2,3,4].map(s => `Section ${s}: ${qs.slice((s - 1) * 10, s * 10).filter(n => camCheck(t, n, T.answers).ok).length}/10`).join(' · ')}</p></div>
    ${[1,2,3,4].map(s => `<details class="card" ${s === 1 ? 'open' : ''}><summary><b>Section ${s}</b></summary><audio controls preload="none" src="${CAM.tests[t - 1].sections[s - 1].audio}" style="width:100%;margin-top:10px"></audio>${camSheet(t, s, T.answers, {locked:true, reveal:true})}</details>`).join('')}
    <details class="card"><summary><b>Tapescript</b></summary>${camPages(t, CAM.tests[t - 1].script, 'Tapescript')}</details>
    <div class="row"><button class="btn" data-act="tclose">Back to tests</button><a class="btn plain" href="#review" data-act="tclose-go" data-href="#review">Review mistakes</a></div></div>`;
  }
  const head = `<div class="tbar"><span class="tt">Listening Test ${t} · Part ${T.si + 1} of 4<small>Questions ${T.si * 10 + 1}–${T.si * 10 + 10}</small></span><span class="tools">${T.mode === 'q' ? timerHTML() : ''}<button class="tbtn" data-act="texit">Exit</button></span></div>`;
  if (T.mode === 'ready') return head + `<div class="card stack" style="max-width:640px;margin:20px auto"><p class="eyebrow">Part ${T.si + 1}</p><h2>Ready when you are</h2><p>The recording plays once and cannot be paused. Read the questions on the paper first; there are pauses in the recording to look ahead.</p><div class="row"><button class="btn" data-act="camstart">${ico('play')} Start Part ${T.si + 1}</button></div></div>`;
  return head + `<div class="stim" style="margin-bottom:14px"><div class="row" style="gap:12px"><span id="camstate" class="small">${camAudio.ended ? 'Recording finished. Check your answers.' : 'Playing… the recording is heard once.'}</span><span id="camtime" class="small tnum"></span></div><div class="bar" style="margin-top:8px"><i id="campbar" style="width:0%"></i></div></div>
  <div class="qwrap split"><div class="stim"><h3>Question paper</h3><button type="button" class="btn small plain" data-act="zoom" style="margin-bottom:8px">${document.body.classList.contains('zoom') ? 'Fit pages to screen' : 'Enlarge pages'}</button>${camPages(t, sec.pages, 'Question paper')}</div>
  <div class="qcard"><div class="qtype">Answer sheet</div>${camSheet(t, T.si + 1, T.answers, {})}</div></div>
  <div class="tfoot"><span class="small">Answers save as you type.</span><button class="btn" data-act="camnext">${T.si < 3 ? 'Finish part ' + (T.si + 1) : 'Finish test'}</button></div>`;
}
function camEndSection(){
  stopCamAudio();
  if (T.si < 3){ T.si++; T.mode = 'ready'; stopTimer(); paint(); window.scrollTo(0, 0); return; }
  stopTimer(); T.mode = 'results';
  for (let n = 1; n <= 40; n++){ const ok = camCheck(T.t, n, T.answers).ok; record(QBY['c8-' + T.t + '-' + n], ok); }
  const right = Array.from({length:40}, (_, i) => i + 1).filter(n => camCheck(T.t, n, T.answers).ok).length;
  S.tests.push({title:CAM.book + ' Listening Test ' + T.t, exam:'ielts', date:Date.now(), score:right + '/40 · ≈ band ' + camBand(right)}); save();
  paint(); window.scrollTo(0, 0);
}

/* ================= VOCAB ================= */
const V = {tab:'list', topic:'All', q:'', letter:'', limit:48, fc:null, quiz:null};
/* merge the large word lists (Barron's, Manhattan) into VOCAB, one card per word */
(function mergeVocab(){
  const by = {};
  VOCAB.forEach(v => { v.srcs = v.srcs || ['Core list']; by[v.exam + ':' + v.w.toLowerCase()] = v; });
  (window.VOCAB_EXTRA || []).forEach(x => {
    const key = 'gre:' + x.w.toLowerCase();
    const cur = by[key];
    if (!cur){ const v = Object.assign({exam:'gre', syn:[], ex:[], topic:x.srcs[0]}, x); VOCAB.push(v); by[key] = v; VBY[vid(v)] = v; return; }
    x.srcs.forEach(s => { if (!cur.srcs.includes(s)) cur.srcs.push(s); });
    if (!cur.pr && x.pr) cur.pr = x.pr;
    if (x.def && x.def.toLowerCase() !== (cur.def || '').toLowerCase()){ cur.alt = cur.alt || []; if (!cur.alt.includes(x.def)) cur.alt.push(x.def); }
    (x.ex || []).forEach(e => { if (cur.ex.length < 5 && !cur.ex.includes(e)) cur.ex.push(e); });
    ['related','more','also'].forEach(k => { if (x[k] && !cur[k]) cur[k] = x[k]; });
    if (x.tip && !cur.tip) cur.tip = x.tip;
  });
})();
function vSources(){ const s = new Set(); VOCAB.filter(v => v.exam === S.exam).forEach(v => (v.srcs || []).forEach(x => s.add(x))); return [...s]; }
function vWords(){ return VOCAB.filter(v => v.exam === S.exam && (V.topic === 'All' || (v.srcs || []).includes(V.topic) || v.topic === V.topic)); }
/* pronunciation */
let voiceCache = null;
function pickVoice(){
  if (!window.speechSynthesis) return null;
  const vs = speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang));
  return vs.find(v => /en[-_]US/i.test(v.lang) && /Google|Samantha|Natural|Microsoft/i.test(v.name)) || vs.find(v => /en[-_]US/i.test(v.lang)) || vs.find(v => /en[-_]GB/i.test(v.lang)) || vs[0] || null;
}
if (window.speechSynthesis){ try { speechSynthesis.onvoiceschanged = () => { voiceCache = pickVoice(); }; } catch(e){} }
function say(text, slow){
  if (!window.speechSynthesis){ return false; }
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = voiceCache || (voiceCache = pickVoice());
    if (v){ u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
    u.rate = slow ? 0.7 : 0.92;
    speechSynthesis.speak(u);
    return true;
  } catch(e){ return false; }
}
const sayBtn = (text, label, small) => window.speechSynthesis ? `<button type="button" class="say ${small ? 'sm' : ''}" data-act="say" data-say="${esc(text)}" aria-label="${esc(label || ('Hear ' + text))}" title="${esc(label || 'Hear the pronunciation')}">${ico('sound')}</button>` : '';
function vocabView(){
  const srcs = ['All'].concat(vSources());
  if (!srcs.includes(V.topic)) V.topic = 'All';
  const tabs = [['list','Word list'],['flash','Flashcards'],['quiz','Quiz']];
  let body = '';
  if (V.tab === 'list') body = vocabList();
  if (V.tab === 'flash') body = vocabFlash();
  if (V.tab === 'quiz') body = vocabQuiz();
  const n = VOCAB.filter(v => v.exam === S.exam).length;
  return `<div class="page-head"><p class="eyebrow">Learning track</p><h1>Vocabulary</h1>
  <p>${S.exam === 'gre' ? `${n.toLocaleString()} GRE words: Barron's 800 high-frequency words, Manhattan Prep's 500 Essential and 500 Advanced words, and the core list. Every card has a definition, example sentences and a speaker button to hear it.` : 'Topic vocabulary for Writing and Speaking, plus the trend and linking words Task 1 needs. Tap the speaker to hear each word.'} Words you miss in the quiz go to Review.</p>
  ${window.speechSynthesis ? '' : '<p class="small">Pronunciation audio isn\'t available in this browser.</p>'}</div>
  <div class="tabs" role="tablist">${tabs.map(t => `<button role="tab" aria-selected="${V.tab === t[0]}" data-act="vtab" data-tab="${t[0]}">${t[1]}</button>`).join('')}</div>
  <div class="filters">${srcs.map(t => `<button class="chip" aria-pressed="${V.topic === t}" data-act="vtopic" data-topic="${esc(t)}">${esc(t)}${t === 'All' ? '' : ` <span class="small">${VOCAB.filter(v => v.exam === S.exam && ((v.srcs || []).includes(t))).length}</span>`}</button>`).join('')}</div>${body}`;
}
function wordCard(v){
  const st = S.vocab[vid(v)] || {};
  return `<div class="card word"><div class="word-h"><b>${esc(v.w)}</b>${sayBtn(v.w)}<i>${esc(v.pos || '')}</i>${v.pr ? `<span class="pr">/${esc(v.pr)}/</span>` : ''}${st.due ? '<span class="flag">revise</span>' : ''}</div>
    <p class="def">${esc(v.def)}</p>
    ${v.alt && v.alt.length ? `<p class="small"><b>Also defined as:</b> ${v.alt.map(esc).join(' · ')}</p>` : ''}
    ${v.ex && v.ex.length ? `<ul class="ex">${v.ex.map(e => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}
    ${v.syn && v.syn.length ? `<p class="syn"><b>Similar:</b> ${v.syn.map(esc).join(', ')}${v.ant ? ` · <b>Opposite:</b> ${esc(v.ant)}` : ''}</p>` : ''}
    ${v.related ? `<p class="syn"><b>Related:</b> ${esc(v.related)}</p>` : ''}
    ${v.more ? `<p class="syn">${esc(v.more)}</p>` : ''}
    ${v.also ? `<p class="syn">${esc(v.also)}</p>` : ''}
    ${v.tip ? `<p class="tipline">${esc(v.tip)}</p>` : ''}
    ${v.note ? `<p class="small"><i>${esc(v.note)}</i></p>` : ''}
    <div class="word-foot"><span class="small">${esc((v.srcs || [v.topic]).join(' · '))}</span><button class="known" data-act="vknown" data-id="${esc(vid(v))}" aria-pressed="${!!st.known}">${st.known ? '✓ Known' : 'Mark as known'}</button></div></div>`;
}
function vFiltered(){
  const q = V.q.trim().toLowerCase();
  return vWords().filter(v => (!V.letter || v.w[0].toLowerCase() === V.letter) && (!q || v.w.toLowerCase().includes(q) || (v.def || '').toLowerCase().includes(q))).sort((a, b) => a.w.localeCompare(b.w));
}
function vGrid(){
  const ws = vFiltered();
  return (ws.slice(0, V.limit).map(wordCard).join('') || '<div class="empty">No words match.</div>') + (ws.length > V.limit ? `<div class="more-row"><button class="btn plain" data-act="vmore">Show more (${ws.length - V.limit} left)</button></div>` : '');
}
function vocabList(){
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return `<input class="search" type="search" id="vsearch" data-in="vsearch" placeholder="Search words or meanings" value="${esc(V.q)}" aria-label="Search words">
  <div class="alpha" role="group" aria-label="First letter"><button class="chip" aria-pressed="${!V.letter}" data-act="vletter" data-l="">All</button>${letters.map(l => `<button class="chip" aria-pressed="${V.letter === l}" data-act="vletter" data-l="${l}">${l.toUpperCase()}</button>`).join('')}</div>
  <p class="small" id="vcount">${vFiltered().length} words</p>
  <div class="words" id="wordgrid">${vGrid()}</div>`;
}
function vocabFlash(){
  if (!V.fc || V.fc.topic !== V.topic){
    const ws = vWords().slice().sort((a, b) => ((S.vocab[vid(a)] || {}).known ? 1 : 0) - ((S.vocab[vid(b)] || {}).known ? 1 : 0) || Math.random() - .5);
    V.fc = {topic:V.topic, ids:ws.map(vid), i:0, flip:false};
  }
  const f = V.fc;
  if (f.i >= f.ids.length) return `<div class="flash"><div class="card stack" style="text-align:center"><h2>Deck finished</h2><p class="small">${f.ids.filter(id => (S.vocab[id] || {}).known).length} of ${f.ids.length} marked as known.</p><div class="row" style="justify-content:center"><button class="btn" data-act="fcrestart">Go again</button><button class="btn plain" data-act="vtab" data-tab="quiz">Take the quiz</button></div></div></div>`;
  const v = VBY[f.ids[f.i]];
  return `<div class="flash"><p class="small" style="text-align:center">Card ${f.i + 1} of ${f.ids.length}</p>
    ${f.flip ? `<div class="flashcard back"><div class="word-h"><b style="font:700 1.4rem/1.1 var(--f-display)">${esc(v.w)}</b>${sayBtn(v.w)}${v.pr ? `<span class="pr">/${esc(v.pr)}/</span>` : ''}</div><p class="def" style="font-weight:500">${esc(v.def)}</p>${v.ex && v.ex.length ? `<ul class="ex" style="font-family:var(--f-read);padding-left:18px;margin:0">${v.ex.slice(0, 2).map(e => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}${v.syn && v.syn.length ? `<p class="small">Similar: ${v.syn.map(esc).join(', ')}</p>` : ''}</div>
      <div class="row" style="justify-content:center"><button class="btn plain" data-act="fcnext" data-known="0">Still learning</button><button class="btn" data-act="fcnext" data-known="1">I know it</button></div>`
    : `<div class="flashcard"><button class="fc-face" data-act="fcflip"><span class="fw">${esc(v.w)}</span><span class="small">${esc(v.pos || '')} · tap to see the meaning</span></button>${sayBtn(v.w)}</div>`}</div>`;
}
function makeQuiz(){
  const pool = vWords();
  const prio = w => { const s = S.vocab[vid(w)] || {}; return s.due ? 0 : s.known ? 2 : 1; };
  const pick = pool.slice().sort((a, b) => prio(a) - prio(b) || Math.random() - .5).slice(0, Math.min(10, pool.length));
  const all = pool.length >= 8 ? pool : VOCAB.filter(v => v.exam === S.exam);
  return {i:0, score:0, chosen:null, items:pick.map((w, n) => {
    const others = all.filter(x => x.w !== w.w).sort(() => Math.random() - .5).slice(0, 3);
    const opts = others.concat([w]).sort(() => Math.random() - .5);
    const stem = w.w.slice(0, Math.max(4, w.w.length - 2)).toLowerCase();
    const sent = (w.ex || []).find(e => e.toLowerCase().includes(stem));
    const kind = (n % 2 === 1 && sent) ? 'sent' : 'def';
    let blanked = '';
    if (kind === 'sent') blanked = esc(sent).replace(new RegExp('\\b' + stem.replace(/[^a-z]/g, '') + '[a-z]*', 'i'), '<span class="blank">?</span>');
    return {id:vid(w), kind, blanked, opts:opts.map(vid)};
  })};
}
function vocabQuiz(){
  if (!V.quiz || V.quiz.topic !== V.topic){ V.quiz = makeQuiz(); V.quiz.topic = V.topic; }
  const z = V.quiz;
  if (!z.items.length) return '<div class="empty">No words in this group.</div>';
  if (z.i >= z.items.length) return `<div class="flash"><div class="card stack" style="text-align:center"><h2>${z.score} of ${z.items.length}</h2><p class="small">Missed words are flagged in the word list and in Review.</p><div class="row" style="justify-content:center"><button class="btn" data-act="qzrestart">New quiz</button><a class="btn plain" href="#review">Review</a></div></div></div>`;
  const it = z.items[z.i]; const w = VBY[it.id];
  const prompt = it.kind === 'def' ? `What does <b>${esc(w.w)}</b> mean? ${sayBtn(w.w, null, true)}` : `Which word completes the sentence?<div class="ex-q" style="margin-top:10px">${it.blanked}</div>`;
  const label = id => it.kind === 'def' ? esc(VBY[id].def) : esc(VBY[id].w);
  const done = z.chosen != null;
  const exs = w => (w.ex && w.ex.length ? `<ul>${w.ex.slice(0, 3).map(e => `<li>${esc(e)}</li>`).join('')}</ul>` : '');
  let fb = '';
  if (done){
    const ok = z.chosen === it.id;
    const cw = VBY[z.chosen];
    fb = ok ? `<div class="fb ok"><div class="fb-h">${ico('check')} Correct</div><div class="fb-b"><div class="fb-s"><h4>${esc(w.w)} ${w.pos ? '(' + esc(w.pos) + ')' : ''} ${sayBtn(w.w, null, true)}</h4><p>${esc(w.def)}</p></div><div class="fb-s"><h4>In context</h4>${exs(w)}</div>${w.tip ? `<div class="fb-s"><h4>Memory hook</h4><p>${esc(w.tip)}</p></div>` : ''}</div></div>`
      : `<div class="fb bad"><div class="fb-h">${ico('x')} Not quite</div><div class="fb-b"><div class="fb-s"><h4>Correct answer ${sayBtn(w.w, null, true)}</h4><p><b>${esc(w.w)}</b>: ${esc(w.def)}</p></div><div class="fb-s"><h4>Why your choice is wrong</h4><div class="fb-why"><p>You chose ${it.kind === 'def' ? `the meaning of <b>${esc(cw.w)}</b>` : `<b>${esc(cw.w)}</b>, which means “${esc(cw.def)}”`}. ${it.kind === 'sent' ? 'That meaning doesn\'t fit the clues in the sentence.' : ''}</p></div></div><div class="fb-s"><h4>${esc(w.w)} in context</h4>${exs(w)}</div></div></div>`;
  }
  return `<div class="flash" style="max-width:640px"><p class="small">Question ${z.i + 1} of ${z.items.length} · Score ${z.score}</p>
  <div class="qcard"><div class="qstem">${prompt}</div><div class="opts">${it.opts.map((id, i) => {
    let cls = 'opt'; if (done){ if (id === it.id) cls += ' ok'; else if (id === z.chosen) cls += ' bad'; }
    return `<button class="${cls}" data-act="qzpick" data-id="${esc(id)}" ${done ? 'disabled' : ''}><span class="k">${LETTERS[i]}</span><span>${label(id)}</span></button>`; }).join('')}</div></div>
  ${fb}${done ? `<div class="row"><button class="btn" data-act="qznext">${z.i + 1 < z.items.length ? 'Next word' : 'See score'} ${ico('arrow')}</button></div>` : ''}</div>`;
}

/* ================= REVIEW ================= */
function reviewView(){
  const tm = topicMistakes();
  const missed = openMistakes();
  const fixed = Object.keys(S.mistakes).filter(id => !S.mistakes[id].open && QBY[id] && QBY[id].exam === S.exam).length;
  const words = vocabDue();
  return `<div class="page-head"><p class="eyebrow">Progress</p><h1>Review mistakes</h1>
  <p>Every question you get wrong lands here, grouped by concept. Read the lesson again, then practise similar questions. A question leaves this list once you answer it correctly.</p></div>
  ${tm.length ? `<div class="row" style="margin-bottom:14px"><button class="btn" data-act="pmissed">Retry all missed questions (${missed.length})</button>${fixed ? `<span class="small">${fixed} fixed so far</span>` : ''}</div>
  <div class="topic-grid">${tm.map(t => { const L = LBY[t.topic]; const sec = SECTIONS[L.exam].find(s => s.id === L.sec);
    return `<div class="card stack" style="gap:10px"><div class="row" style="justify-content:space-between"><span><span class="eyebrow">${sec.name}</span><h3 style="margin-top:4px">${esc(L.title)}</h3></span><span class="flag">${t.ids.length} missed</span></div>
    <p class="small">${esc(L.summary)}</p>
    <div class="row"><a class="btn small ghost" href="#lesson-${t.topic}">Read the concept</a><button class="btn small" data-act="similar" data-topic="${t.topic}">Practise similar (${topicQs(t.topic).length})</button></div></div>`; }).join('')}</div>`
  : `<div class="empty">${fixed ? `No open mistakes. You've fixed ${fixed} question${fixed > 1 ? 's' : ''}.` : 'Nothing to review yet. Answer some practice questions or take a test.'}</div>`}
  <div class="sec-title"><h2>Words to revise</h2>${words.length ? `<button class="btn small plain" data-act="vtab-go" data-tab="quiz">Quiz these</button>` : ''}</div>
  ${words.length ? `<div class="words">${words.map(wordCard).join('')}</div>` : '<div class="empty">No words flagged. Missed quiz words appear here.</div>'}
  <div class="sec-title"><h2>Start over</h2></div>
  <div class="card row" style="justify-content:space-between"><span class="small">Clear all progress, mistakes, vocabulary and drafts on this device.</span><button class="btn small plain" data-act="reset">Reset progress</button></div>`;
}

/* ================= MODAL ================= */
function confirmBox(title, text, okLabel, onOk){
  const m = $('#modal');
  m.innerHTML = `<div class="card" role="alertdialog" aria-modal="true"><h2>${title}</h2><p>${text}</p><div class="row" style="justify-content:flex-end"><button class="btn plain" data-m="no">Cancel</button><button class="btn" data-m="yes">${okLabel}</button></div></div>`;
  m.hidden = false;
  m.onclick = e => { const b = e.target.closest('[data-m]'); if (!b && e.target !== m) return; m.hidden = true; m.onclick = null; if (b && b.dataset.m === 'yes') onOk(); };
  $('[data-m="yes"]', m).focus();
}

/* ================= CALCULATOR UI ================= */
const calcEl = $('#calc');
function calcAllowed(){
  if (route === 'practice' && P && !P.done){ return isQuant(QBY[P.ids[P.i]]); }
  if (route === 'test' && T && T.kind === 'q' && (T.mode === 'q' || T.mode === 'review')) return !!curSection().calc;
  return false;
}
function hideCalc(){ calcEl.hidden = true; }
function syncCalc(){
  $('#calc-v').textContent = GRECalc.display();
  $('#calc-m').textContent = GRECalc.hasMemory() ? 'M' : '';
  $('#calc-t').disabled = !GRECalc.canTransfer();
}
GRECalc.onChange(syncCalc);
function setTransferTarget(){
  let q = null, ctx = null;
  if (route === 'practice' && P && !P.done && !P.checked){ q = QBY[P.ids[P.i]]; ctx = 'p'; }
  if (route === 'test' && T && T.kind === 'q' && T.mode === 'q'){ q = curQ(); ctx = 't'; }
  if (q && q.type === 'numeric' && !q.frac){
    GRECalc.setTransfer(val => {
      const v = val === 'ERROR' ? '' : val;
      if (ctx === 'p') P.ans = v; else T.answers[q.id] = v;
      const inp = $('#ni-' + q.id); if (inp) inp.value = v;
      const chk = $('[data-act="pcheck"]'); if (chk) chk.disabled = !answered(q, v);
    });
  } else GRECalc.setTransfer(null);
}
$('#calc-k').addEventListener('click', e => { const b = e.target.closest('[data-k]'); if (b) GRECalc.press(b.dataset.k); });
$('#calc-x').addEventListener('click', hideCalc);
$('#calc-t').addEventListener('click', () => GRECalc.transfer());
(function drag(){
  const h = $('#calc-h'); let sx, sy, ox, oy, on = false;
  h.addEventListener('pointerdown', e => {
    if (e.target.closest('button') || window.innerWidth <= 640) return;
    on = true; const r = calcEl.getBoundingClientRect(); sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top; h.setPointerCapture(e.pointerId);
  });
  h.addEventListener('pointermove', e => {
    if (!on) return;
    const nx = Math.min(Math.max(0, ox + e.clientX - sx), window.innerWidth - calcEl.offsetWidth);
    const ny = Math.min(Math.max(0, oy + e.clientY - sy), window.innerHeight - 60);
    calcEl.style.left = nx + 'px'; calcEl.style.top = ny + 'px'; calcEl.style.right = 'auto';
  });
  h.addEventListener('pointerup', () => { on = false; });
})();
document.addEventListener('keydown', e => {
  if (calcEl.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
  const tag = (e.target.tagName || '').toLowerCase(); if (tag === 'input' || tag === 'textarea') return;
  const map = {'Enter':'=', '=':'=', 'Escape':'C', 'Backspace':'CE', 'Delete':'CE'};
  const k = map[e.key] || (/^[0-9.+\-*/()]$/.test(e.key) ? e.key : null);
  if (k){ e.preventDefault(); GRECalc.press(k); }
});

function afterRender(){
  if (!calcAllowed()) hideCalc();
  setTransferTarget();
  syncCalc();
}

/* ================= EVENTS ================= */
function setAns(v){
  if (route === 'practice' && P) P.ans = v;
  else if (route === 'test' && T && T.kind === 'q') T.answers[curQ().id] = v;
}
function getAns(){
  if (route === 'practice' && P) return P.ans;
  if (route === 'test' && T && T.kind === 'q') return T.answers[curQ().id];
}
function curQuestion(){
  if (route === 'practice' && P) return QBY[P.ids[P.i]];
  if (route === 'test' && T && T.kind === 'q') return curQ();
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  const H = ACTIONS[act];
  if (H){ if (el.tagName === 'A' && act !== 'tclose-go') e.preventDefault(); H(el, e); }
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset && e.target.dataset.act === 'sip'){ e.preventDefault(); ACTIONS.sip(e.target); }
});
document.addEventListener('input', e => {
  const t = e.target; const k = t.dataset && t.dataset.in;
  if (!k) return;
  if (k === 'num' || k === 'gap'){ setAns(t.value); const chk = $('[data-act="pcheck"]'); if (chk) chk.disabled = !answered(curQuestion(), t.value); }
  if (k === 'fn' || k === 'fd'){ const cur = Object.assign({}, getAns() || {}); cur[k === 'fn' ? 'n' : 'd'] = t.value; setAns(cur); const chk = $('[data-act="pcheck"]'); if (chk) chk.disabled = !answered(curQuestion(), cur); }
  if (k === 'form'){ T.answers[t.dataset.q] = t.value; }
  if (k === 'cam'){ const n = +t.dataset.n; if (CP && route === 'practice') CP.ans[n] = t.value; else if (T && T.kind === 'cam') T.answers[n] = t.value; }
  if (k === 'essay'){
    if (T.hist.length === 0 || Date.now() - (T.lastSnap || 0) > 1200){ T.hist.push(T.text); T.lastSnap = Date.now(); if (T.hist.length > 200) T.hist.shift(); T.fut = []; }
    T.text = t.value; S.drafts[T.task] = T.text; save();
    const min = TASKS[T.task].words || 0, n = wc(T.text); const w = $('#wc'); if (w){ w.textContent = n + ' words' + (min ? ' / ' + min : ''); w.classList.toggle('under', !!min && n < min); }
  }
  if (k === 'notes'){ T.notes = t.value; }
  if (k === 'vsearch'){ V.q = t.value; V.limit = 48; const g = $('#wordgrid'); if (g) g.innerHTML = vGrid(); const c = $('#vcount'); if (c) c.textContent = vFiltered().length + ' words'; }
});

const ACTIONS = {
  exam(el){ if (S.exam === el.dataset.exam) return; S.exam = el.dataset.exam; save(); P = null; V.fc = null; V.quiz = null;
    const h = (location.hash || '#home').slice(1); if (h.indexOf('lesson-') === 0) go('learn'); else render(); },
  theme(){ S.theme = S.theme === '' ? 'dark' : S.theme === 'dark' ? 'light' : ''; save(); if (S.theme) document.documentElement.setAttribute('data-theme', S.theme); else document.documentElement.removeAttribute('data-theme'); paint(); },
  campractice(el){ stopCamAudio(); P = null; T = null; stopTimer(); CP = {t:+el.dataset.t, s:+el.dataset.s, ans:{}, checked:false}; if (route === 'practice') render(); else go('practice'); },
  camcheck(){ CP.checked = true; for (let j = 1; j <= 10; j++){ const n = (CP.s - 1) * 10 + j; record(QBY['c8-' + CP.t + '-' + n], camCheck(CP.t, n, CP.ans).ok); } $$('audio').forEach(a => a.pause()); paint(); },
  camretry(){ CP.ans = {}; CP.checked = false; paint(); },
  camexit(){ CP = null; render(); },
  camtest(el){ if (T && route === 'test') return; stopTimer(); P = null; CP = null; const t = +el.dataset.t; loadCam(t).catch(() => {}); T = {kind:'cam', t, si:0, answers:{}, mode:'ready', hide:false, left:0, started:Date.now()}; go('test'); },
  camstart(){ const sec = CAM.tests[T.t - 1].sections[T.si]; camAudio.src = sec.audio; camAudio.currentTime = 0; camAudio.play().catch(() => {}); T.mode = 'q'; T.left = sec.dur + 60; startTimer(); paint(); },
  camnext(){ confirmBox(T.si < 3 ? 'Finish this part?' : 'Finish the test?', 'You can\'t return to this part afterwards.', 'Finish', camEndSection); },
  zoom(){ document.body.classList.toggle('zoom'); try { localStorage.setItem('greIeltsZoom', document.body.classList.contains('zoom') ? '1' : ''); } catch(e){} paint(); },
  showans(el){ $('#ans-pages').hidden = false; el.remove(); },
  kmfprac(el){ const n = +el.dataset.s; T = null; stopTimer(); startPractice(KMF_SEC[n].slice(), 'KMF Section ' + n + (n % 2 ? ' (Medium)' : ' (Hard)')); },
  kmftest(el){ if (T && route === 'test') return; loadKmf(+el.dataset.s).catch(() => {}); startTest('kmf' + el.dataset.s); },
  showsol(el){ const s = $('#exsol'); s.hidden = false; el.remove(); },
  learned(el){ const id = el.dataset.id; if (S.lessons[id]) delete S.lessons[id]; else S.lessons[id] = Date.now(); save(); paint(); },
  similar(el){ const t = el.dataset.topic; T = null; CP = null; stopTimer(); startPractice(orderForPractice(similarIds(t)), 'Practice: ' + LBY[t].title); },
  pmix(){ CP = null; startPractice(orderForPractice(examQs().map(q => q.id).sort(() => Math.random() - .5)), 'Mixed practice'); },
  psec(el){ const sec = SECTIONS[S.exam].find(s => s.id === el.dataset.sec); startPractice(orderForPractice(examQs().filter(q => q.sec === el.dataset.sec).map(q => q.id)), sec.name); },
  pmissed(){ startPractice(orderForPractice(openMistakes().map(m => m.id)), 'Missed questions'); },
  pick(el){
    const q = curQuestion(); if (!q) return; const i = +el.dataset.i;
    if (q.type === 'multi' || q.type === 'se'){ let a = (getAns() || []).slice(); a = a.includes(i) ? a.filter(x => x !== i) : a.concat([i]); if (q.type === 'se' && a.length > 2) a.shift(); setAns(a); }
    else setAns(i);
    paint();
  },
  tcpick(el){ const a = (getAns() || []).slice(); a[+el.dataset.b] = +el.dataset.i; setAns(a); paint(); },
  sip(el){ const q = curQuestion(); if (!q || q.type !== 'sip') return; setAns(+el.dataset.s); paint(); },
  pcheck(){
    const q = QBY[P.ids[P.i]];
    if (q.type === 'se' && (!P.ans || P.ans.length !== 2)){ /* allow check, feedback explains */ }
    P.checked = true; const ok = grade(q, P.ans); if (!q.nokey){ P.res[q.id] = ok; record(q, ok); } hideCalc(); paint();
    const fb = $('.fb'); if (fb) fb.scrollIntoView({behavior:'smooth', block:'nearest'});
  },
  pskip(){ ACTIONS.pnext(); },
  pnext(){ stopSpeech(); if (P.i + 1 < P.ids.length){ P.i++; P.ans = null; P.checked = false; render(); } else { P.done = true; render(); } },
  pexit(){ if (Object.keys(P.res).length){ P.done = true; } else P = null; stopSpeech(); render(); },
  pdone(){ P = null; render(); },
  calc(){ if (!calcAllowed()) return; calcEl.hidden = !calcEl.hidden; syncCalc(); },
  listen(el){
    if (!('speechSynthesis' in window)) return;
    if (route === 'test' && T && T.mode !== 'results'){ if (T.played) return; T.played = true; paint(); }
    playSet(el.dataset.set);
  },
  stoplisten(){ stopSpeech(); },
  starttest(el){ const id = el.dataset.test; if (T && route === 'test') return; startTest(id); },
  hidetime(){ T.hide = !T.hide; paint(); },
  mark(){ const id = curQ().id; if (T.marked[id]) delete T.marked[id]; else T.marked[id] = 1; paint(); },
  treview(){ T.mode = 'review'; paint(); window.scrollTo(0, 0); },
  goto(el){ T.qi = +el.dataset.n; T.mode = 'q'; paint(); window.scrollTo(0, 0); },
  tprev(){ if (T.qi > 0){ T.qi--; paint(); window.scrollTo(0, 0); } },
  tnext(){ const sec = curSection(); if (T.qi < sec.ids.length - 1){ T.qi++; paint(); window.scrollTo(0, 0); } },
  endsec(){
    const sec = curSection(); const un = sec.ids.filter(id => !answered(QBY[id], T.answers[id])).length;
    confirmBox('End this section?', (un ? `You have ${un} unanswered question${un > 1 ? 's' : ''}. A blank scores nothing, so guess if you can. ` : '') + 'You can\'t return to this section afterwards.', 'End section', endSection);
  },
  nextsection(){ T.mode = 'q'; startTimer(); paint(); window.scrollTo(0, 0); },
  texit(){ confirmBox('Leave the test?', 'Your answers in this attempt will not be scored.', 'Leave test', () => { stopTimer(); stopSpeech(); stopRec(); stopCamAudio(); T = null; hideCalc(); go('tests'); }); },
  tclose(){ T = null; stopTimer(); go('tests'); },
  'tclose-go'(el){ T = null; stopTimer(); },
  undo(){ if (!T.hist.length) return; T.fut.push(T.text); T.text = T.hist.pop(); S.drafts[T.task] = T.text; save(); paint(); },
  redo(){ if (!T.fut.length) return; T.hist.push(T.text); T.text = T.fut.pop(); S.drafts[T.task] = T.text; save(); paint(); },
  wfinish(){ confirmBox('Finish writing?', 'You will see a self-assessment checklist and a model answer.', 'Finish', finishWrite); },
  'sp-prep'(){ T.stage = 'prep'; T.left = TASKS[T.task].prep; startTimer(); paint(); },
  'sp-talk'(){ T.stage = 'talk'; T.left = TASKS[T.task].talk; startTimer(); paint(); },
  'sp-part3'(){ stopRec(); stopTimer(); T.stage = 'part3'; paint(); },
  'sp-done'(){ T.stage = 'done'; paint(); },
  'rec-start'(){ startRec(); },
  'rec-stop'(){ stopRec(); T.recMsg = 'Saved. You can listen after the long turn.'; setTimeout(paint, 50); },
  vtab(el){ V.tab = el.dataset.tab; if (V.tab === 'quiz') V.quiz = null; paint(); },
  'vtab-go'(el){ V.tab = el.dataset.tab; V.quiz = null; go('vocab'); },
  vtopic(el){ V.topic = el.dataset.topic; V.fc = null; V.quiz = null; V.limit = 48; paint(); },
  vletter(el){ V.letter = el.dataset.l; V.limit = 48; paint(); },
  vmore(){ V.limit += 96; const g = $('#wordgrid'); if (g) g.innerHTML = vGrid(); },
  say(el, e){ e.stopPropagation(); if (!say(el.dataset.say)) el.disabled = true; },
  vknown(el){ const id = el.dataset.id; const s = S.vocab[id] || {}; s.known = !s.known; if (s.known) s.due = false; S.vocab[id] = s; save(); paint(); },
  fcflip(){ V.fc.flip = true; paint(); },
  fcnext(el){ const id = V.fc.ids[V.fc.i]; const s = S.vocab[id] || {}; s.known = el.dataset.known === '1'; if (s.known) s.due = false; S.vocab[id] = s; save(); V.fc.i++; V.fc.flip = false; paint(); },
  fcrestart(){ V.fc = null; paint(); },
  qzpick(el){ const z = V.quiz; if (z.chosen != null) return; z.chosen = el.dataset.id; const it = z.items[z.i]; const s = S.vocab[it.id] || {};
    if (z.chosen === it.id){ z.score++; s.due = false; } else { s.due = true; s.known = false; s.miss = (s.miss || 0) + 1; }
    S.vocab[it.id] = s; save(); paint(); },
  qznext(){ V.quiz.i++; V.quiz.chosen = null; paint(); },
  qzrestart(){ V.quiz = null; paint(); },
  reset(){ confirmBox('Reset all progress?', 'This clears lessons read, answers, mistakes, vocabulary and drafts on this device. It can\'t be undone.', 'Reset', () => { const ex = S.exam, th = S.theme; S = defaults(); S.exam = ex; S.theme = th; save(); P = null; render(); }); }
};

/* ---------- install support when self-hosted ---------- */
if ('serviceWorker' in navigator && document.querySelector('link[rel="manifest"]')){
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
}

try { if (localStorage.getItem('greIeltsZoom')) document.body.classList.add('zoom'); } catch(e){}
render();
})();
