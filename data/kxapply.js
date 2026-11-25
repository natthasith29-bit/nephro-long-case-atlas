/* Merge KEYX (kx1-kx6) into TREES node keys, de-duplicated. Load after all kx files. */
/* ---------- merge KEYX into TREES ---------- */
(function(){
  const K = window.KEYX || {};
  const T = window.TREES || {};
  Object.keys(K).forEach(tid => {
    const tree = T[tid]; if(!tree) return;
    const map = K[tid];
    (function walk(n){
      if((n.tag==="nephro"||n.tag==="adj") && map[n.t]){
        const have = (n.keys||[]).slice();
        const seen = new Set(have.map(x=>x.toLowerCase().trim()));
        map[n.t].forEach(x=>{ const k=x.toLowerCase().trim(); if(!seen.has(k)){ seen.add(k); have.push(x); } });
        n.keys = have;
      }
      (n.k||[]).forEach(walk);
    })(tree.tree);
  });
})();
