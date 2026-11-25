/* core/live.js v1.1.0 (CORE-10) real-time playback for time-based sims
   Live.player(chart, {mount, tMax, tMin, unit, ms, fmt, events, onFrame, cursorLabel, baseVlines})
   - เล่นผลของ model ไล่ตามเวลา: clip กราฟถึงเวลาปัจจุบัน + cursor + process log ที่ขึ้นทีละเหตุการณ์
   - load(cfg) เริ่มใหม่จาก 0 แล้วเล่นอัตโนมัติ (capture, reduced motion = ข้ามไปจบทันที)
   - events: [{t, text, kind:"rx"|"phys"|"warn"|"ok"}] ข้อความใน log เป็น UI (ไทยได้) ส่วน cursorLabel อยู่ในภาพ ต้องเป็นอังกฤษ
   - v1.1: chart เป็น null ได้ (ใช้ขับ animation SVG เองผ่าน onFrame)
   - API: load, play, pause, toggle, seek(t), end(), restart(), t(), playing(), setSpeed(x), destroy() */
(function(){
"use strict";
var CSS = ".live-bar{display:flex;align-items:center;gap:8px;margin:8px 0 2px;font-size:13px}"+
".live-bar button{border:1px solid var(--line-strong);background:var(--card);color:var(--ink);border-radius:999px;height:30px;min-width:30px;padding:0 10px;font:inherit;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}"+
".live-bar button:hover{border-color:var(--ink)}.live-bar button.pp{background:var(--ink);color:#fff;border-color:var(--ink);min-width:38px}"+
".live-bar input[type=range]{flex:1;min-width:60px;accent-color:var(--accent)}"+
".live-bar .lt{font-family:var(--mono,monospace);color:var(--muted);min-width:72px;text-align:right;white-space:nowrap}"+
".live-bar .sp{min-width:40px;font-family:var(--mono,monospace)}"+
".live-log{list-style:none;margin:6px 0 0;padding:0;max-height:118px;overflow:auto;font-size:13px;border-top:1px solid var(--line)}"+
".live-log li{display:grid;grid-template-columns:72px 1fr;gap:8px;padding:5px 2px;border-bottom:1px solid var(--line);animation:livein .35s ease}"+
".live-log li b{font-family:var(--mono,monospace);font-weight:500;color:var(--muted)}"+
".live-log li.rx span{color:var(--accent)}.live-log li.warn span{color:var(--red)}.live-log li.ok span{color:var(--teal)}"+
".live-log li.now{background:var(--accent-soft)}.live-log .empty{color:var(--faint);grid-template-columns:1fr}"+
".live-log li.still{animation:none}"+
"@keyframes livein{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}"+
"body.present .live-log{max-height:62px;font-size:12px}body.present .live-log li{padding:3px 2px}body.present .live-bar{margin:4px 0 0}"+
"body.capture .live-bar{display:none}"+
"@media (prefers-reduced-motion:reduce){.live-log li{animation:none}}";
function css(){ if(document.getElementById("live-css")) return; var s=document.createElement("style"); s.id="live-css"; s.textContent=CSS; document.head.appendChild(s); }
function el(tag,attrs,kids){ var e=document.createElement(tag); for(var k in attrs||{}){ if(k==="text") e.textContent=attrs[k]; else if(k==="class") e.className=attrs[k]; else e.setAttribute(k,attrs[k]); } (kids||[]).forEach(function(c){ if(c) e.appendChild(c); }); return e; }

function player(chart, cfg){
  css();
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var q = (location.search||"");
  var instant = reduce || /capture=1/.test(q) || document.body.classList.contains("capture");
  var C = {}, t = 0, playing = false, raf = null, last = null, speed = 1, deb = null, shown = -1;
  var mount = typeof cfg.mount==="string" ? document.getElementById(cfg.mount) : cfg.mount;
  var pp = el("button",{class:"pp",type:"button","aria-label":"Play or pause",text:"❚❚"});
  var rs = el("button",{type:"button","aria-label":"Restart",text:"↺"});
  var rg = el("input",{type:"range",min:"0",max:"1000",step:"1",value:"0","aria-label":"Time"});
  var lt = el("span",{class:"lt",text:""});
  var sp = el("button",{class:"sp",type:"button","aria-label":"Playback speed",text:"1x"});
  var bar = el("div",{class:"live-bar"},[pp,rs,rg,lt,sp]);
  var log = el("ol",{class:"live-log","aria-live":"polite"});
  mount.appendChild(bar); if(cfg.log!==false) mount.appendChild(log);
  pp.addEventListener("click",function(){ api.toggle(); });
  rs.addEventListener("click",function(){ api.restart(); });
  sp.addEventListener("click",function(){ api.setSpeed(speed===1?2:speed===2?4:speed===4?0.5:1); });
  rg.addEventListener("input",function(){ api.pause(); api.seek(C.tMin + (C.tMax-C.tMin)*rg.value/1000); });
  function num(x){ return C.num ? C.num(x) : String(x<10&&x%1?Math.round(x*10)/10:Math.round(x)); }
  function fmt(x){ return C.fmt ? C.fmt(x) : num(x)+(C.unit?" "+C.unit:""); }
  function item(e,anim){ var li=el("li",{class:(e.kind||"")+(anim?"":" still")},[el("b",{text:fmt(e.t)}),el("span",{text:e.text})]); return li; }
  function renderLog(){
    var ev = C.events||[], n = 0; for(var i=0;i<ev.length;i++) if(ev[i].t<=t+1e-9) n=i+1;
    if(n===shown) return;
    if(!n){ log.innerHTML=""; log.appendChild(el("li",{class:"empty"},[el("span",{text:C.empty||"กด ▶ เพื่อดูเหตุการณ์ตามเวลา"})])); shown=0; return; }
    if(shown>0&&n>shown){ for(var j=shown;j<n;j++) log.appendChild(item(ev[j],true)); }
    else { log.innerHTML=""; for(var k=0;k<n;k++) log.appendChild(item(ev[k],false)); }
    shown = n;
    [].forEach.call(log.children,function(li,ix){ li.classList.toggle("now",ix===n-1); });
    log.scrollTop = log.scrollHeight;
  }
  function frame(){
    var u = (t-C.tMin)/((C.tMax-C.tMin)||1);
    if(chart){ chart.progress = Math.max(0.001,Math.min(1,u));
      var vl = (C.baseVlines||[]).slice();
      if(u<0.999) vl.push({x:t,label:C.cursorLabel?C.cursorLabel(t):"",color:(window.Plot&&Plot.colors.accent)||"#5B4BFF",dash:[2,3],width:1.5});
      chart.opts.vlines = vl; }
    if(C.onFrame) C.onFrame(t, u>=0.999);
    if(chart) chart.draw();
    rg.value = String(Math.round(u*1000)); lt.textContent = num(t)+" / "+num(C.tMax)+(C.unit?" "+C.unit:"");
    renderLog();
  }
  function tick(ts){
    if(!playing) return;
    if(last===null) last = ts;
    var dt = Math.min(100, ts-last); last = ts;
    t += (C.tMax-C.tMin) * dt/(C.ms||8000) * speed;
    if(t>=C.tMax){ t=C.tMax; playing=false; pp.textContent="▶"; frame(); return; }
    frame(); raf = requestAnimationFrame(tick);
  }
  var api = {
    load:function(c){
      for(var k in c) C[k]=c[k];
      if(C.tMin===undefined) C.tMin=0;
      shown=-1;
      if(instant){ t=C.tMax; playing=false; pp.textContent="▶"; frame(); return api; }
      /* debounce slider drags: แสดงผลจบไว้ก่อน แล้วเริ่มเล่นใหม่เมื่อหยุดลาก */
      clearTimeout(deb);
      if(c.debounce){ api.pause(); t=C.tMax; frame(); deb=setTimeout(function(){ api.restart(); },450); }
      else api.restart();
      return api;
    },
    play:function(){ if(t>=C.tMax) t=C.tMin; playing=true; last=null; pp.textContent="❚❚"; cancelAnimationFrame(raf); raf=requestAnimationFrame(tick); return api; },
    pause:function(){ playing=false; pp.textContent="▶"; cancelAnimationFrame(raf); return api; },
    toggle:function(){ return playing?api.pause():api.play(); },
    restart:function(){ t=C.tMin; shown=-1; frame(); return api.play(); },
    seek:function(x){ t=Math.max(C.tMin,Math.min(C.tMax,x)); frame(); return api; },
    end:function(){ api.pause(); t=C.tMax; frame(); return api; },
    setSpeed:function(x){ speed=x; sp.textContent=(x<1?"½":x)+"x"; return api; },
    t:function(){ return t; }, playing:function(){ return playing; },
    bar:bar, log:log,
    destroy:function(){ api.pause(); bar.remove(); log.remove(); }
  };
  document.addEventListener("keydown",function(e){ if(e.key===" "&&!/INPUT|SELECT|BUTTON|TEXTAREA/.test((e.target||{}).tagName||"")){ e.preventDefault(); api.toggle(); } });
  document.addEventListener("visibilitychange",function(){ if(document.hidden) api.pause(); });
  return api;
}
/* หาเหตุการณ์ข้ามเกณฑ์ใน series [[t,y]] คืน t แรกที่ y ข้าม threshold (dir 1 ขึ้น, -1 ลง) */
function cross(data, thr, dir){ for(var i=1;i<data.length;i++){ var a=data[i-1][1], b=data[i][1]; if(dir>=0 ? (a<thr&&b>=thr) : (a>thr&&b<=thr)) return data[i-1][0] + (data[i][0]-data[i-1][0])*(thr-a)/((b-a)||1); } return null; }
function valueAt(data, x){ if(!data.length) return null; if(x<=data[0][0]) return data[0][1]; for(var i=1;i<data.length;i++){ if(data[i][0]>=x){ var a=data[i-1], b=data[i]; return a[1]+(b[1]-a[1])*(x-a[0])/((b[0]-a[0])||1); } } return data[data.length-1][1]; }
window.Live = {player:player, cross:cross, valueAt:valueAt, version:"1.1.0"};
})();
