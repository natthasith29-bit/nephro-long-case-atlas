/* CORE-05 Circuit renderer (v1.0.0)
   SVG tubing, pumps, filters, pressure gauges, chambers, bags, tanks, flow particles.
   Used by HD, CRRT, water plant, PD and PLEX simulators.
   Rule: backward-compatible changes only (add functions or options, never change existing signatures).
   Works with or without shell.js. Respects prefers-reduced-motion (particles static, rotors still).

   Quick start:
     <script src="../core/circuit.js"></script>
     var c = Circuit.create(document.getElementById("svg"), {w:900, h:400});
     c.add("pump","BP",{x:250,y:110,label:"Blood pump"});
     c.add("filter","DZ",{x:450,y:220,h:140,label:"Dialyzer"});
     c.add("sensor","PA",{x:185,y:55,tap:[185,110],label:"Arterial",unit:"mmHg",min:-300,max:100,lo:-250,hi:0});
     c.tube("art",{from:[100,220], via:[[160,220],[160,110]], to:"BP.in", fluid:"art", flow:300});
     c.tube("pre",{from:"BP.out", to:"DZ.bin", fluid:"art", flow:300});
     c.set("PA",{value:-150});  c.set("art",{flow:0});  c.alarm("Arterial pressure low");
   Ready-made layouts: Circuit.preset.hd / crrt / water / pd / plex (svg, opts) return the same handle
   plus helpers (see each preset). Teaching pressure model: Circuit.model.hd(p).
*/
(function(){
"use strict";
var NS = "http://www.w3.org/2000/svg";
var Circuit = window.Circuit = window.Circuit || {};
Circuit.version = "1.0.0";
Circuit.reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
Circuit.speedK = 0.25;          // px per second per ml/min (300 ml/min = 75 px/s)
Circuit.maxSpeed = 240;         // px/s cap so fast flows stay readable
var FONT = "Geist, IBM Plex Sans Thai, Leelawadee UI, system-ui, sans-serif", MONO = "Geist Mono, ui-monospace, Menlo, monospace";
/* design v3 tokens (core.css): ink is the structural colour, accent marks interaction/highlight, red = flag, teal = ok */
var C = {navy:"#0B0B1F", ink:"#0B0B1F", muted:"#5E6075", faint:"#9A9CB2", line:"#E6E7F0", lineStrong:"#D3D5E2", red:"#B4232A", teal:"#1F7A72", accent:"#5B4BFF", accent2:"#19C8E6", accentSoft:"#EFEDFF", yellow:"#5B4BFF", card:"#fff", canvas:"#F4F5F9", peach:"#F6F1E6", green:"#E8F2E6", blue:"#E9EFF8", pink:"#F9EAEA"};
Circuit.colors = C;

/* fluid palette: fill = tube lumen tint, dot = particle colour */
var FLUID = Circuit.fluids = {
  art:      {fill:"#f2c4c4", dot:"#B4232A", th:"Arterial blood"},
  ven:      {fill:"#e9b3b8", dot:"#7a1020", th:"Venous blood"},
  blood:    {fill:"#f0bcbc", dot:"#9c1a24", th:"Blood"},
  dialysate:{fill:"#d6e9f5", dot:"#2f7fc1", th:"Dialysate"},
  effluent: {fill:"#fbf0c4", dot:"#b38b00", th:"Effluent"},
  water:    {fill:"#dff0fb", dot:"#3a8fd0", th:"Water"},
  feed:     {fill:"#e8eef2", dot:"#6f8796", th:"Feed water"},
  replace:  {fill:"#d4ece9", dot:"#1F7A72", th:"Replacement fluid"},
  citrate:  {fill:"#e6dcf3", dot:"#6b3fa6", th:"Citrate"},
  calcium:  {fill:"#fde3c4", dot:"#d06a00", th:"Calcium"},
  heparin:  {fill:"#e3e9f7", dot:"#3b4ea0", th:"Heparin"},
  plasma:   {fill:"#fbe6b0", dot:"#c48a00", th:"Plasma"},
  albumin:  {fill:"#fff4cf", dot:"#c9a000", th:"Albumin"},
  pd:       {fill:"#e2f1fa", dot:"#4a9fd2", th:"PD fluid"},
  cloudy:   {fill:"#eeeadf", dot:"#9a8f70", th:"Cloudy effluent"},
  reject:   {fill:"#e5e5ea", dot:"#7a7a8c", th:"Reject"},
  air:      {fill:"#f4f4f7", dot:"#b9b9c8", th:"Air"}
};
function fluid(f){ return typeof f==="object" ? f : (FLUID[f] || FLUID.blood); }

/* ---------- small helpers ---------- */
function el(tag, attrs, parent){
  var e = document.createElementNS(NS, tag);
  if(attrs) for(var k in attrs){ var v = attrs[k]; if(v===undefined || v===null) continue; if(k==="text") e.textContent = v; else e.setAttribute(k, v); }
  if(parent) parent.appendChild(e);
  return e;
}
function txt(parent, x, y, s, o){
  o = o || {};
  return el("text",{x:x,y:y,"text-anchor":o.anchor||"middle","font-family":o.mono?MONO:FONT,"font-size":o.size||12,"font-weight":o.weight||500,fill:o.fill||C.ink,"dominant-baseline":o.base||"auto",text:s},parent);
}
function fmt(n, d){ if(n===null || n===undefined || isNaN(n)) return "-"; return Number(n).toFixed(d||0).replace(/^-0(\.0+)?$/,"0$1"); }
function clamp(x,a,b){ return Math.max(a, Math.min(b, x)); }
function mix(a, b, t){ // hex colour mix
  function p(h){ h=h.replace("#",""); return [parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)]; }
  var A=p(a), B=p(b), r=A.map(function(v,i){ return Math.round(v+(B[i]-v)*t); });
  return "#" + r.map(function(v){ return ("0"+v.toString(16)).slice(-2); }).join("");
}
Circuit.mix = mix;
function merge(a, b){ for(var k in b) a[k] = b[k]; return a; }

/* rounded polyline path through points (r = corner radius) */
function roundPath(pts, r){
  if(pts.length < 2) return "";
  var d = "M" + pts[0][0] + " " + pts[0][1];
  for(var i=1; i<pts.length-1; i++){
    var p0=pts[i-1], p1=pts[i], p2=pts[i+1];
    var l1=Math.hypot(p1[0]-p0[0],p1[1]-p0[1]), l2=Math.hypot(p2[0]-p1[0],p2[1]-p1[1]);
    var rr=Math.min(r, l1/2, l2/2);
    if(rr<0.5 || l1===0 || l2===0){ d += " L" + p1[0] + " " + p1[1]; continue; }
    var a=[p1[0]-(p1[0]-p0[0])/l1*rr, p1[1]-(p1[1]-p0[1])/l1*rr], b=[p1[0]+(p2[0]-p1[0])/l2*rr, p1[1]+(p2[1]-p1[1])/l2*rr];
    d += " L" + a[0].toFixed(1) + " " + a[1].toFixed(1) + " Q" + p1[0] + " " + p1[1] + " " + b[0].toFixed(1) + " " + b[1].toFixed(1);
  }
  var e = pts[pts.length-1];
  return d + " L" + e[0] + " " + e[1];
}
/* insert elbows between non-aligned points: "hv" = horizontal first, "vh" = vertical first */
function orthogonal(pts, mode){
  var out=[pts[0]];
  for(var i=1;i<pts.length;i++){
    var a=out[out.length-1], b=pts[i];
    if(a[0]!==b[0] && a[1]!==b[1]) out.push(mode==="vh" ? [a[0],b[1]] : [b[0],a[1]]);
    out.push(b);
  }
  return out;
}

/* ---------- node types ----------
   Each type: ports(o) -> {name:[x,y]}, draw(g, o, st, ctx) where st = live state.
   Common options: x, y, label, sub (second line), labelPos ("below"|"above"|"left"|"right"), hidden */
var T = Circuit.types = {};

function label(g, o, dx, dy, defPos){
  if(!o.label && !o.sub) return;
  var pos = o.labelPos || defPos || "below", x=o.x, y=o.y, anchor="middle";
  if(pos==="below") y = o.y + dy + 14;
  else if(pos==="above") y = o.y - dy - (o.sub?20:6);
  else if(pos==="left"){ x = o.x - dx - 6; y = o.y + 4; anchor="end"; }
  else if(pos==="right"){ x = o.x + dx + 6; y = o.y + 4; anchor="start"; }
  if(o.label) txt(g, x, y, o.label, {anchor:anchor, size:o.fs||12.5, fill:C.navy});
  if(o.sub) txt(g, x, y + 14, o.sub, {anchor:anchor, size:11, weight:400, fill:C.muted});
}

T.pump = {
  ports:function(o){ var r=o.r||24; return {in:[o.x-r,o.y], out:[o.x+r,o.y], top:[o.x,o.y-r], bottom:[o.x,o.y+r]}; },
  draw:function(g,o,st){
    var r=o.r||24;
    el("circle",{cx:o.x,cy:o.y,r:r+4,fill:C.card,stroke:st.alarm?C.red:C.navy,"stroke-width":2},g);
    el("circle",{cx:o.x,cy:o.y,r:r-3,fill:"none",stroke:C.line,"stroke-width":5},g);
    var rot = el("g",{},g); st._rot = rot;
    el("line",{x1:o.x-r+8,y1:o.y,x2:o.x+r-8,y2:o.y,stroke:C.navy,"stroke-width":4,"stroke-linecap":"round"},rot);
    el("circle",{cx:o.x-r+8,cy:o.y,r:5,fill:C.navy},rot);
    el("circle",{cx:o.x+r-8,cy:o.y,r:5,fill:C.navy},rot);
    el("circle",{cx:o.x,cy:o.y,r:3.5,fill:C.accent2,stroke:C.ink},rot);
    rot.setAttribute("transform","rotate(" + (st._ang||0) + " " + o.x + " " + o.y + ")");
    if(st.rate!==undefined && st.rate!==null && o.showRate!==false) txt(g, o.x, o.y - r - 9, fmt(st.rate, o.rateDec||0) + " " + (o.unit||"ml/min"), {mono:true, size:11.5, fill:C.navy});
    label(g,o,r+4,r+4);
  },
  tick:function(o,st,dt){ if(!st._rot) return; var sp=(st.speed!==undefined?st.speed:(st.rate||0))*0.9; st._ang=((st._ang||0)+sp*dt)%360; st._rot.setAttribute("transform","rotate(" + st._ang + " " + o.x + " " + o.y + ")"); }
};

T.filter = {
  ports:function(o){ var w=o.w||34, h=o.h||140, x=o.x, y=o.y, s=o.sidePort||22;
    return {bin:[x,y-h/2-8], bout:[x,y+h/2+8], din:[x+w/2,y+h/2-s], dout:[x+w/2,y-h/2+s], lin:[x-w/2,y+h/2-s], lout:[x-w/2,y-h/2+s]}; },
  draw:function(g,o,st){
    var w=o.w||34, h=o.h||140, x=o.x, y=o.y, clot=clamp(st.clot||0,0,1);
    el("rect",{x:x-w/2,y:y-h/2,width:w,height:h,rx:w/2,fill:C.card,stroke:st.alarm?C.red:C.navy,"stroke-width":2.5},g);
    el("rect",{x:x-w/2+4,y:y-h/2+14,width:w-8,height:h-28,fill:mix("#fbe9e9","#5a0d14",clot*0.85),opacity:0.9},g);
    var n=Math.max(3,Math.round((w-10)/5));
    for(var i=0;i<n;i++){ var fx=x-w/2+6+i*((w-12)/(n-1)); el("line",{x1:fx,y1:y-h/2+14,x2:fx,y2:y+h/2-14,stroke:mix("#d77a7a","#2a0508",clot),"stroke-width":1.6},g); }
    if(clot>0.05){ var k=Math.round(clot*10); for(var j=0;j<k;j++){ el("rect",{x:x-w/2+5+((j*7)%(w-14)),y:y-h/2+18+((j*37)%(h-44)),width:6,height:9,rx:2,fill:"#3a070b",opacity:0.85},g); } }
    el("rect",{x:x-w/2-2,y:y-h/2-8,width:w+4,height:12,rx:5,fill:C.ink},g);
    el("rect",{x:x-w/2-2,y:y+h/2-4,width:w+4,height:12,rx:5,fill:C.ink},g);
    label(g,o,w/2+2,h/2+8,"right");
  }
};

T.sensor = { /* pressure gauge. o: min,max,lo,hi,unit,tap:[x,y],dec,valuePos("right"|"left"|"below") */
  ports:function(o){ var r=o.r||19; return {p:[o.x,o.y+r]}; },
  draw:function(g,o,st){
    var r=o.r||19, x=o.x, y=o.y, min=o.min!==undefined?o.min:-300, max=o.max!==undefined?o.max:300, v=st.value;
    var out = v!==undefined && v!==null && ((o.lo!==undefined && v<o.lo) || (o.hi!==undefined && v>o.hi));
    st._out = out;
    if(o.tap){ el("line",{x1:x,y1:y+r,x2:o.tap[0],y2:o.tap[1],stroke:C.muted,"stroke-width":1.6,"stroke-dasharray":"3 2"},g); el("circle",{cx:o.tap[0],cy:o.tap[1],r:3.5,fill:C.card,stroke:C.muted,"stroke-width":1.5},g); }
    var ring = el("circle",{cx:x,cy:y,r:r+3,fill:out?C.pink:C.card,stroke:out?C.red:C.navy,"stroke-width":out?3:2},g);
    if(out && !Circuit.reduce) st._pulse = ring; else st._pulse = null;
    function ang(val){ return (-210 + 240*clamp((val-min)/(max-min),0,1)) * Math.PI/180; }
    function arc(a,b,col,wd){ var p1=[x+(r-3)*Math.cos(a),y+(r-3)*Math.sin(a)], p2=[x+(r-3)*Math.cos(b),y+(r-3)*Math.sin(b)]; el("path",{d:"M"+p1[0].toFixed(1)+" "+p1[1].toFixed(1)+" A"+(r-3)+" "+(r-3)+" 0 "+((b-a)>Math.PI?1:0)+" 1 "+p2[0].toFixed(1)+" "+p2[1].toFixed(1),fill:"none",stroke:col,"stroke-width":wd},g); }
    arc(ang(min), ang(max), C.line, 3);
    if(o.lo!==undefined && o.lo>min) arc(ang(min), ang(o.lo), "#e9a3a3", 3);
    if(o.hi!==undefined && o.hi<max) arc(ang(o.hi), ang(max), "#e9a3a3", 3);
    if(min<0 && max>0){ var z=ang(0); el("line",{x1:x+(r-7)*Math.cos(z),y1:y+(r-7)*Math.sin(z),x2:x+(r+1)*Math.cos(z),y2:y+(r+1)*Math.sin(z),stroke:C.muted,"stroke-width":1.2},g); }
    if(v!==undefined && v!==null){ var a=ang(v); el("line",{x1:x,y1:y,x2:x+(r-5)*Math.cos(a),y2:y+(r-5)*Math.sin(a),stroke:out?C.red:C.navy,"stroke-width":2.4,"stroke-linecap":"round"},g); }
    el("circle",{cx:x,cy:y,r:3,fill:C.navy},g);
    var vp=o.valuePos||"right", vx=x, vy=y, an="middle";
    if(vp==="right"){ vx=x+r+8; an="start"; } else if(vp==="left"){ vx=x-r-8; an="end"; } else { vy=y+r+18; }
    var vs = (v===undefined||v===null) ? "-" : ((v>0&&o.sign?"+":"") + fmt(v, o.dec||0));
    txt(g, vx, vp==="below"?vy:vy-1, vs + (o.unit?" "+o.unit:""), {anchor:an, mono:true, size:13, fill:out?C.red:C.navy});
    if(o.label) txt(g, vx, (vp==="below"?vy+14:vy+14), o.label, {anchor:an, size:11.5, weight:600, fill:C.muted});
  },
  tick:function(o,st,dt,t){ if(st._pulse) st._pulse.setAttribute("stroke-width", 2.5 + 2*Math.abs(Math.sin(t*4))); }
};

T.chamber = { /* drip chamber / air trap. st.level 0..1, st.air (bool) */
  ports:function(o){ var h=o.h||50, w=o.w||22; return {in:[o.x,o.y-h/2], out:[o.x,o.y+h/2], sl:[o.x-w/2,o.y-h/2+12], sr:[o.x+w/2,o.y-h/2+12]}; },
  draw:function(g,o,st){
    var h=o.h||50, w=o.w||22, x=o.x, y=o.y, lv=clamp(st.level===undefined?0.6:st.level,0,1), f=fluid(st.fluid||o.fluid||"ven");
    el("rect",{x:x-w/2,y:y-h/2,width:w,height:h,rx:5,fill:C.card,stroke:st.alarm?C.red:C.navy,"stroke-width":2},g);
    el("rect",{x:x-w/2+2,y:y+h/2-2-(h-4)*lv,width:w-4,height:(h-4)*lv,rx:3,fill:f.fill},g);
    el("line",{x1:x-w/2+2,y1:y+h/2-2-(h-4)*lv,x2:x+w/2-2,y2:y+h/2-2-(h-4)*lv,stroke:f.dot,"stroke-width":1.5},g);
    if(st.air){ for(var i=0;i<4;i++) el("circle",{cx:x-5+i*3.5,cy:y+h/2-8-i*6,r:2.4,fill:"#fff",stroke:C.muted,"stroke-width":0.8},g); }
    label(g,o,w/2,h/2,"left");
  }
};

T.patient = { /* o.access: "fistula" | "catheter". ports a (arterial/draw), v (venous/return) */
  ports:function(o){ return {a:[o.x+30,o.y-12], v:[o.x+30,o.y+12]}; },
  draw:function(g,o,st){
    var x=o.x, y=o.y;
    el("circle",{cx:x-6,cy:y-46,r:13,fill:C.peach,stroke:C.navy,"stroke-width":2},g);
    el("path",{d:"M"+(x-30)+" "+(y+42)+" Q"+(x-32)+" "+(y-26)+" "+(x-6)+" "+(y-28)+" Q"+(x+20)+" "+(y-26)+" "+(x+18)+" "+(y+42)+" Z",fill:C.blue,stroke:C.navy,"stroke-width":2},g);
    if((o.access||"fistula")==="fistula"){
      el("path",{d:"M"+(x+6)+" "+(y-4)+" L"+(x+30)+" "+(y-12)+" M"+(x+6)+" "+(y+4)+" L"+(x+30)+" "+(y+12),stroke:C.red,"stroke-width":3,"stroke-linecap":"round"},g);
      el("circle",{cx:x+6,cy:y,r:6,fill:C.pink,stroke:C.red,"stroke-width":1.5},g);
    } else {
      el("rect",{x:x+2,y:y-16,width:10,height:32,rx:4,fill:"#fff",stroke:C.navy,"stroke-width":1.5},g);
      el("path",{d:"M"+(x+12)+" "+(y-8)+" L"+(x+30)+" "+(y-12)+" M"+(x+12)+" "+(y+8)+" L"+(x+30)+" "+(y+12),stroke:C.navy,"stroke-width":2.5,"stroke-linecap":"round"},g);
    }
    label(g,o,0,44);
  }
};

T.abdomen = { /* PD patient. st.fill 0..1, st.fluid ("pd"|"cloudy"). port c (catheter) */
  ports:function(o){ var rx=o.rx||70; return {c:[o.x-rx-18,o.y]}; },
  draw:function(g,o,st){
    var x=o.x, y=o.y, rx=o.rx||70, ry=o.ry||50, lv=clamp(st.fill===undefined?0.5:st.fill,0,1), f=fluid(st.fluid||"pd");
    el("ellipse",{cx:x,cy:y,rx:rx+14,ry:ry+14,fill:C.peach,stroke:C.navy,"stroke-width":2},g);
    var clipId = "abd" + Math.random().toString(36).slice(2,8);
    var cp = el("clipPath",{id:clipId},g); el("ellipse",{cx:x,cy:y,rx:rx,ry:ry},cp);
    el("ellipse",{cx:x,cy:y,rx:rx,ry:ry,fill:"#fff",stroke:C.muted,"stroke-width":1.2,"stroke-dasharray":"4 3"},g);
    el("rect",{x:x-rx,y:y+ry-2*ry*lv,width:2*rx,height:2*ry*lv,fill:f.fill,"clip-path":"url(#"+clipId+")"},g);
    if(lv>0.02) el("line",{x1:x-rx,y1:y+ry-2*ry*lv,x2:x+rx,y2:y+ry-2*ry*lv,stroke:f.dot,"stroke-width":1.5,"clip-path":"url(#"+clipId+")"},g);
    el("path",{d:"M"+(x-rx-18)+" "+y+" L"+(x-rx+10)+" "+y+" Q"+(x-rx+30)+" "+(y+2)+" "+(x-rx+30)+" "+(y+22),fill:"none",stroke:C.navy,"stroke-width":3,"stroke-linecap":"round"},g);
    txt(g,x,y-ry+18,o.cavity||"Peritoneal cavity",{size:11,weight:400,fill:C.muted});
    if(st.volume!==undefined) txt(g,x,y+6,fmt(st.volume,0)+" ml",{mono:true,size:13,fill:C.navy});
    label(g,o,0,ry+14);
  }
};

T.bag = { /* fluid bag. st.level 0..1, st.fluid. ports out (bottom), top, side (left), sider (right). o.drain = collection bag */
  ports:function(o){ var w=o.w||44, h=o.h||60; return {out:[o.x,o.y+h/2+8], top:[o.x,o.y-h/2], side:[o.x-w/2,o.y+h/2-12], sider:[o.x+w/2,o.y+h/2-12]}; },
  draw:function(g,o,st){
    var w=o.w||44, h=o.h||60, x=o.x, y=o.y, lv=clamp(st.level===undefined?0.75:st.level,0,1), f=fluid(st.fluid||o.fluid||"replace");
    if(!o.drain) el("line",{x1:x,y1:y-h/2,x2:x,y2:y-h/2-8,stroke:C.muted,"stroke-width":2},g);
    el("rect",{x:x-w/2,y:y-h/2,width:w,height:h,rx:8,fill:C.card,stroke:st.alarm?C.red:C.navy,"stroke-width":2},g);
    el("rect",{x:x-w/2+3,y:y+h/2-3-(h-6)*lv,width:w-6,height:(h-6)*lv,rx:5,fill:f.fill},g);
    if(!o.drain) el("rect",{x:x-4,y:y+h/2,width:8,height:8,fill:C.navy},g);
    if(o.tag) txt(g,x,y+3,o.tag,{size:11,fill:C.navy,base:"middle"});
    label(g,o,w/2,h/2+(o.drain?0:8));
  }
};

T.tank = { /* cylinder: softener, carbon, DI, storage. st.exhaust 0..1 shades from bottom-up (spent media) */
  ports:function(o){ var w=o.w||40, h=o.h||80; return {in:[o.x-w/2,o.y], out:[o.x+w/2,o.y], top:[o.x,o.y-h/2-6], bottom:[o.x,o.y+h/2]}; },
  draw:function(g,o,st){
    var w=o.w||40, h=o.h||80, x=o.x, y=o.y, ex=clamp(st.exhaust||0,0,1), media=o.media||"#c9d6df";
    el("rect",{x:x-w/2,y:y-h/2,width:w,height:h,rx:w/2.6,fill:o.fillColor||mix(media,"#ffffff",0.35),stroke:st.alarm?C.red:C.navy,"stroke-width":2.2},g);
    if(ex>0){ el("rect",{x:x-w/2+3,y:y+h/2-4-(h-14)*ex,width:w-6,height:(h-14)*ex,rx:6,fill:o.spent||"#7a6a58",opacity:0.75},g); }
    el("rect",{x:x-w/2+3,y:y-h/2+6,width:w-6,height:4,fill:C.navy,opacity:0.35},g);
    if(o.tag) txt(g,x,y+4,o.tag,{size:11,fill:C.navy});
    label(g,o,w/2,h/2);
  }
};

T.box = { /* generic module (RO, machine, heater, UF filter, cycler). o.w, o.h, o.title */
  ports:function(o){ var w=o.w||80, h=o.h||50; return {in:[o.x-w/2,o.y], out:[o.x+w/2,o.y], top:[o.x,o.y-h/2], bottom:[o.x,o.y+h/2], inb:[o.x-w/2,o.y+h/4], outb:[o.x+w/2,o.y+h/4], ina:[o.x-w/2,o.y-h/4], outa:[o.x+w/2,o.y-h/4]}; },
  draw:function(g,o,st){
    var w=o.w||80, h=o.h||50;
    el("rect",{x:o.x-w/2,y:o.y-h/2,width:w,height:h,rx:8,fill:st.alarm?C.pink:(o.fillColor||C.card),stroke:st.alarm?C.red:C.navy,"stroke-width":2},g);
    if(o.title) txt(g,o.x,o.y+(o.titleSub?-2:4),o.title,{size:o.fs||13,fill:C.navy});
    if(o.titleSub) txt(g,o.x,o.y+13,o.titleSub,{size:10.5,weight:400,fill:C.muted});
    label(g,o,w/2,h/2);
  }
};

T.clamp = { /* st.closed */
  ports:function(o){ return {in:[o.x-9,o.y], out:[o.x+9,o.y], top:[o.x,o.y-9], bottom:[o.x,o.y+9]}; },
  draw:function(g,o,st){
    var c = st.closed ? C.red : C.teal;
    el("path",{d:"M"+(o.x-9)+" "+(o.y-9)+" L"+(o.x+9)+" "+(o.y+9)+" L"+(o.x+9)+" "+(o.y-9)+" L"+(o.x-9)+" "+(o.y+9)+" Z",fill:st.closed?C.pink:C.green,stroke:c,"stroke-width":2,"stroke-linejoin":"round"},g);
    label(g,o,9,9);
  }
};

T.syringe = { /* syringe pump (heparin, citrate, calcium). port out at bottom */
  ports:function(o){ return {out:[o.x,o.y+12], left:[o.x-34,o.y], right:[o.x+34,o.y]}; },
  draw:function(g,o,st){
    var x=o.x, y=o.y, f=fluid(st.fluid||o.fluid||"heparin"), lv=clamp(st.level===undefined?0.7:st.level,0,1);
    el("rect",{x:x-34,y:y-10,width:68,height:20,rx:4,fill:C.card,stroke:C.navy,"stroke-width":2},g);
    el("rect",{x:x-30,y:y-6,width:50*lv,height:12,fill:f.fill},g);
    el("line",{x1:x-30+50*lv,y1:y-8,x2:x-30+50*lv,y2:y+8,stroke:C.navy,"stroke-width":2.5},g);
    el("line",{x1:x-30+50*lv,y1:y,x2:x-46,y2:y,stroke:C.navy,"stroke-width":2.5},g);
    el("line",{x1:x+34,y1:y,x2:x+34,y2:y,stroke:C.navy},g);
    if(st.rate!==undefined) txt(g,x,y-15,fmt(st.rate,o.rateDec||1)+" "+(o.unit||"ml/h"),{mono:true,size:11,fill:C.navy});
    label(g,o,34,12,"right");
  }
};

T.detector = { /* air detector, blood-leak detector. st.alarm */
  ports:function(o){ return {in:[o.x-11,o.y], out:[o.x+11,o.y], top:[o.x,o.y-11], bottom:[o.x,o.y+11]}; },
  draw:function(g,o,st){
    el("rect",{x:o.x-11,y:o.y-11,width:22,height:22,rx:4,fill:st.alarm?C.pink:C.card,stroke:st.alarm?C.red:C.navy,"stroke-width":2},g);
    el("circle",{cx:o.x,cy:o.y,r:4.5,fill:st.alarm?C.red:C.teal},g);
    label(g,o,11,11);
  }
};

T.meter = { /* digital readout (conductivity, chlorine, TMP). st.value, o.unit, o.dec, o.lo/hi, o.tap */
  ports:function(o){ var h=o.h||34; return {p:[o.x,o.y+h/2]}; },
  draw:function(g,o,st){
    var w=o.w||92, h=o.h||34, v=st.value;
    var out = v!==undefined && v!==null && ((o.lo!==undefined && v<o.lo) || (o.hi!==undefined && v>o.hi));
    st._out = out;
    if(o.tap){ el("line",{x1:o.x,y1:o.y+h/2,x2:o.tap[0],y2:o.tap[1],stroke:C.muted,"stroke-width":1.6,"stroke-dasharray":"3 2"},g); el("circle",{cx:o.tap[0],cy:o.tap[1],r:3.5,fill:C.card,stroke:C.muted,"stroke-width":1.5},g); }
    var r = el("rect",{x:o.x-w/2,y:o.y-h/2,width:w,height:h,rx:6,fill:out?C.pink:C.ink,stroke:out?C.red:C.ink,"stroke-width":2},g);
    st._pulse = out && !Circuit.reduce ? r : null;
    var vs = (v===undefined||v===null) ? "-" : (typeof v==="string" ? v : fmt(v,o.dec||0));
    txt(g,o.x,o.y+5,vs+(o.unit?" "+o.unit:""),{mono:true,size:13,fill:out?C.red:C.accent2});
    if(o.label) txt(g,o.x,o.y-h/2-6,o.label,{size:11.5,fill:C.muted});
  },
  tick:T.sensor.tick
};

T.junction = {
  ports:function(o){ return {c:[o.x,o.y]}; },
  draw:function(g,o){ el("circle",{cx:o.x,cy:o.y,r:o.r||3.5,fill:o.color||C.navy},g); }
};

T.region = { /* dashed grouping frame (e.g. "HD machine"). Drawn under everything. o.w, o.h, o.title */
  ports:function(){ return {}; },
  draw:function(g,o){
    el("rect",{x:o.x,y:o.y,width:o.w,height:o.h,rx:14,fill:o.fillColor||"none",stroke:o.color||C.lineStrong,"stroke-width":1.3,"stroke-dasharray":"5 5"},g);
    if(o.title){ var tp=o.titlePos||"br"; txt(g, tp.charAt(1)==="l"?o.x+12:o.x+o.w-12, tp.charAt(0)==="t"?o.y+18:o.y+o.h-8, o.title, {anchor:tp.charAt(1)==="l"?"start":"end",size:11,fill:o.color||C.faint,mono:true}); }
  }
};

T.text = {
  ports:function(){ return {}; },
  draw:function(g,o){ txt(g,o.x,o.y,o.text||o.label||"",{anchor:o.anchor||"middle",size:o.size||12,fill:o.color||C.muted,weight:o.weight||600,mono:o.mono}); }
};

/* ---------- circuit object ---------- */
var LIVE = [];
var loopOn = false, lastT = 0;
function loop(now){
  var t = now/1000, dt = lastT ? Math.min(0.05, t-lastT) : 0; lastT = t;
  if(!document.hidden) LIVE.forEach(function(c){ if(c._run) c._tick(dt, t); });
  if(LIVE.some(function(c){ return c._run; })) requestAnimationFrame(loop); else { loopOn=false; lastT=0; }
}
function kick(){ if(!loopOn){ loopOn=true; lastT=0; requestAnimationFrame(loop); } }

/* Circuit.create(svg, {w, h, animate, corner, title})  svg: element or id */
Circuit.create = function(svg, opts){
  opts = opts || {};
  if(typeof svg === "string") svg = document.getElementById(svg);
  var W = opts.w || 900, H = opts.h || 400;
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);
  if(!svg.getAttribute("role")) svg.setAttribute("role","img");
  while(svg.firstChild) svg.removeChild(svg.firstChild);
  var L = {
    region: el("g",{class:"c-region"},svg),
    hi:     el("g",{class:"c-hi"},svg),
    casing: el("g",{class:"c-casing"},svg),
    lumen:  el("g",{class:"c-lumen"},svg),
    dots:   el("g",{class:"c-dots"},svg),
    arrows: el("g",{class:"c-arrows"},svg),
    nodes:  el("g",{class:"c-nodes"},svg),
    labels: el("g",{class:"c-labels"},svg),
    top:    el("g",{class:"c-top"},svg)
  };
  var nodes = {}, tubes = {}, order = [];
  var animate = opts.animate !== false && !Circuit.reduce;
  var c = {svg:svg, W:W, H:H, nodes:nodes, tubes:tubes, layers:L, _run:false};

  function port(ref){
    if(Array.isArray(ref)) return ref.slice();
    var p = String(ref).split("."), n = nodes[p[0]];
    if(!n) throw new Error("Circuit: unknown node " + p[0]);
    var ps = T[n.type].ports(n.o), k = p[1] || Object.keys(ps)[0];
    if(!ps[k]) throw new Error("Circuit: node " + p[0] + " has no port " + k);
    return ps[k].slice();
  }
  c.port = port;

  /* add(type, id, opts) -> node handle. st (live state) keys depend on type */
  c.add = function(type, id, o){
    if(!T[type]) throw new Error("Circuit: unknown type " + type);
    o = merge({}, o || {});
    var parent = type==="region" ? L.region : (type==="text" ? L.labels : L.nodes);
    var g = el("g",{class:"c-node c-" + type, "data-id":id}, parent);
    var n = nodes[id] = {id:id, type:type, o:o, st:merge({}, o.state || {}), g:g};
    if(o.title && !g.querySelector("title")){} // title handled per draw
    drawNode(n);
    order.push(n);
    return n;
  };
  function drawNode(n){
    while(n.g.firstChild) n.g.removeChild(n.g.firstChild);
    n.g.style.display = n.st.hidden || n.o.hidden ? "none" : "";
    T[n.type].draw(n.g, n.o, n.st, c);
    if(n.st.highlight) n.g.insertBefore(el("circle",{cx:n.o.x,cy:n.o.y,r:(n.o.r||n.o.h||40)/1.4+12,fill:C.accent,opacity:0.16}), n.g.firstChild);
    if(n.o.tip){ el("title",{text:n.o.tip}, n.g); }
  }

  /* tube(id, {from, to, via:[[x,y]..], pts:[[x,y]..], elbow:"hv"|"vh", fluid, flow, w, spacing, arrows, dash, label, labelAt(0..1), labelDx, labelDy, occl(0..1), occlAt(0..1)})
     flow in ml/min (sign = direction). flow 0 = static lumen, no particles */
  c.tube = function(id, o){
    o = merge({}, o || {});
    var pts = o.pts ? o.pts.slice() : [port(o.from)].concat(o.via||[]).concat([port(o.to)]);
    pts = orthogonal(pts, o.elbow);
    var t = tubes[id] = {id:id, o:o, pts:pts, st:{flow:o.flow||0, fluid:o.fluid||"blood", hidden:!!o.hidden, occl:o.occl||0, dash:o.dash}, phase:0};
    var d = roundPath(pts, o.corner || opts.corner || 10);
    var w = o.w || 8;
    t.gHi = el("path",{d:d,fill:"none",stroke:C.accent,"stroke-width":w+12,"stroke-linecap":"round","stroke-linejoin":"round",opacity:0},L.hi); t.hiOp = 0.28;
    t.gCase = el("path",{d:d,fill:"none",stroke:"#C3C5D6","stroke-width":w+3.5,"stroke-linecap":"round","stroke-linejoin":"round"},L.casing);
    t.gLum = el("path",{d:d,fill:"none","stroke-width":w,"stroke-linecap":"round","stroke-linejoin":"round"},L.lumen);
    t.gDots = el("g",{},L.dots);
    t.gArr = el("g",{},L.arrows);
    t.gLab = el("g",{},L.labels);
    t.gOcc = el("g",{},L.top);
    t.path = t.gLum;
    renderTube(t);
    return t;
  };
  function sample(t){
    var len = 0;
    try { len = t.path.getTotalLength(); } catch(e){ len = 0; }
    if(!len){ // fallback: compute from straight segments
      len = 0; for(var i=1;i<t.pts.length;i++) len += Math.hypot(t.pts[i][0]-t.pts[i-1][0], t.pts[i][1]-t.pts[i-1][1]);
      t.len = len; t.xs = []; t.ys = [];
      for(var s=0;s<=len;s+=3){ var q=pointOnPolyline(t.pts, s); t.xs.push(q[0]); t.ys.push(q[1]); }
      return;
    }
    t.len = len; t.xs = []; t.ys = [];
    for(var s2=0; s2<=len; s2+=3){ var p=t.path.getPointAtLength(s2); t.xs.push(p.x); t.ys.push(p.y); }
  }
  function pointOnPolyline(pts, s){
    for(var i=1;i<pts.length;i++){ var l=Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]); if(s<=l){ var k=l?s/l:0; return [pts[i-1][0]+(pts[i][0]-pts[i-1][0])*k, pts[i-1][1]+(pts[i][1]-pts[i-1][1])*k]; } s-=l; }
    return pts[pts.length-1];
  }
  function at(t, s){ var i = clamp(Math.round(s/3), 0, t.xs.length-1); return [t.xs[i], t.ys[i]]; }
  function renderTube(t){
    var o=t.o, st=t.st, f=fluid(st.fluid), w=o.w||8;
    var vis = st.hidden ? "none" : "";
    [t.gHi,t.gCase,t.gLum,t.gDots,t.gArr,t.gLab,t.gOcc].forEach(function(e){ e.style.display = vis; });
    t.gLum.setAttribute("stroke", st.empty ? "#f7f7fa" : f.fill);
    t.gLum.setAttribute("stroke-dasharray", st.dash ? "8 6" : "");
    t.gCase.setAttribute("stroke-dasharray", st.dash ? "8 6" : "");
    t.gHi.setAttribute("opacity", st.highlight ? t.hiOp : 0);
    if(!t.xs) sample(t);
    // particles
    while(t.gDots.firstChild) t.gDots.removeChild(t.gDots.firstChild);
    var sp = o.spacing || 20, n = Math.max(1, Math.floor(t.len/sp));
    t.dots = [];
    if(st.flow && !st.empty){
      for(var i=0;i<n;i++) t.dots.push(el("circle",{r:Math.max(1.6,w*0.3),fill:f.dot,opacity:0.9},t.gDots));
    }
    placeDots(t);
    // direction arrows (always shown when flowing, so static screenshots still read)
    while(t.gArr.firstChild) t.gArr.removeChild(t.gArr.firstChild);
    if(st.flow && o.arrows!==false && t.len>40){
      var na = o.arrows || Math.max(1, Math.round(t.len/220));
      for(var k=0;k<na;k++){
        var s = t.len*(k+0.5)/na, a = at(t,s-4), b = at(t,s+4);
        if(st.flow<0){ var tmp=a; a=b; b=tmp; }
        var ang = Math.atan2(b[1]-a[1], b[0]-a[0])*180/Math.PI, m = at(t,s);
        el("path",{d:"M-5 -5 L4 0 L-5 5",fill:"none",stroke:f.dot,"stroke-width":2.4,"stroke-linecap":"round","stroke-linejoin":"round",transform:"translate("+m[0].toFixed(1)+" "+m[1].toFixed(1)+") rotate("+ang.toFixed(1)+")"},t.gArr);
      }
    }
    // occlusion (kink / clot / stenosis) marker
    while(t.gOcc.firstChild) t.gOcc.removeChild(t.gOcc.firstChild);
    if(st.occl > 0){
      var oc = at(t, t.len*(st.occlAt!==undefined?st.occlAt:(o.occlAt!==undefined?o.occlAt:0.5))), sev = clamp(st.occl,0,1);
      el("circle",{cx:oc[0],cy:oc[1],r:w*0.9+4,fill:"none",stroke:C.red,"stroke-width":2.5,"stroke-dasharray":"3 2"},t.gOcc);
      el("path",{d:"M"+(oc[0]-w)+" "+(oc[1]-w)+" L"+(oc[0]+w)+" "+(oc[1]+w)+" M"+(oc[0]+w)+" "+(oc[1]-w)+" L"+(oc[0]-w)+" "+(oc[1]+w),stroke:C.red,"stroke-width":1.5+2*sev,"stroke-linecap":"round"},t.gOcc);
      if(st.occlLabel) txt(t.gOcc, oc[0], oc[1]-w-10, st.occlLabel, {size:11.5,fill:C.red});
    }
    // label
    while(t.gLab.firstChild) t.gLab.removeChild(t.gLab.firstChild);
    var lab = st.label!==undefined ? st.label : o.label;
    if(lab){
      var lp = at(t, t.len*(o.labelAt!==undefined?o.labelAt:0.5));
      var ldx = st.labelDx!==undefined ? st.labelDx : (o.labelDx||0), ldy = st.labelDy!==undefined ? st.labelDy : (o.labelDy!==undefined ? o.labelDy : -10);
      txt(t.gLab, lp[0]+ldx, lp[1]+ldy, lab, {size:st.labelSize||o.labelSize||11.5,fill:o.labelColor||fluid(st.fluid).dot,anchor:o.labelAnchor||"middle"});
    }
  }
  function placeDots(t){
    if(!t.dots || !t.dots.length) return;
    var n=t.dots.length, gap=t.len/n;
    for(var i=0;i<n;i++){
      var s = ((i*gap + t.phase) % t.len + t.len) % t.len;
      var p = at(t,s);
      t.dots[i].setAttribute("cx", p[0].toFixed(1)); t.dots[i].setAttribute("cy", p[1].toFixed(1));
    }
  }

  /* set(id, props): merge into node or tube state and redraw that element */
  c.set = function(id, props){
    var n = nodes[id], t = tubes[id];
    if(n){
      var keepAng = n.st._ang; merge(n.st, props||{}); n.st._ang = keepAng;
      if(props && props.opts) merge(n.o, props.opts);
      drawNode(n);
    } else if(t){
      var hadDots = !!(t.st.flow) && !t.st.empty;
      merge(t.st, props||{});
      var hasDots = !!(t.st.flow) && !t.st.empty;
      if(props && Object.keys(props).length===1 && props.flow!==undefined && hadDots===hasDots && Math.sign(props.flow)===Math.sign(t._lastSign||props.flow)){ t._lastSign = Math.sign(props.flow); return c; } // flow-speed change only, no redraw
      t._lastSign = Math.sign(t.st.flow);
      renderTube(t);
    }
    return c;
  };
  c.get = function(id){ return nodes[id] ? nodes[id].st : (tubes[id] ? tubes[id].st : null); };
  c.show = function(id, on){ return c.set(id, {hidden: on===false}); };
  c.highlight = function(ids, on){ (Array.isArray(ids)?ids:[ids]).forEach(function(id){ c.set(id,{highlight:on!==false}); }); return c; };
  c.clearHighlight = function(){ Object.keys(nodes).forEach(function(k){ if(nodes[k].st.highlight) c.set(k,{highlight:false}); }); Object.keys(tubes).forEach(function(k){ if(tubes[k].st.highlight) c.set(k,{highlight:false}); }); return c; };
  /* flows({tubeId: ml/min, ...}) batch flow update */
  c.flows = function(map){ for(var k in map) c.set(k, {flow:map[k]}); return c; };
  /* click / keyboard interaction on a node */
  c.onClick = function(id, fn){
    var n = nodes[id]; if(!n) return c;
    n.g.setAttribute("tabindex","0"); n.g.setAttribute("role","button"); n.g.style.cursor = "pointer";
    if(n.o.label) n.g.setAttribute("aria-label", n.o.label);
    n.g.addEventListener("click", function(){ fn(id, n.st); });
    n.g.addEventListener("keydown", function(e){ if(e.key==="Enter" || e.key===" "){ e.preventDefault(); fn(id, n.st); } });
    return c;
  };
  /* alarm banner: c.alarm("text") | c.alarm({text, level:"red"|"amber"}) | c.alarm(null) */
  c.alarm = function(a){
    while(L.top.lastChild && L.top.lastChild.getAttribute && L.top.lastChild.getAttribute("data-alarm")) L.top.removeChild(L.top.lastChild);
    c._alarmEl = null;
    if(!a) return c;
    if(typeof a === "string") a = {text:a};
    var lvl = a.level || "red", col = lvl==="amber" ? "#8a5a00" : C.red, bg = lvl==="amber" ? C.peach : C.pink;
    var g = el("g",{"data-alarm":"1",role:"alert"},L.top);
    var wd = Math.min(W-40, 40 + a.text.length*7.6), x = a.x!==undefined ? a.x : W/2, y = a.y!==undefined ? a.y : 6;
    var r = el("rect",{x:x-wd/2,y:y,width:wd,height:26,rx:13,fill:bg,stroke:col,"stroke-width":2},g);
    txt(g,x,y+18,"⚠ " + a.text,{size:13.5,fill:col});
    c._alarmEl = Circuit.reduce ? null : r;
    return c;
  };
  c.text = function(x, y, s, o){ return txt(L.labels, x, y, s, o || {}); };
  c.start = function(){ if(!animate){ return c; } c._run = true; if(LIVE.indexOf(c)<0) LIVE.push(c); kick(); return c; };
  c.stop = function(){ c._run = false; return c; };
  c.destroy = function(){ c.stop(); var i=LIVE.indexOf(c); if(i>=0) LIVE.splice(i,1); while(svg.firstChild) svg.removeChild(svg.firstChild); };
  c.animated = function(){ return animate; };
  c._tick = function(dt, t){
    for(var k in tubes){
      var tb = tubes[k]; if(!tb.dots || !tb.dots.length || tb.st.hidden) continue;
      var v = clamp(tb.st.flow * (tb.o.k || Circuit.speedK), -Circuit.maxSpeed, Circuit.maxSpeed);
      if(tb.st.occl >= 1) v = 0;
      tb.phase += v*dt; placeDots(tb);
    }
    order.forEach(function(n){ var ty=T[n.type]; if(ty.tick && !n.st.hidden) ty.tick(n.o, n.st, dt, t); });
    if(c._alarmEl) c._alarmEl.setAttribute("opacity", 0.65 + 0.35*Math.abs(Math.sin(t*3)));
  };
  /* offset particles by a phase so static screenshots look evenly filled */
  c.settle = function(){ for(var k in tubes){ tubes[k].phase = 0; placeDots(tubes[k]); } return c; };
  /* describe current state as text (screen readers / findings) */
  c.describe = function(){
    var out = [];
    order.forEach(function(n){ if(n.type==="sensor" || n.type==="meter"){ if(n.st.value!==undefined) out.push((n.o.label||n.id) + " " + (typeof n.st.value==="number"?fmt(n.st.value,n.o.dec||0):n.st.value) + (n.o.unit?" "+n.o.unit:"")); } });
    return out.join(", ");
  };
  return c;
};

/* ---------- teaching pressure model for HD circuit ----------
   Approximate, linear, for teaching only (not machine-accurate).
   p: {Qb ml/min, needle gauge 14..17, Pacc access pressure mmHg (default 20), Qa access flow ml/min (optional),
       artKink 0..1, outflow 0..1 (venous outflow stenosis), venClot 0..1 (venous chamber clot), filterClot 0..1,
       venDisconnect bool, UFR ml/h, KUf ml/h/mmHg (default 50), catheter bool}
   returns {PA, PBE, PV, TMP, dP, alarms:[{code,text}]} in mmHg.
   Typical outputs at Qb 300, 15G: PA about -140, PV about +155, PBE about +220 */
Circuit.model = Circuit.model || {};
Circuit.model.hd = function(p){
  p = p || {};
  var Qb = p.Qb===undefined ? 300 : p.Qb, G = p.needle || 15;
  var Rn = {14:0.38, 15:0.5, 16:0.65, 17:0.9}[G] || 0.5;
  if(p.catheter) Rn = 0.42;
  var Pacc = p.Pacc===undefined ? 20 : p.Pacc;
  var inflowDef = (p.Qa!==undefined && p.Qa < Qb*1.1) ? (Qb*1.1 - p.Qa)*0.9 : 0;
  var kink = 1 + 2.2*clamp(p.artKink||0,0,1);
  var PA = -(Rn*Qb*kink + inflowDef) + Pacc*0.5;
  var fc = clamp(p.filterClot||0,0,1);
  var PV = Rn*0.9*Qb + Pacc + 110*clamp(p.outflow||0,0,1) + 120*clamp(p.venClot||0,0,1) - 18*fc;
  if(p.venDisconnect) PV = 5;
  var dP = 0.22*Qb*(1 + 3*fc);
  var PBE = PV + dP + (p.venDisconnect ? 0 : 0);
  var KUf = p.KUf || 50, UFR = p.UFR===undefined ? 600 : p.UFR;
  var TMP = UFR/KUf + 20 + 140*fc;
  var al = [];
  if(PA < -250) al.push({code:"PA_LOW", text:"Arterial pressure below limit"});
  if(PV > 250) al.push({code:"PV_HIGH", text:"Venous pressure above limit"});
  if(PV < 40) al.push({code:"PV_LOW", text:"Low venous pressure, check needle dislodgement"});
  if(TMP > 300) al.push({code:"TMP_HIGH", text:"High TMP"});
  if(PBE - PV > 150) al.push({code:"DP_HIGH", text:"High pre-filter to venous gradient, suspect dialyzer clotting"});
  return {PA:Math.round(PA), PBE:Math.round(PBE), PV:Math.round(PV), TMP:Math.round(TMP), dP:Math.round(PBE-PV), alarms:al};
};

/* ---------- presets ---------- */
Circuit.preset = Circuit.preset || {};

/* HD circuit. opts: {access:"fistula"|"catheter", heparin:true, animate}
   nodes: PT, PA (arterial gauge), BP (blood pump), HEP (heparin), PBE (pre-filter gauge), DZ (dialyzer), VC (venous chamber),
          PV (venous gauge), AD (air detector), VCL (venous clamp), DS (dialysate supply), BLD (blood leak), DR (drain), TMP (meter), M (machine region)
   tubes: art, pre, ven, ret1, ret2, ret3, hep, dia, eff1, eff2
   helpers: h.setFlows({Qb, Qd}), h.setPressures({PA,PBE,PV,TMP}), h.applyModel(p) runs Circuit.model.hd and shows alarms */
Circuit.preset.hd = function(svg, opts){
  opts = opts || {};
  var c = Circuit.create(svg, {w:900, h:400, animate:opts.animate});
  c.add("region","M",{x:128,y:34,w:756,h:350,title:"Hemodialysis machine"});
  c.add("patient","PT",{x:70,y:232,access:opts.access||"fistula",label:"Patient",sub:opts.access==="catheter"?"Catheter":"AV fistula"});
  c.add("pump","BP",{x:252,y:110,label:"Blood pump"});
  c.add("sensor","PA",{x:192,y:62,tap:[192,110],label:"Arterial (pre-pump)",unit:"mmHg",min:-400,max:100,lo:-250,hi:0,valuePos:"left"});
  if(opts.heparin!==false) c.add("syringe","HEP",{x:330,y:170,label:"Heparin",fluid:"heparin"});
  c.add("sensor","PBE",{x:390,y:62,tap:[390,110],label:"Pre-filter",unit:"mmHg",min:0,max:500,hi:400,sign:true});
  c.add("filter","DZ",{x:460,y:210,h:130,label:"Dialyzer",sub:"counter-current"});
  c.add("chamber","VC",{x:330,y:262,label:"Venous",sub:"chamber",labelPos:"left",fluid:"ven"});
  c.add("sensor","PV",{x:226,y:244,tap:[319,249],label:"Venous",unit:"mmHg",min:-100,max:400,lo:40,hi:250,valuePos:"below"});
  c.add("detector","AD",{x:262,y:350,label:"Air detector"});
  c.add("clamp","VCL",{x:200,y:350,label:"Clamp",labelPos:"above"});
  c.add("box","DS",{x:760,y:300,w:150,h:48,title:"Dialysate supply",titleSub:"Na K Ca HCO3 37°C"});
  c.add("detector","BLD",{x:640,y:80,label:"Blood leak"});
  c.add("box","DR",{x:790,y:80,w:90,h:40,title:"Drain"});
  c.add("meter","TMP",{x:600,y:205,label:"TMP",unit:"mmHg",hi:300});
  c.tube("art",{from:"PT.a",via:[[160,220],[160,110]],to:"BP.in",fluid:"art",flow:300});
  c.tube("pre",{from:"BP.out",via:[[460,110]],to:"DZ.bin",fluid:"art",flow:300});
  c.tube("ven",{from:"DZ.bout",via:[[460,300],[400,300],[400,222],[330,222]],to:"VC.in",fluid:"ven",flow:300});
  c.tube("ret1",{from:"VC.out",via:[[330,350]],to:"AD.out",fluid:"ven",flow:300});
  c.tube("ret2",{from:"AD.in",to:"VCL.out",fluid:"ven",flow:300});
  c.tube("ret3",{from:"VCL.in",via:[[140,350],[140,244]],to:"PT.v",fluid:"ven",flow:300});
  if(opts.heparin!==false) c.tube("hep",{from:"HEP.out",pts:[[330,182],[330,110]],fluid:"heparin",flow:20,w:4,arrows:false,spacing:12,k:0.6});
  c.tube("dia",{from:"DS.in",via:[[540,300],[540,248]],to:"DZ.din",fluid:"dialysate",flow:500});
  c.tube("eff1",{from:"DZ.dout",via:[[540,172],[540,80]],to:"BLD.in",fluid:"effluent",flow:500});
  c.tube("eff2",{from:"BLD.out",to:"DR.in",fluid:"effluent",flow:500});
  var h = c;
  h.setFlows = function(f){
    if(f.Qb!==undefined){ ["art","pre","ven","ret1","ret2","ret3"].forEach(function(k){ c.set(k,{flow:f.Qb}); }); c.set("BP",{rate:f.Qb}); }
    if(f.Qd!==undefined){ ["dia","eff1","eff2"].forEach(function(k){ c.set(k,{flow:f.Qd}); }); }
    return h;
  };
  h.setPressures = function(p){ ["PA","PBE","PV","TMP"].forEach(function(k){ if(p[k]!==undefined) c.set(k,{value:p[k]}); }); return h; };
  h.applyModel = function(p){
    var r = Circuit.model.hd(p);
    h.setPressures(r);
    c.set("art",{occl:p.artKink||0, occlAt:0.45, occlLabel:p.artKink?"kink":undefined});
    c.set("ven",{occl:0}); c.set("VC",{alarm:(p.venClot||0)>0.3, level:(p.venClot||0)>0.3?0.85:0.6});
    c.set("DZ",{clot:p.filterClot||0});
    c.alarm(r.alarms.length ? r.alarms[0].text : null);
    return r;
  };
  h.setFlows({Qb:opts.Qb||300, Qd:opts.Qd||500});
  h.setPressures(Circuit.model.hd({Qb:opts.Qb||300}));
  c.set("BP",{rate:opts.Qb||300});
  return c.start();
};

/* CRRT circuit. opts: {mode:"CVVH"|"CVVHD"|"CVVHDF", pre:true, post:true, citrate:false, animate}
   nodes: PT, PA (access gauge), BP, CIT (citrate bag), REPPRE, PF (pre-filter gauge), HF (hemofilter), PE (effluent gauge),
          EP (effluent pump), EFB (effluent bag), DIA (dialysate bag), REPPOST, VC, PR (return gauge), AD, VCL, CA (calcium bag)
   tubes: acc, cit, pre, rpre, eff1, eff2, eff3, dia, ret0, rpost, ret1, ret2, ret3, ca
   helpers: h.setMode(mode, {pre, post, citrate}), h.setFlows({Qb, Qpre, Qpost, Qd, Qeff (ml/h), Qcit (ml/h), Qca (ml/h)}),
            h.setPressures({PA, PF, PE, PR}) */
Circuit.preset.crrt = function(svg, opts){
  opts = opts || {};
  var c = Circuit.create(svg, {w:960, h:450, animate:opts.animate});
  c.add("region","M",{x:150,y:30,w:790,h:405,title:"CRRT machine"});
  c.add("patient","PT",{x:70,y:242,access:"catheter",label:"Patient",sub:"Dialysis catheter"});
  c.add("pump","BP",{x:280,y:110,label:"Blood pump"});
  c.add("sensor","PA",{x:215,y:60,tap:[215,110],label:"Access",unit:"mmHg",min:-300,max:100,lo:-200,hi:0,valuePos:"left"});
  c.add("bag","CIT",{x:240,y:200,tag:"Citrate",fluid:"citrate",label:"pre-pump"});
  c.add("bag","REPPRE",{x:370,y:46,h:44,tag:"Pre",fluid:"replace",label:"Pre-dilution",labelPos:"left"});
  c.add("sensor","PF",{x:470,y:60,tap:[470,110],label:"Pre-filter",unit:"mmHg",min:0,max:400,hi:300,sign:true});
  c.add("filter","HF",{x:560,y:240,h:150,label:"Hemofilter"});
  c.add("sensor","PE",{x:660,y:128,tap:[660,187],label:"Effluent",unit:"mmHg",min:-300,max:100,sign:true});
  c.add("pump","EP",{x:760,y:187,r:20,label:"Effluent pump",unit:"ml/h"});
  c.add("bag","EFB",{x:880,y:290,drain:true,fluid:"effluent",label:"Effluent bag",state:{level:0.35}});
  c.add("bag","DIA",{x:790,y:360,fluid:"dialysate",tag:"Dial",label:"Dialysate",labelPos:"right"});
  c.add("bag","REPPOST",{x:300,y:210,fluid:"replace",tag:"Post",label:"Post-dilution",labelPos:"right"});
  c.add("chamber","VC",{x:400,y:300,fluid:"ven",labelPos:"right",label:"Air trap"});
  c.add("sensor","PR",{x:470,y:390,tap:[400,370],label:"Return",unit:"mmHg",min:-50,max:350,hi:250,sign:true,valuePos:"right"});
  c.add("detector","AD",{x:320,y:410,label:"Air detector"});
  c.add("clamp","VCL",{x:250,y:410});
  c.add("bag","CA",{x:200,y:330,fluid:"calcium",tag:"Ca",label:"Calcium"});
  c.tube("acc",{from:"PT.a",via:[[175,230],[175,110]],to:"BP.in",fluid:"art",flow:150});
  c.tube("cit",{from:"CIT.side",pts:[[218,218],[175,218]],fluid:"citrate",flow:30,w:5,k:0.8,spacing:14});
  c.tube("pre",{from:"BP.out",via:[[560,110]],to:"HF.bin",fluid:"art",flow:150});
  c.tube("rpre",{from:"REPPRE.out",pts:[[370,76],[370,110]],fluid:"replace",flow:20,w:5,k:0.8,spacing:12,arrows:false});
  c.tube("eff1",{from:"HF.dout",via:[[660,187]],to:"EP.in",fluid:"effluent",flow:40});
  c.tube("eff2",{from:"EP.out",via:[[880,187]],to:"EFB.top",fluid:"effluent",flow:40});
  c.tube("dia",{from:"DIA.side",via:[[640,378],[640,293]],to:"HF.din",fluid:"dialysate",flow:20,w:6});
  c.tube("ret0",{from:"HF.bout",via:[[560,340],[460,340],[460,255],[400,255]],to:"VC.in",fluid:"ven",flow:150});
  c.tube("rpost",{from:"REPPOST.out",pts:[[300,248],[300,287],[389,287]],fluid:"replace",flow:20,w:5,k:0.8,spacing:12,arrows:false});
  c.tube("ret1",{from:"VC.out",via:[[400,410]],to:"AD.out",fluid:"ven",flow:150});
  c.tube("ret2",{from:"AD.in",to:"VCL.out",fluid:"ven",flow:150});
  c.tube("ret3",{from:"VCL.in",via:[[150,410],[150,254]],to:"PT.v",fluid:"ven",flow:150});
  c.tube("ca",{from:"CA.side",pts:[[178,348],[150,348]],fluid:"calcium",flow:10,w:4,k:0.8,spacing:12,arrows:false});
  var h = c, cfg = {mode:"CVVHDF", pre:true, post:true, citrate:false};
  h.setMode = function(mode, o){
    cfg.mode = mode || cfg.mode; if(o) merge(cfg, o);
    var dial = cfg.mode!=="CVVH", rep = cfg.mode!=="CVVHD";
    c.show("DIA", dial); c.show("dia", dial);
    c.show("REPPRE", rep && cfg.pre); c.show("rpre", rep && cfg.pre);
    c.show("REPPOST", rep && cfg.post); c.show("rpost", rep && cfg.post);
    c.show("CIT", !!cfg.citrate); c.show("cit", !!cfg.citrate);
    c.show("CA", !!cfg.citrate); c.show("ca", !!cfg.citrate);
    return h;
  };
  h.setFlows = function(f){
    if(f.Qb!==undefined){ ["acc","pre","ret0","ret1","ret2","ret3"].forEach(function(k){ c.set(k,{flow:f.Qb}); }); c.set("BP",{rate:f.Qb}); }
    function mlh(v){ return v/60*3; } // particle speed for ml/h lines (visual only)
    if(f.Qpre!==undefined) c.set("rpre",{flow:mlh(f.Qpre)});
    if(f.Qpost!==undefined) c.set("rpost",{flow:mlh(f.Qpost)});
    if(f.Qd!==undefined) c.set("dia",{flow:mlh(f.Qd)});
    if(f.Qcit!==undefined) c.set("cit",{flow:mlh(f.Qcit)});
    if(f.Qca!==undefined) c.set("ca",{flow:mlh(f.Qca)});
    if(f.Qeff!==undefined){ c.set("eff1",{flow:mlh(f.Qeff)}); c.set("eff2",{flow:mlh(f.Qeff)}); c.set("EP",{rate:f.Qeff, speed:f.Qeff/20}); }
    return h;
  };
  h.setPressures = function(p){ ["PA","PF","PE","PR"].forEach(function(k){ if(p[k]!==undefined) c.set(k,{value:p[k]}); }); return h; };
  h.setMode(opts.mode||"CVVHDF", {pre:opts.pre!==false, post:opts.post!==false, citrate:!!opts.citrate});
  h.setFlows({Qb:150, Qpre:1000, Qpost:500, Qd:1000, Qeff:2600, Qcit:180, Qca:40});
  h.setPressures({PA:-80, PF:150, PE:-60, PR:90});
  return c.start();
};

/* Water treatment plant (direct-feed loop). opts: {di:true, animate}
   nodes: FEED, SOFT, CW (carbon worker), CP (carbon polisher), CL (total chlorine meter), RO, COND (conductivity meter),
          DI, RES (resistivity meter), ST (storage), UFF (endotoxin ultrafilter), MAC (HD machines), MIC (bacteria/endotoxin meter), DRN
   tubes: w0..w8, rej, loop
   helpers: h.setFault(name|null) "carbon" (chloramine breakthrough) | "di" (DI exhaustion) | "ro" (RO membrane failure) |
            "biofilm" (bacteria/endotoxin) ; h.values() returns meter values */
Circuit.preset.water = function(svg, opts){
  opts = opts || {};
  var c = Circuit.create(svg, {w:960, h:340, animate:opts.animate});
  var y = 160;
  c.add("box","FEED",{x:55,y:y,w:70,h:46,title:"Feed",titleSub:"municipal"});
  c.add("tank","SOFT",{x:150,y:y,tag:"Soft",media:"#cfe3d8",label:"Softener"});
  c.add("tank","CW",{x:235,y:y,tag:"C1",media:"#3c3c44",fillColor:"#55555f",label:"Carbon",sub:"worker"});
  c.add("tank","CP",{x:305,y:y,tag:"C2",media:"#3c3c44",fillColor:"#55555f",label:"Carbon",sub:"polisher"});
  c.add("meter","CL",{x:365,y:70,tap:[365,y],label:"Total chlorine",unit:"mg/L",dec:2,hi:0.1,w:104});
  c.add("box","RO",{x:460,y:y,w:96,h:56,title:"RO",titleSub:"reverse osmosis"});
  c.add("meter","COND",{x:545,y:70,tap:[545,y],label:"Conductivity",unit:"µS/cm",dec:0,hi:20,w:110});
  var di = opts.di!==false;
  if(di){ c.add("tank","DI",{x:615,y:y,tag:"DI",media:"#d9d2ef",label:"Deionizer"}); c.add("meter","RES",{x:680,y:70,tap:[668,y],label:"Resistivity",unit:"MΩ cm",dec:1,lo:1,w:104}); }
  c.add("tank","ST",{x:720,y:y,w:48,h:90,media:"#dff0fb",label:"Storage"});
  c.add("box","UFF",{x:798,y:y,w:58,h:56,title:"UF",titleSub:"endotoxin",fs:12});
  c.add("meter","MIC",{x:860,y:70,tap:[848,y],label:"Bacteria CFU/ml",dec:0,hi:50,w:96});
  c.add("box","MAC",{x:905,y:y,w:66,h:56,title:"HD",titleSub:"machines"});
  c.add("box","DRN",{x:460,y:300,w:80,h:34,title:"Drain"});
  c.tube("w0",{from:"FEED.out",to:"SOFT.in",fluid:"feed",flow:300});
  c.tube("w1",{from:"SOFT.out",to:"CW.in",fluid:"feed",flow:300});
  c.tube("w2",{from:"CW.out",to:"CP.in",fluid:"feed",flow:300});
  c.tube("w3",{from:"CP.out",to:"RO.in",fluid:"feed",flow:300});
  c.tube("w4",{from:"RO.out",to:di?"DI.in":"ST.in",fluid:"water",flow:220});
  if(di) c.tube("w5",{from:"DI.out",to:"ST.in",fluid:"water",flow:220});
  c.tube("w6",{from:"ST.out",to:"UFF.in",fluid:"water",flow:260});
  c.tube("w7",{from:"UFF.out",to:"MAC.in",fluid:"water",flow:260});
  c.tube("rej",{from:"RO.bottom",to:"DRN.top",fluid:"reject",flow:80,label:"Reject",labelDx:24,labelDy:4});
  c.tube("loop",{from:"MAC.bottom",via:[[905,265],[720,265]],to:"ST.bottom",fluid:"water",flow:60,label:"Loop return",labelDy:16});
  var h = c, fault = null;
  var base = {CL:0.02, COND:8, RES:15, MIC:5};
  h.values = function(){
    var v = merge({}, base);
    if(fault==="carbon"){ v.CL = 0.4; }
    if(fault==="ro"){ v.COND = 85; v.RES = di?2.5:null; }
    if(fault==="di"){ v.RES = 0.4; }
    if(fault==="biofilm"){ v.MIC = 180; }
    return v;
  };
  h.setFault = function(f){
    fault = f || null;
    var v = h.values();
    c.set("CL",{value:v.CL}); c.set("COND",{value:v.COND}); if(di) c.set("RES",{value:v.RES}); c.set("MIC",{value:v.MIC});
    c.set("CW",{exhaust:fault==="carbon"?0.95:0.2, alarm:fault==="carbon"}); c.set("CP",{exhaust:fault==="carbon"?0.7:0.05});
    c.set("RO",{alarm:fault==="ro"}); if(di) c.set("DI",{exhaust:fault==="di"?1:0.3, alarm:fault==="di"});
    c.set("ST",{alarm:fault==="biofilm"}); c.set("loop",{fluid:fault==="biofilm"?"cloudy":"water"});
    var msg = {carbon:"Total chlorine > 0.1 mg/L, stop dialysis", ro:"High product water conductivity", di:"Resistivity < 1 MΩ cm, stop water use", biofilm:"Bacteria above action level"}[fault];
    c.alarm(msg ? {text:msg} : null);
    return h;
  };
  h.setFault(null);
  return c.start();
};

/* Peritoneal dialysis. opts: {mode:"CAPD"|"APD", animate}
   nodes: BAG (fresh), CYC (APD cycler), Y (Y-connector), AB (abdomen), DRB (drain bag)
   tubes: fill, drain, cath
   helpers: h.phase("fill"|"dwell"|"drain", {fill:0..1, volume, cloudy}) sets flows and peritoneal fill level */
Circuit.preset.pd = function(svg, opts){
  opts = opts || {};
  var apd = opts.mode === "APD";
  var c = Circuit.create(svg, {w:760, h:380, animate:opts.animate});
  c.add("bag","BAG",{x:150,y:70,w:56,h:70,fluid:"pd",tag:apd?"5 L":"2 L",label:apd?"Dialysis solution":"Fresh bag",labelPos:"right"});
  if(apd) c.add("box","CYC",{x:230,y:200,w:110,h:60,title:"APD cycler",titleSub:"heater + pump"});
  else c.add("junction","Y",{x:250,y:200,r:6,color:C.teal});
  c.add("abdomen","AB",{x:540,y:200,label:"Patient",state:{fill:0.1}});
  c.add("bag","DRB",{x:150,y:320,w:56,h:60,drain:true,fluid:"pd",label:"Drain bag",labelPos:"right",state:{level:0.1}});
  var hub = apd ? "CYC" : "Y";
  c.tube("fill",{from:"BAG.out",via:[[150,apd?170:200]],to:apd?"CYC.ina":"Y.c",fluid:"pd",flow:0,w:7,elbow:"vh"});
  c.tube("cath",{from:apd?"CYC.out":"Y.c",to:"AB.c",fluid:"pd",flow:0,w:7});
  c.tube("drain",{from:apd?"CYC.inb":"Y.c",via:apd?[[150,215]]:[[250,250],[150,250]],to:"DRB.top",fluid:"pd",flow:0,w:7});
  var h = c;
  h.phase = function(ph, o){
    o = o || {};
    var fl = o.cloudy ? "cloudy" : "pd";
    c.set("fill",{flow:ph==="fill"?200:0}); c.set("drain",{flow:ph==="drain"?200:0, fluid:fl});
    c.set("cath",{flow:ph==="fill"?200:(ph==="drain"?-200:0), fluid:ph==="drain"?fl:"pd"});
    c.set("AB",{fill:o.fill!==undefined?o.fill:(ph==="dwell"?0.75:ph==="fill"?0.5:0.2), fluid:fl, volume:o.volume});
    if(o.drainLevel!==undefined) c.set("DRB",{level:o.drainLevel, fluid:fl});
    return h;
  };
  h.phase("dwell",{volume:2000});
  void hub;
  return c.start();
};

/* Membrane plasma exchange (TPE). opts: {animate}
   nodes: PT, BP, PA, PS (plasma separator), PP (plasma pump), WB (waste bag), RB (replacement bag), RP (replacement pump), VC, PV, AD
   tubes: art, pre, pl1, pl2, ven, rp1, rp2, ret
   helpers: h.setFlows({Qb, Qp ml/min, Qr ml/min}), h.setReplacement("albumin"|"plasma") */
Circuit.preset.plex = function(svg, opts){
  opts = opts || {};
  var c = Circuit.create(svg, {w:900, h:420, animate:opts.animate});
  c.add("region","M",{x:128,y:34,w:756,h:372,title:"Plasma exchange (membrane separation)"});
  c.add("patient","PT",{x:70,y:232,access:opts.access||"catheter",label:"Patient"});
  c.add("pump","BP",{x:252,y:110,label:"Blood pump"});
  c.add("sensor","PA",{x:192,y:62,tap:[192,110],label:"Access",unit:"mmHg",min:-300,max:100,lo:-200,hi:0,valuePos:"left"});
  c.add("filter","PS",{x:460,y:210,h:130,label:"Plasma separator",sub:"pore 0.3 µm"});
  c.add("pump","PP",{x:700,y:172,r:20,label:"Plasma pump"});
  c.add("bag","WB",{x:820,y:260,drain:true,fluid:"plasma",label:"Waste plasma",state:{level:0.2}});
  c.add("bag","RB",{x:330,y:180,fluid:"albumin",tag:"5%",label:"Replacement",labelPos:"left"});
  c.add("pump","RP",{x:330,y:255,r:16,label:"",showRate:false});
  c.add("chamber","VC",{x:400,y:330,fluid:"ven",label:"Venous chamber",labelPos:"right"});
  c.add("detector","AD",{x:262,y:380,label:"Air detector"});
  c.tube("art",{from:"PT.a",via:[[160,220],[160,110]],to:"BP.in",fluid:"art",flow:100});
  c.tube("pre",{from:"BP.out",via:[[460,110]],to:"PS.bin",fluid:"art",flow:100});
  c.tube("pl1",{from:"PS.dout",to:"PP.in",fluid:"plasma",flow:30});
  c.tube("pl2",{from:"PP.out",via:[[820,172]],to:"WB.top",fluid:"plasma",flow:30});
  c.tube("ven",{from:"PS.bout",via:[[460,292],[400,292]],to:"VC.in",fluid:"ven",flow:100});
  c.tube("rp1",{from:"RB.out",to:"RP.top",fluid:"albumin",flow:30,w:6});
  c.tube("rp2",{from:"RP.right",pts:[[346,255],[370,255],[370,317],[389,317]],fluid:"albumin",flow:30,w:6,arrows:false});
  c.tube("ret",{from:"VC.out",via:[[400,380]],to:"AD.out",fluid:"ven",flow:100});
  c.tube("ret2",{from:"AD.in",via:[[140,380],[140,244]],to:"PT.v",fluid:"ven",flow:100});
  var h = c;
  h.setFlows = function(f){
    if(f.Qb!==undefined){ ["art","pre","ven","ret","ret2"].forEach(function(k){ c.set(k,{flow:f.Qb}); }); c.set("BP",{rate:f.Qb}); }
    if(f.Qp!==undefined){ c.set("pl1",{flow:f.Qp}); c.set("pl2",{flow:f.Qp}); c.set("PP",{rate:f.Qp}); }
    if(f.Qr!==undefined){ c.set("rp1",{flow:f.Qr}); c.set("rp2",{flow:f.Qr}); c.set("RP",{rate:f.Qr}); }
    return h;
  };
  h.setReplacement = function(kind){
    var fl = kind==="plasma" ? "plasma" : "albumin";
    c.set("RB",{fluid:fl, opts:{tag:kind==="plasma"?"FFP":"5%"}}); c.set("rp1",{fluid:fl}); c.set("rp2",{fluid:fl});
    return h;
  };
  h.setFlows({Qb:100, Qp:30, Qr:30});
  c.set("PA",{value:-60});
  return c.start();
};
})();
