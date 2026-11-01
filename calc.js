/* GRE on-screen calculator — replicates ETS behaviour:
   order of operations, prefix square root, one memory, 8-digit display, ERROR rules, Transfer Display. */
(function(){
  const MAXD = 8;
  let tokens = [];      // committed: numbers, '+','-','*','/','(',')','sqrt'
  let entry = '';       // number being typed
  let shown = '0';      // display text
  let mem = null;       // memory value or null
  let err = false;
  let done = false;     // just pressed '='
  let result = 0;       // last '=' result
  let fresh = false;    // next digit starts a new entry (after MR / M+)
  let transferFn = null;
  let onChange = function(){};

  function isOp(t){ return t==='+'||t==='-'||t==='*'||t==='/'; }
  function digits(s){ return (s.replace(/[^0-9]/g,'')).length; }

  // ---------- evaluation ----------
  function evaluate(list){
    let i = 0;
    function peek(){ return list[i]; }
    function next(){ return list[i++]; }
    function factor(){
      const t = next();
      if (t === 'sqrt'){ const v = factor(); if (v < 0) throw new Error('E'); return Math.sqrt(v); }
      if (t === '('){ const v = expr(); if (peek() === ')') next(); return v; }
      if (typeof t === 'number') return t;
      throw new Error('E');
    }
    function term(){
      let v = factor();
      while (peek()==='*' || peek()==='/'){
        const op = next(); const r = factor();
        if (op === '/'){ if (r === 0) throw new Error('E'); v = v / r; } else v = v * r;
      }
      return v;
    }
    function expr(){
      let v = term();
      while (peek()==='+' || peek()==='-'){ const op = next(); const r = term(); v = op==='+' ? v + r : v - r; }
      return v;
    }
    const v = expr();
    if (!isFinite(v)) throw new Error('E');
    return v;
  }

  function format(v){
    if (!isFinite(v) || Math.abs(v) > 99999999) return null;
    if (Math.abs(v) < 0.0000001) return '0';
    const intDigits = Math.max(1, Math.floor(Math.log10(Math.abs(v))) + 1);
    const dec = Math.max(0, MAXD - intDigits);
    let s = (Math.round(v * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
    if (s.indexOf('.') >= 0) s = s.replace(/0+$/,'').replace(/\.$/,'');
    if (digits(s) > MAXD) return null;
    if (s === '-0') s = '0';
    return s;
  }

  function setError(){ err = true; shown = 'ERROR'; tokens = []; entry = ''; }
  function show(v){ const s = format(v); if (s === null){ setError(); return false; } shown = s; return true; }

  // value of a slice, ignoring a trailing operator / unclosed parens
  function evalSlice(list){
    const l = list.slice();
    while (l.length && (isOp(l[l.length-1]) || l[l.length-1]==='(' || l[l.length-1]==='sqrt')) l.pop();
    if (!l.length) return null;
    let open = 0; l.forEach(t=>{ if(t==='(') open++; if(t===')') open--; });
    while (open-- > 0) l.push(')');
    return evaluate(l);
  }

  // start index of the current parenthesis level
  function levelStart(){
    let depth = 0;
    for (let k = tokens.length - 1; k >= 0; k--){
      if (tokens[k] === ')') depth++;
      else if (tokens[k] === '('){ if (depth === 0) return k + 1; depth--; }
    }
    return 0;
  }
  // start index of the last + or − term at the current level
  function termStart(){
    let depth = 0; const ls = levelStart();
    for (let k = tokens.length - 1; k >= ls; k--){
      if (tokens[k] === ')') depth++;
      else if (tokens[k] === '(') depth--;
      else if (depth === 0 && (tokens[k]==='+' || tokens[k]==='-')) return k + 1;
    }
    return ls;
  }

  function commitEntry(){
    if (entry !== '' && entry !== '-'){ tokens.push(parseFloat(entry)); }
    entry = '';
  }
  function lastTok(){ return tokens[tokens.length-1]; }

  // ---------- keys ----------
  function press(k){
    if (k === 'C'){ tokens=[]; entry=''; shown='0'; err=false; done=false; fresh=false; result=0; return onChange(); }
    if (err) return onChange();

    if (/^[0-9]$/.test(k) || k === '.'){
      if (done){ tokens=[]; done=false; entry=''; }
      if (fresh){ entry=''; fresh=false; }
      if (lastTok() === ')') return onChange();          // no implicit multiplication
      if (k === '.'){
        if (entry.indexOf('.') >= 0) return onChange();
        entry = (entry===''||entry==='-') ? entry + '0.' : entry + '.';
      } else {
        if (digits(entry) >= MAXD) return onChange();
        entry = (entry === '0') ? k : (entry === '-0' ? '-' + k : entry + k);
      }
      shown = entry; return onChange();
    }

    if (isOp(k)){
      if (done){ tokens=[result]; done=false; entry=''; }
      fresh = false;
      if (entry !== '' && entry !== '-') commitEntry();
      else { entry=''; if (isOp(lastTok())) tokens.pop(); else if (!tokens.length || lastTok()==='(' || lastTok()==='sqrt'){ if (lastTok()==='(' || lastTok()==='sqrt') return onChange(); tokens.push(parseFloat(shown)||0); } }
      try {
        const start = (k==='+'||k==='-') ? levelStart() : termStart();
        const v = evalSlice(tokens.slice(start));
        if (v !== null && !show(v)) return onChange();
      } catch(e){ setError(); return onChange(); }
      tokens.push(k); return onChange();
    }

    if (k === '('){
      if (done){ tokens=[]; done=false; }
      if (entry !== '' || lastTok()===')' || typeof lastTok()==='number') return onChange();
      tokens.push('('); return onChange();
    }

    if (k === ')'){
      let open = 0; tokens.forEach(t=>{ if(t==='(') open++; if(t===')') open--; });
      if (open <= 0) return onChange();
      if (entry !== '' && entry !== '-') commitEntry();
      const lt = lastTok(); if (isOp(lt) || lt==='(' || lt==='sqrt') return onChange();
      tokens.push(')');
      // show the bracket's value
      let depth = 0, s = tokens.length - 1;
      for (; s >= 0; s--){ if (tokens[s]===')') depth++; else if (tokens[s]==='('){ depth--; if (depth===0) break; } }
      try { show(evaluate(tokens.slice(s))); } catch(e){ setError(); }
      return onChange();
    }

    if (k === 'sqrt'){
      if (done){ tokens=[]; done=false; entry=''; }
      if (fresh){ entry=''; fresh=false; }
      if (entry !== '' || lastTok()===')' || typeof lastTok()==='number') return onChange();
      tokens.push('sqrt'); shown = '√'; return onChange();
    }

    if (k === '='){
      if (done) return onChange();
      if (entry !== '' && entry !== '-') commitEntry();
      fresh = false;
      while (tokens.length && (isOp(lastTok()) || lastTok()==='(' || lastTok()==='sqrt')) tokens.pop();
      if (!tokens.length){ done = true; result = parseFloat(shown)||0; return onChange(); }
      let open = 0; tokens.forEach(t=>{ if(t==='(') open++; if(t===')') open--; });
      while (open-- > 0) tokens.push(')');
      try {
        const v = evaluate(tokens);
        if (show(v)){ result = parseFloat(shown); done = true; tokens = []; }
      } catch(e){ setError(); }
      return onChange();
    }

    if (k === 'neg'){
      if (done){ result = -result; show(result); return onChange(); }
      if (entry !== ''){ entry = entry[0]==='-' ? entry.slice(1) : '-' + entry; shown = entry === '-' ? '-0' : entry; }
      return onChange();
    }

    if (k === 'CE'){
      entry = ''; shown = '0'; fresh = false;
      if (done){ result = 0; }
      return onChange();
    }

    if (k === 'M+'){
      const v = parseFloat(shown); if (isNaN(v)) return onChange();
      const nm = (mem === null ? 0 : mem) + v;
      if (format(nm) === null){ setError(); return onChange(); }
      mem = nm; fresh = true; return onChange();
    }
    if (k === 'MR'){
      if (mem === null) return onChange();
      if (done){ tokens=[]; done=false; }
      if (lastTok() === ')') return onChange();
      entry = format(mem); shown = entry; fresh = true; return onChange();
    }
    if (k === 'MC'){ mem = null; return onChange(); }
    return onChange();
  }

  window.GRECalc = {
    press,
    display: function(){ return shown; },
    hasMemory: function(){ return mem !== null; },
    isError: function(){ return err; },
    onChange: function(fn){ onChange = fn || function(){}; },
    setTransfer: function(fn){ transferFn = fn || null; onChange(); },
    canTransfer: function(){ return !!transferFn && !err; },
    transfer: function(){ if (transferFn && !err) transferFn(shown); },
    reset: function(){ tokens=[]; entry=''; shown='0'; err=false; done=false; fresh=false; result=0; mem=null; onChange(); }
  };
})();
