/* CORE-01 Template shell (v1.4.0)
   Header, scenario chips, findings table, take-home, next-step quiz, footer, presentation mode.
   Rule: backward-compatible changes only (add functions, never change existing signatures).

   Usage in sims/CODE.html:
     <link rel="stylesheet" href="../core/core.css">
     <main class="sim" id="sim"><section class="bench">...your visual + readouts...</section></main>
     <script src="../core/shell.js"></script>
     <script>
       var S = { normal:{name:"...", rows:[["label","text"]], take:["..."], quiz:[...]}, ... };
       Sim.mount({code:"HD-04", title:"Urea Kinetics and Adequacy", lead:"คำสั่ง 1 บรรทัด",
                  scenarios:S, order:["normal",...], onChange:function(key,s){ ...redraw... },
                  quiz:[{q:"...", opts:["..."], ans:1, why:"..."}],   // global, used when scenario has no quiz
                  refs:["KDOQI ...", "..."], note:"ค่าในหน้านี้เป็นค่าตัวอย่างเพื่อการสอน"});
     </script>
*/
(function(){
"use strict";
var Sim = window.Sim = window.Sim || {};
Sim.version = "1.4.0";
Sim.reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
var qs = {};
try { location.search.replace(/^\?/,"").split("&").forEach(function(p){ if(!p) return; var kv=p.split("="); qs[decodeURIComponent(kv[0])]=decodeURIComponent(kv[1]||""); }); } catch(e){}
Sim.query = qs;
Sim.present = qs.present === "1" || qs.capture === "1";
/* v1.2.0 capture mode (?capture=1, implies present): clean 16:9 frame for PNG/MP4 export to Canva (tools/export.js).
   Hides the present-bar. Exporter reads Sim.ready, Sim.order(), Sim.code(), Sim.captureMs(). */
Sim.capture = qs.capture === "1";
Sim.ready = false;

var SVGNS = "http://www.w3.org/2000/svg";
/* SVG element helper: Sim.svg("line",{x1:0,...}, parent) */
Sim.svg = function(tag, attrs, parent){
  var e = document.createElementNS(SVGNS, tag);
  if(attrs) for(var k in attrs){ if(k==="text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
  if(parent) parent.appendChild(e);
  return e;
};
/* HTML element helper: Sim.h("div",{class:"card", text:"...", on:{click:fn}}, [children]) */
Sim.h = function(tag, attrs, kids){
  var e = document.createElement(tag);
  if(attrs) for(var k in attrs){
    var v = attrs[k];
    if(k==="text") e.textContent = v;
    else if(k==="class") e.className = v;
    else if(k==="on") for(var ev in v) e.addEventListener(ev, v[ev]);
    else if(v!==null && v!==undefined && v!==false) e.setAttribute(k, v===true?"":v);
  }
  if(kids) (Array.isArray(kids)?kids:[kids]).forEach(function(c){ if(c==null) return; e.appendChild(typeof c==="string"?document.createTextNode(c):c); });
  return e;
};
/* Number format with fixed decimals and thousands separator */
Sim.fmt = function(n, d){
  if(n===null || n===undefined || isNaN(n)) return "-";
  var s = Number(n).toFixed(d===undefined?0:d), parts = s.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
Sim.clamp = function(x,a,b){ return Math.max(a, Math.min(b, x)); };
/* Readout tile: <div class="ro" id="roX"><b>-</b><span>label</span></div>
   Sim.ro("roX", "1.2", "flag"|"ok"|true|false) */
Sim.ro = function(id, val, state){
  var e = typeof id==="string" ? document.getElementById(id) : id;
  if(!e) return;
  var b = e.querySelector("b"); if(b) b.textContent = val;
  e.classList.toggle("flag", state===true || state==="flag");
  e.classList.toggle("ok", state==="ok");
};
/* Build a readout tile element */
Sim.roTile = function(id, label){ return Sim.h("div",{class:"ro",id:id},[Sim.h("b",{text:"-"}), Sim.h("span",{text:label})]); };
/* Range control row. opts: {id,label,min,max,step,value,unit,fmt(v),onInput(v)} returns {el,input,get,set} */
Sim.slider = function(opts){
  var inp = Sim.h("input",{type:"range",id:opts.id,min:opts.min,max:opts.max,step:opts.step||1,value:opts.value});
  var out = Sim.h("output",{"for":opts.id});
  function show(){ var v=parseFloat(inp.value); out.textContent=(opts.fmt?opts.fmt(v):v)+(opts.unit?" "+opts.unit:""); }
  inp.addEventListener("input", function(){ show(); if(opts.onInput) opts.onInput(parseFloat(inp.value)); });
  show();
  var row = Sim.h("div",{class:"ctl"},[Sim.h("label",{"for":opts.id,text:opts.label}), inp, out]);
  return {el:row, input:inp, get:function(){return parseFloat(inp.value);}, set:function(v){inp.value=v;show();}};
};
/* Toggle button with aria-pressed. returns button; cb(state) */
Sim.toggle = function(label, cb, initial){
  var on = !!initial;
  var b = Sim.h("button",{class:"tog",type:"button","aria-pressed":on?"true":"false",text:label});
  b.addEventListener("click", function(){ on=!on; b.setAttribute("aria-pressed",on?"true":"false"); if(cb) cb(on); });
  b.setState = function(v){ on=!!v; b.setAttribute("aria-pressed",on?"true":"false"); };
  return b;
};

/* ---------------- mount ---------------- */
var cfg = null, cur = null, els = {};
Sim.current = function(){ return cur; };
Sim.scenario = function(){ return cfg && cfg.scenarios[cur]; };

Sim.mount = function(c){
  cfg = c;
  var order = cfg.order || Object.keys(cfg.scenarios);
  cfg.order = order;
  document.title = "[" + cfg.code + "] " + cfg.title;
  document.documentElement.lang = document.documentElement.lang || "th";

  var main = document.getElementById("sim") || document.querySelector("main");
  if(!main){ main = Sim.h("main",{class:"sim",id:"sim"}); document.body.appendChild(main); }
  main.classList.add("sim");

  // stage wrapper (used by presentation mode)
  var stage = Sim.h("div",{id:"stage"});
  main.parentNode.insertBefore(stage, main);

  // header
  var hub = cfg.hub || "../index.html";
  els.header = Sim.h("header",{class:"sim-header"},[
    Sim.h("div",{class:"row"},[
      Sim.h("div",{class:"ttl"},[
        Sim.h("h1",{},[Sim.h("span",{class:"code-badge",text:cfg.code}), cfg.title]),
        cfg.lead ? Sim.h("p",{text:cfg.lead}) : null
      ]),
      (function(){ var a=Sim.h("a",{class:"back",href:"../index.html",text:"← Back to Long Case Atlas"}); a.addEventListener("click",function(e){ if(history.length>1){ e.preventDefault(); history.back(); } }); return a; })(),
      (Sim.capture || cfg.exportButton===false) ? null : buildExport()
    ])
  ]);
  stage.appendChild(els.header);
  stage.appendChild(main);

  // chips
  els.chips = Sim.h("div",{class:"chips",role:"group","aria-label":"Scenario"});
  order.forEach(function(k){
    els.chips.appendChild(Sim.h("button",{class:"chip",type:"button","data-k":k,"aria-pressed":"false",text:cfg.scenarios[k].name,on:{click:function(){ Sim.setScenario(k); }}}));
  });
  main.insertBefore(els.chips, main.firstChild);

  // findings + take-home
  if(cfg.findings !== false){
    els.fTitle = Sim.h("h2",{text:"Findings"});
    els.fTable = Sim.h("table",{class:"ft"});
    els.take = Sim.h("div",{class:"take"});
    main.appendChild(Sim.h("section",{class:"find"},[Sim.h("div",{class:"card"},[els.fTitle, els.fTable]), els.take]));
  }
  // quiz
  els.quiz = Sim.h("section",{class:"quiz","aria-label":"Next step"});
  main.appendChild(els.quiz);

  // footer
  var refs = cfg.refs ? (Array.isArray(cfg.refs)?cfg.refs:[cfg.refs]) : [];
  var foot = Sim.h("footer",{class:"sim-foot"});
  if(cfg.note) foot.appendChild(Sim.h("p",{text:cfg.note,style:"margin:0 0 6px"}));
  if(refs.length){ var ol = Sim.h("ol",{class:"refs"}); refs.forEach(function(r){ ol.appendChild(Sim.h("li",{text:r})); }); foot.appendChild(Sim.h("div",{},[Sim.h("b",{text:"References"}), ol])); }
  foot.appendChild(Sim.h("div",{class:"meta",text:"[" + cfg.code + "] Nephrology Simulator Hub | เพื่อการเรียนการสอน ไม่ใช้แทนการตัดสินใจทางคลินิก | Created by Natthasith Trakarnsrisunran"}));
  stage.appendChild(foot);

  // presentation mode
  if(Sim.present){
    document.body.classList.add("present");
    stage.appendChild(Sim.h("div",{class:"present-bar",text:"← → เปลี่ยน scenario | " + cfg.code}));
    var fit = function(){ var s = Math.min(window.innerWidth/1600, window.innerHeight/900); stage.style.transform = "scale(" + s + ")"; };
    window.addEventListener("resize", fit); fit();
    if(Sim.capture) document.body.classList.add("capture");
  }

  // keyboard: arrows cycle scenarios (not while typing or on a slider/select)
  document.addEventListener("keydown", function(ev){
    var t = ev.target && ev.target.tagName;
    if(t==="INPUT" || t==="SELECT" || t==="TEXTAREA" || ev.altKey || ev.ctrlKey || ev.metaKey) return;
    var i = order.indexOf(cur);
    if(ev.key==="ArrowRight"){ Sim.setScenario(order[(i+1)%order.length]); ev.preventDefault(); }
    else if(ev.key==="ArrowLeft"){ Sim.setScenario(order[(i-1+order.length)%order.length]); ev.preventDefault(); }
  });

  // initial scenario: ?s=key, then #key, then cfg.initial, then first
  var start = (qs.s && cfg.scenarios[qs.s]) ? qs.s : (location.hash && cfg.scenarios[location.hash.slice(1)]) ? location.hash.slice(1) : (cfg.initial || order[0]);
  window.addEventListener("hashchange", function(){ var k = location.hash.slice(1); if(cfg.scenarios[k] && k!==cur) Sim.setScenario(k); });
  Sim.setScenario(start, true);
  Sim.ready = true;
  try { document.dispatchEvent(new CustomEvent("sim:ready",{detail:{code:cfg.code}})); } catch(e){}
};

/* ---------------- v1.4.0 on-demand 16:9 export (Nat, 20 Nov 2026) ----------------
   One button in every sim header. Keeps the user's current slider and toggle state.
   PNG: switches the page into the 16:9 capture layout, grabs one frame of this tab with
   getDisplayMedia (Chrome: preferCurrentTab + Region Capture crop to #stage), downloads CODE_scenario.png.
   Video: same stream recorded 8 s with MediaRecorder, downloads CODE_scenario.webm (Canva accepts WebM).
   View only: shows the 16:9 frame so the user can use the device screenshot (fallback on mobile/Safari).
   Opt out per page with Sim.mount({exportButton:false}). Not shown in ?capture=1 (tools/export.js). */
var ex = {on:false, prevPresent:false};
function stageEl(){ return document.getElementById("stage"); }
function exFit(){ var st = stageEl(); if(!st) return; var s = Math.min(window.innerWidth/1600, window.innerHeight/900); st.style.transform = "scale(" + s + ")"; }
function enterFrame(){
  if(ex.on) return; ex.on = true; ex.prevPresent = document.body.classList.contains("present");
  document.body.classList.add("present","capture","exporting");
  exFit(); window.addEventListener("resize", exFit);
  try { window.dispatchEvent(new Event("resize")); } catch(e){}
}
function exitFrame(){
  if(!ex.on) return; ex.on = false;
  document.body.classList.remove("exporting","capture");
  if(!ex.prevPresent){ document.body.classList.remove("present"); var st = stageEl(); if(st) st.style.transform = ""; window.removeEventListener("resize", exFit); }
  else exFit();
  hideHint();
  try { window.dispatchEvent(new Event("resize")); } catch(e){}
}
function wait(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }
function fileBase(){ return (cfg.code || "SIM") + "_" + (cur || "scenario"); }
function download(blob, name){
  var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 1500);
}
var toastEl = null, hintEl = null;
function toast(msg){
  if(!toastEl){ toastEl = Sim.h("div",{class:"sim-toast",role:"status"}); document.body.appendChild(toastEl); }
  toastEl.textContent = msg; toastEl.classList.add("show");
  clearTimeout(toastEl._t); toastEl._t = setTimeout(function(){ toastEl.classList.remove("show"); }, 3200);
}
function showHint(){
  if(!hintEl){
    hintEl = Sim.h("div",{class:"sim-exhint"},[Sim.h("span",{text:"มุมมอง 16:9 พร้อม screenshot"}), Sim.h("button",{type:"button",text:"ออก (Esc)",on:{click:exitFrame}})]);
    document.body.appendChild(hintEl);
  }
  hintEl.classList.add("show"); clearTimeout(hintEl._t); hintEl._t = setTimeout(function(){ if(hintEl) hintEl.classList.add("dim"); }, 2500);
}
function hideHint(){ if(hintEl){ hintEl.classList.remove("show","dim"); } }
document.addEventListener("keydown", function(e){ if(e.key==="Escape" && ex.on) exitFrame(); });

function canCapture(){ return !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia); }
function openStream(){
  return navigator.mediaDevices.getDisplayMedia({video:{frameRate:30, displaySurface:"browser"}, audio:false, preferCurrentTab:true, selfBrowserSurface:"include", surfaceSwitching:"exclude"});
}
function cropInfo(track){
  // Region Capture (Chrome): crop the stream to #stage. Otherwise crop the frame by the stage rectangle.
  if(window.CropTarget && CropTarget.fromElement && track.cropTo){
    return CropTarget.fromElement(stageEl()).then(function(t){ return track.cropTo(t); }).then(function(){ return {cropped:true}; }).catch(function(){ return {cropped:false}; });
  }
  return Promise.resolve({cropped:false});
}
function exportPNG(){
  if(!canCapture()){ enterFrame(); showHint(); toast("Browser นี้บันทึกภาพเองไม่ได้ ใช้ screenshot ของเครื่องแทน"); return; }
  var stream, track, video;
  enterFrame();
  wait(Math.min(Sim.captureMs(), 1500)).then(openStream).then(function(sv){
    stream = sv; track = stream.getVideoTracks()[0];
    return cropInfo(track);
  }).then(function(ci){
    video = document.createElement("video"); video.muted = true; video.playsInline = true; video.srcObject = stream;
    return video.play().then(function(){ return wait(500); }).then(function(){ return ci; });
  }).then(function(ci){
    var vw = video.videoWidth, vh = video.videoHeight, sx = 0, sy = 0, sw = vw, sh = vh;
    if(!ci.cropped){
      var r = stageEl().getBoundingClientRect(), k = vw / window.innerWidth;
      sx = r.left*k; sy = r.top*k; sw = r.width*k; sh = r.height*k;
    }
    var outW = Math.max(1600, Math.round(sw)), outH = Math.round(outW*9/16);
    var c = document.createElement("canvas"); c.width = outW; c.height = outH;
    var g = c.getContext("2d"); g.imageSmoothingQuality = "high"; g.drawImage(video, sx, sy, sw, sh, 0, 0, outW, outH);
    track.stop();
    exitFrame();
    c.toBlob(function(b){ download(b, fileBase() + ".png"); toast("บันทึก " + fileBase() + ".png แล้ว"); }, "image/png");
  }).catch(function(){
    if(track) track.stop();
    exitFrame(); toast("ยกเลิกการบันทึก หรือ browser ไม่อนุญาต ลองใช้ \"ดูแบบ 16:9\" แล้ว screenshot");
  });
}
function exportVideo(secs){
  secs = secs || 8;
  if(!canCapture() || !window.MediaRecorder){ enterFrame(); showHint(); toast("Browser นี้อัดวิดีโอเองไม่ได้ ใช้ screen recording ของเครื่องแทน"); return; }
  var stream, track;
  enterFrame();
  wait(600).then(openStream).then(function(sv){ stream = sv; track = stream.getVideoTracks()[0]; return cropInfo(track); }).then(function(){
    var mime = ["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"].filter(function(m){ return MediaRecorder.isTypeSupported(m); })[0] || "";
    var rec = new MediaRecorder(stream, mime ? {mimeType:mime, videoBitsPerSecond:6000000} : undefined), chunks = [];
    rec.ondataavailable = function(e){ if(e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = function(){ track.stop(); exitFrame(); download(new Blob(chunks,{type:"video/webm"}), fileBase() + ".webm"); toast("บันทึก " + fileBase() + ".webm (" + secs + " วินาที) แล้ว"); };
    rec.start(250); setTimeout(function(){ if(rec.state!=="inactive") rec.stop(); }, secs*1000);
  }).catch(function(){ if(track) track.stop(); exitFrame(); toast("ยกเลิกการอัดวิดีโอ"); });
}
function buildExport(){
  var menu = Sim.h("div",{class:"sim-exmenu",role:"menu"});
  var wrap = Sim.h("div",{class:"sim-export"});
  var btn = Sim.h("button",{class:"sim-exbtn",type:"button","aria-haspopup":"true","aria-expanded":"false",text:"Export 16:9"});
  function close(){ wrap.classList.remove("open"); btn.setAttribute("aria-expanded","false"); }
  btn.addEventListener("click", function(e){ e.stopPropagation(); var o = !wrap.classList.contains("open"); wrap.classList.toggle("open", o); btn.setAttribute("aria-expanded", o?"true":"false"); });
  [["ภาพ PNG", function(){ exportPNG(); }], ["วิดีโอ 8 วินาที", function(){ exportVideo(8); }], ["ดูแบบ 16:9 (screenshot เอง)", function(){ enterFrame(); showHint(); }]].forEach(function(x){
    menu.appendChild(Sim.h("button",{type:"button",role:"menuitem",text:x[0],on:{click:function(){ close(); x[1](); }}}));
  });
  document.addEventListener("click", close);
  wrap.appendChild(btn); wrap.appendChild(menu);
  return wrap;
}
Sim.exportPNG = exportPNG; Sim.exportVideo = exportVideo; Sim.enterFrame = enterFrame; Sim.exitFrame = exitFrame;

/* v1.2.0 read-only accessors (used by tools/export.js) */
Sim.order = function(){ return cfg ? (cfg.order || Object.keys(cfg.scenarios)).slice() : []; };
Sim.code = function(){ return cfg ? cfg.code : ""; };
Sim.title = function(){ return cfg ? cfg.title : ""; };
/* ms to wait before a still PNG (cfg.captureMs), so sweeps/animations reach a representative frame */
Sim.captureMs = function(){ return cfg && cfg.captureMs ? cfg.captureMs : 2000; };

Sim.setScenario = function(k, first){
  if(!cfg || !cfg.scenarios[k]) return;
  cur = k;
  var s = cfg.scenarios[k];
  Array.prototype.forEach.call(els.chips.children, function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-k")===k ? "true" : "false"); });
  renderFindings(s);
  renderQuiz(s);
  if(!first || location.hash){ try { if(location.hash.slice(1)!==k) location.replace("#" + k); } catch(e){} }
  if(cfg.onChange) cfg.onChange(k, s);
};

/* Re-render findings/take-home after the sim changes rows at runtime (e.g. a maneuver) */
Sim.refresh = function(){ var s = Sim.scenario(); if(s){ renderFindings(s); } };

function renderFindings(s){
  if(!els.fTable) return;
  els.fTitle.textContent = "Findings: " + s.name;
  els.fTable.innerHTML = "";
  (s.rows||[]).forEach(function(r){ els.fTable.appendChild(Sim.h("tr",{},[Sim.h("th",{text:r[0]}), Sim.h("td",{text:r[1]})])); });
  els.take.innerHTML = "";
  els.take.appendChild(Sim.h("h3",{text:"Take-home"}));
  var ul = Sim.h("ul"); (s.take||[]).forEach(function(x){ ul.appendChild(Sim.h("li",{text:x})); });
  els.take.appendChild(ul);
}

var LETTERS = "ABCDEFGH";
function renderQuiz(s){
  /* v1.3.0: MCQ block hidden by default (Nat, 20 Nov 2026). Quiz data stays in each sim for MEQ/Canva reuse.
     Opt back in per page with Sim.mount({showQuiz:true}) or ?quiz=1 */
  if(!(cfg.showQuiz || qs.quiz==="1")){ els.quiz.innerHTML = ""; els.quiz.style.display = "none"; return; }
  var list = (s.quiz && s.quiz.length) ? s.quiz : (cfg.quiz || []);
  els.quiz.innerHTML = "";
  if(!list.length){ els.quiz.style.display = "none"; return; }
  els.quiz.style.display = "";
  els.quiz.appendChild(Sim.h("h2",{text:"Next step"}));
  els.quiz.appendChild(Sim.h("p",{class:"hint",style:"margin:0",text:"Single best answer เลือกคำตอบแล้วกดดูเฉลย"}));
  list.forEach(function(q, qi){
    var box = Sim.h("div",{class:"qi"});
    box.appendChild(Sim.h("p",{class:"qtext",text:(list.length>1?(qi+1)+". ":"") + q.q}));
    var opts = Sim.h("div",{class:"opts",role:"group","aria-label":"ตัวเลือก"});
    var btns = [];
    q.opts.forEach(function(o, oi){
      var b = Sim.h("button",{class:"opt",type:"button"},[Sim.h("span",{class:"lt",text:LETTERS[oi]}), Sim.h("span",{text:o})]);
      b.addEventListener("click", function(){
        btns.forEach(function(x, xi){ x.disabled = true; if(xi===q.ans) x.classList.add("correct"); });
        if(oi!==q.ans) b.classList.add("wrong");
        det.open = true;
      });
      btns.push(b); opts.appendChild(b);
    });
    box.appendChild(opts);
    var det = Sim.h("details",{},[Sim.h("summary",{text:"ดูเฉลย"}), Sim.h("div",{class:"why",text:"เฉลย " + LETTERS[q.ans] + ": " + (q.why||"")})]);
    box.appendChild(det);
    els.quiz.appendChild(box);
  });
}
})();
