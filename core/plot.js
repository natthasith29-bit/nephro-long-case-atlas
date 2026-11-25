/* CORE-04 Curve plotter (v1.2.0)
   v1.2 (rule v6 global defaults): a chart with a visible y2 series is drawn as two stacked panels on one x axis
   (no right-hand axis, canvas grows x1.4, opt out with split:false) and charts with 2+ named series label each line
   at its end instead of a legend (opt out with endLabels:false or series.endLabel:false). padR fits the longest end label.
   v1.1 (rule v6 "graph diet"): series.endLabel (name at line end instead of legend), opts.callouts (annotated key points),
   bands[].mid (label at right inside the plot, vertically centred, hidden when the band is too thin), y.labelPos:"top" (horizontal axis title above the plot), opts.padR override, opts.xAxis:false (hide x ticks for stacked panels), Plot.link(charts) shared hover
   Canvas charts for time-series, sawtooth kinetics, dose-response, and live monitor strips (Doppler, pressure, ECG).
   HiDPI, responsive (ResizeObserver), hover crosshair with readout, progressive draw animation,
   presentation-mode font scaling, prefers-reduced-motion respected.
   Rule: backward-compatible changes only (add functions, never change existing signatures).

   Usage:
     <script src="../core/plot.js"></script>
     var ch = Plot.chart(document.getElementById("box"), {
       height: 260, aria: "BUN ตลอดสัปดาห์",
       x: {min:0, max:168, label:"ชั่วโมง", step:24},
       y: {min:0, label:"BUN (mg/dL)"},
       series: [{id:"bun", name:"BUN", color:Plot.colors.navy, data:[[0,60],[4,20]...], fill:true}],
       hlines: [{y:65, label:"เป้า", color:Plot.colors.red, dash:[6,4]}],
       xbands: [{x0:8, x1:12, label:"HD", color:"rgba(31,122,114,.12)"}],
       marks: [{x:4, y:20, label:"post"}]
     });
     ch.setSeries("bun", newData); ch.update({hlines:[...]}); ch.animate(900);

   Live strip (monitor style, erase bar sweeps left to right):
     var m = Plot.sweep(el, {height:180, window:4, y:{min:-20,max:120,label:"cm/s"}, theme:"dark",
                             fn:function(t){ return 60*Math.sin(t*6); }, color:"#7CFC9A"});
     m.setFn(newFn); m.stop(); m.start();
*/
(function(){
"use strict";
var Plot = window.Plot = window.Plot || {};
Plot.version = "1.2.0";
Plot.colors = {accent:"#5B4BFF", accent2:"#19C8E6", navy:"#0E0857", teal:"#1F7A72", red:"#B4232A", gold:"#d9a400", muted:"#5b5b6b", line:"#d9d9e3",
  blue:"#2f6fa3", purple:"#6b3fa0", orange:"#d9731a", green:"#4d8a1f", ink:"#111111"};
Plot.cycle = ["#0E0857","#1F7A72","#B4232A","#d9a400","#2f6fa3","#6b3fa0","#d9731a","#4d8a1f"];
/* Sync palette with core.css tokens (theme-proof). Called on each chart/sweep creation. */
Plot.syncTheme = function(){
  var map = {accent:"--accent", accent2:"--accent2", navy:"--navy", teal:"--teal", red:"--red", gold:"--gold", muted:"--muted", line:"--line", ink:"--ink"};
  for(var k in map){ var v = cssVar(map[k], ""); if(v) Plot.colors[k] = v; }
  if(!Plot.colors.accent) Plot.colors.accent = Plot.colors.navy;
  Plot.cycle = [Plot.colors.accent, Plot.colors.teal, Plot.colors.red, Plot.colors.gold, Plot.colors.accent2||"#2f6fa3", "#6b3fa0", "#d9731a", "#4d8a1f"];
  return Plot.colors;
};
var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
function isPresent(){ return document.body && document.body.classList.contains("present"); }
function cssVar(n, d){ try { var v = getComputedStyle(document.documentElement).getPropertyValue(n); return v && v.trim() ? v.trim() : d; } catch(e){ return d; } }
var FONT_BODY = function(){ return cssVar("--body", "Sarabun, Tahoma, sans-serif"); };
var FONT_MONO = function(){ return cssVar("--mono", "'IBM Plex Mono', monospace"); };

/* nice tick step for a range */
Plot.niceStep = function(range, target){
  target = target || 5;
  var raw = range/target, mag = Math.pow(10, Math.floor(Math.log(raw)/Math.LN10)), r = raw/mag;
  return (r<1.5?1:r<3?2:r<7?5:10)*mag;
};
Plot.ticks = function(min, max, step){
  var out = [], s = step || Plot.niceStep(max-min), start = Math.ceil(min/s - 1e-9)*s;
  for(var v=start; v<=max+s*1e-6; v+=s) out.push(Math.abs(v)<s*1e-9 ? 0 : +v.toFixed(10));
  return out;
};
function logTicks(min, max){
  var out = [], a = Math.floor(Math.log(min)/Math.LN10), b = Math.ceil(Math.log(max)/Math.LN10);
  for(var e=a; e<=b; e++){ var v = Math.pow(10,e); if(v>=min*0.999 && v<=max*1.001) out.push(v); }
  return out;
}
function defFmt(step){
  var d = step>=1 ? 0 : Math.min(4, Math.ceil(-Math.log(step)/Math.LN10));
  return function(v){ var s = Number(v).toFixed(d); return s.replace(/\B(?=(\d{3})+(?!\d))/g, ","); };
}
function logFmt(v){ return v>=1000 ? (v/1000)+"k" : String(v); }
/* sample(fn, x0, x1, n) -> [[x, y]] (also in Calc) */
Plot.sample = function(fn, x0, x1, n){ n = n||200; var o = []; for(var i=0;i<=n;i++){ var x = x0+(x1-x0)*i/n; o.push([x, fn(x)]); } return o; };
function interp(data, x, step){
  if(!data || !data.length || x<data[0][0] || x>data[data.length-1][0]) return null;
  for(var i=1;i<data.length;i++){
    if(x<=data[i][0]){ var a=data[i-1], b=data[i]; if(step) return a[1]; var u=(x-a[0])/((b[0]-a[0])||1); return a[1]+u*(b[1]-a[1]); }
  }
  return data[data.length-1][1];
}
Plot.valueAt = interp;
/* logSample(fn, x0, x1, n): points evenly spaced on a log axis */
Plot.logSample = function(fn, x0, x1, n){ n = n||120; var o = [], a = Math.log(x0), b = Math.log(x1); for(var i=0;i<=n;i++){ var x = Math.exp(a+(b-a)*i/n); o.push([x, fn(x)]); } return o; };

function setupCanvas(target, height, aria){
  var canvas, wrap;
  if(target.tagName === "CANVAS"){ canvas = target; wrap = canvas.parentNode; }
  else { wrap = target; canvas = document.createElement("canvas"); wrap.appendChild(canvas); }
  canvas.style.display = "block"; canvas.style.width = "100%";
  canvas.style.height = (height||260) + "px";
  canvas.style.touchAction = "pan-y";
  canvas.setAttribute("role", "img");
  if(aria) canvas.setAttribute("aria-label", aria);
  return {canvas:canvas, wrap:wrap};
}
function fitCanvas(c){
  var dpr = Math.min(window.devicePixelRatio||1, 3), w = c.clientWidth || 600, h = c.clientHeight || 260;
  if(c.width !== Math.round(w*dpr) || c.height !== Math.round(h*dpr)){ c.width = Math.round(w*dpr); c.height = Math.round(h*dpr); }
  var ctx = c.getContext("2d"); ctx.setTransform(dpr,0,0,dpr,0,0);
  return {ctx:ctx, w:w, h:h};
}
function merge(a, b){ var o = {}, k; for(k in a) o[k] = a[k]; for(k in b) o[k] = b[k]; return o; }

/* ---------------- static / interactive chart ---------------- */
Plot.chart = function(target, opts){
  opts = opts || {}; Plot.syncTheme();
  var su = setupCanvas(target, opts.height, opts.aria), canvas = su.canvas;
  var ch = {canvas:canvas, opts:opts, progress:1, hoverX:null};
  var anim = null, ro = null, geom = null;

  function axisRange(ax, which){
    var lo = ax.min, hi = ax.max;
    if(lo===undefined || hi===undefined){
      var mn = Infinity, mx = -Infinity;
      (opts.series||[]).forEach(function(s){
        if(s.hidden || (which!=="x" && (s.axis||"y")!==which)) return;
        (s.data||[]).forEach(function(p){ var v = which==="x" ? p[0] : p[1]; if(v!==null && isFinite(v)){ if(v<mn) mn=v; if(v>mx) mx=v; } });
      });
      if(which!=="x") (opts.hlines||[]).forEach(function(l){ if((l.axis||"y")===which){ mn=Math.min(mn,l.y); mx=Math.max(mx,l.y); } });
      if(!isFinite(mn)){ mn = 0; mx = 1; }
      if(mn===mx){ mn -= 1; mx += 1; }
      var pad = which==="x" ? 0 : (mx-mn)*0.08;
      if(lo===undefined) lo = ax.log ? mn : (which!=="x" && mn>=0 && mn-pad<0 ? 0 : mn-pad);
      if(hi===undefined) hi = mx+pad;
      if(!ax.log && which!=="x" && ax.nice!==false){ var st = Plot.niceStep(hi-lo, ax.ticks||5); if(ax.min===undefined) lo = Math.floor(lo/st)*st; if(ax.max===undefined) hi = Math.ceil(hi/st)*st; }
    }
    return [lo, hi];
  }

  ch.draw = function(){
    var SER = opts.series||[];
    var split = !!opts.y2 && opts.split!==false && SER.some(function(s){ return s.axis==="y2" && !s.hidden && s.data && s.data.length; });
    var wantH = Math.round((opts.height||260) * (split ? (isPresent() ? (opts.splitGrowPresent||1) : (opts.splitGrow||1.4)) : 1)) + "px";
    if(canvas.style.height !== wantH) canvas.style.height = wantH;
    var fc = fitCanvas(canvas), ctx = fc.ctx, W = fc.w, H = fc.h;
    var dark = opts.theme==="dark", sc = isPresent() ? 1.3 : (opts.fontScale||1);
    var named = SER.filter(function(s){ return s.name && !s.hidden && s.data && s.data.length; });
    var autoEnd = opts.endLabels!==false && named.length>=2 && named.length<=6;
    function endOf(s){ if(s.endLabel===false) return false; if(s.endLabel) return s.endLabel; return (autoEnd && s.name) ? true : false; }
    var fs = 12*sc, fsl = 12.5*sc, bodyF = FONT_BODY(), monoF = FONT_MONO();
    var fg = dark ? "#cfd3e6" : Plot.colors.muted, grid = dark ? "rgba(255,255,255,.10)" : hexA(Plot.colors.line.length===7?Plot.colors.line:"#e6e7f0", .7), axisC = dark ? "rgba(255,255,255,.35)" : Plot.colors.line;
    var X = opts.x||{}, Y = opts.y||{}, Y2 = opts.y2;
    var xr = axisRange(X,"x"), yr = axisRange(Y,"y"), y2r = Y2 ? axisRange(Y2,"y2") : null;
    var legendH = (opts.legend!==false && SER.filter(function(s){return s.name && !s.hidden && !endOf(s) && (s.data||[]).length;}).length>1) ? 20*sc : 0;
    var yTop = (Y.labelPos==="top" || split) && Y.label;
    var endW = 0; ctx.font = "600 "+(12*sc)+"px "+bodyF;
    SER.forEach(function(s){ var e = endOf(s); if(e && !s.hidden && s.data && s.data.length){ endW = Math.max(endW, ctx.measureText(typeof e==="string" ? e : (s.name||s.id)).width); } });
    var endPad = endW ? Math.min(130*sc, endW + 12*sc) : 0;
    var padL = (opts.padL!==undefined?opts.padL*sc:(yTop?44*sc:(Y.label?56*sc:44*sc))), padR = (opts.padR!==undefined?opts.padR*sc:((Y2 && !split) ? Math.max(56*sc, endPad) : Math.max(14*sc, endPad))), padT = (10*sc)+legendH+(yTop?18*sc:0), padB = (opts.xAxis===false?8:(X.label?44:28))*sc;
    var pw = Math.max(10, W-padL-padR), ph = Math.max(10, H-padT-padB);
    var gapP = split ? 30*sc : 0, P1 = {t:padT, h:split ? (ph-gapP)*(opts.splitRatio||0.58) : ph}, P2 = split ? {t:padT + (ph-gapP)*(opts.splitRatio||0.58) + gapP, h:(ph-gapP)*(1-(opts.splitRatio||0.58))} : P1;
    var PANELS = split ? [P1, P2] : [P1];
    function tx(v){ if(X.log){ var a=Math.log(xr[0]), b=Math.log(xr[1]); return padL + (Math.log(Math.max(v,1e-12))-a)/(b-a)*pw; } return padL + (v-xr[0])/(xr[1]-xr[0])*pw; }
    function tyFor(r, ax, P){ return function(v){ if(ax && ax.log){ var a=Math.log(r[0]), b=Math.log(r[1]); return P.t + P.h - (Math.log(Math.max(v,1e-12))-a)/(b-a)*P.h; } return P.t + P.h - (v-r[0])/(r[1]-r[0])*P.h; }; }
    var ty = tyFor(yr, Y, P1), ty2 = Y2 ? tyFor(y2r, Y2, P2) : null;
    function panelOf(axis){ return (axis==="y2" && split) ? P2 : P1; }
    function invx(px){ var u = (px-padL)/pw; if(X.log){ return Math.exp(Math.log(xr[0]) + u*(Math.log(xr[1])-Math.log(xr[0]))); } return xr[0] + u*(xr[1]-xr[0]); }
    geom = {tx:tx, ty:ty, ty2:ty2, invx:invx, padL:padL, padT:padT, pw:pw, ph:ph, xr:xr, yr:yr, split:split, panels:PANELS};
    ch.geom = geom;

    ctx.clearRect(0,0,W,H);
    if(opts.bg || dark){ ctx.fillStyle = opts.bg || "#05060f"; ctx.fillRect(0,0,W,H); }

    // x bands (e.g., dialysis sessions)
    (opts.xbands||[]).forEach(function(b){
      var a = tx(Math.max(b.x0,xr[0])), c = tx(Math.min(b.x1,xr[1])); if(c<=a) return;
      ctx.fillStyle = b.color || "rgba(31,122,114,.12)"; PANELS.forEach(function(P){ ctx.fillRect(a, P.t, c-a, P.h); });
      if(b.label){ ctx.fillStyle = b.textColor || fg; ctx.font = "600 "+(11*sc)+"px "+bodyF; ctx.textAlign = "center"; ctx.textBaseline = "top"; if(c-a > ctx.measureText(b.label).width+2) ctx.fillText(b.label, (a+c)/2, padT+2); }
    });
    // y bands (reference ranges)
    (opts.bands||[]).forEach(function(b){
      var tyb = (b.axis==="y2" && ty2) ? ty2 : ty, r = (b.axis==="y2" && y2r) ? y2r : yr;
      var y0 = tyb(Math.min(Math.max(b.y0,r[0]),r[1])), y1 = tyb(Math.min(Math.max(b.y1,r[0]),r[1]));
      ctx.fillStyle = b.color || "rgba(227,245,201,.6)"; ctx.fillRect(padL, Math.min(y0,y1), pw, Math.abs(y1-y0));
      if(b.label && b.mid){ if(Math.abs(y1-y0) >= 13*sc){ ctx.fillStyle = b.textColor || fg; ctx.font = "600 "+(11*sc)+"px "+bodyF; ctx.textAlign = "right"; ctx.textBaseline = "middle"; ctx.fillText(b.label, padL+pw-6*sc, (y0+y1)/2); } }
      else if(b.label){ ctx.fillStyle = b.textColor || fg; ctx.font = "600 "+(11*sc)+"px "+bodyF; ctx.textAlign = "right"; ctx.textBaseline = "top"; ctx.fillText(b.label, padL+pw-4, Math.min(y0,y1)+2); }
    });

    // grid + ticks
    ctx.lineWidth = 1; ctx.font = fs+"px "+monoF; ctx.fillStyle = fg;
    var yt = Y.log ? logTicks(yr[0],yr[1]) : (Y.tickValues || Plot.ticks(yr[0], yr[1], Y.step || Plot.niceStep(yr[1]-yr[0], Y.ticks||5)));
    var yf = Y.fmt || (Y.log ? logFmt : defFmt(Y.step || Plot.niceStep(yr[1]-yr[0], Y.ticks||5)));
    ctx.textAlign = "right"; ctx.textBaseline = "middle";
    var lastLab = null, minGap = 13*sc;
    yt.forEach(function(v){ var y = ty(v); if(y<P1.t-1 || y>P1.t+P1.h+1) return; if(lastLab!==null && Math.abs(lastLab-y) < minGap) return; lastLab = y; ctx.strokeStyle = grid; ctx.beginPath(); ctx.moveTo(padL, Math.round(y)+0.5); ctx.lineTo(padL+pw, Math.round(y)+0.5); ctx.stroke(); ctx.fillText(yf(v), padL-6*sc, y); });
    var xt = X.log ? logTicks(xr[0],xr[1]) : (X.tickValues || Plot.ticks(xr[0], xr[1], X.step || Plot.niceStep(xr[1]-xr[0], X.ticks||Math.max(3,Math.round(pw/(80*sc))))));
    var xf = X.fmt || (X.log ? logFmt : defFmt(X.step || Plot.niceStep(xr[1]-xr[0], X.ticks||Math.max(3,Math.round(pw/(80*sc))))));
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    xt.forEach(function(v){ var x = tx(v); if(x<padL-1 || x>padL+pw+1) return; if(X.grid!==false){ ctx.strokeStyle = grid; PANELS.forEach(function(P){ ctx.beginPath(); ctx.moveTo(Math.round(x)+0.5, P.t); ctx.lineTo(Math.round(x)+0.5, P.t+P.h); ctx.stroke(); }); } if(opts.xAxis!==false) ctx.fillText(xf(v), x, padT+ph+5*sc); });
    if(Y2){
      var y2t = Y2.log ? logTicks(y2r[0],y2r[1]) : Plot.ticks(y2r[0], y2r[1], Y2.step || Plot.niceStep(y2r[1]-y2r[0], Y2.ticks||5)), y2f = Y2.fmt || defFmt(Y2.step || Plot.niceStep(y2r[1]-y2r[0], Y2.ticks||5));
      if(split){ ctx.textAlign = "right"; ctx.textBaseline = "middle"; ctx.fillStyle = fg;
        var last2 = null;
        y2t.forEach(function(v){ var y = ty2(v); if(y<P2.t-1 || y>P2.t+P2.h+1) return; if(last2!==null && Math.abs(last2-y) < 13*sc) return; last2 = y; ctx.strokeStyle = grid; ctx.beginPath(); ctx.moveTo(padL, Math.round(y)+0.5); ctx.lineTo(padL+pw, Math.round(y)+0.5); ctx.stroke(); ctx.fillText(y2f(v), padL-6*sc, y); }); }
      else { ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.fillStyle = Y2.color || fg;
        y2t.forEach(function(v){ var y = ty2(v); if(y<padT-1 || y>padT+ph+1) return; ctx.fillText(y2f(v), padL+pw+6*sc, y); }); }
    }
    // axes
    ctx.strokeStyle = axisC; PANELS.forEach(function(P){ ctx.beginPath(); ctx.moveTo(padL+0.5, P.t); ctx.lineTo(padL+0.5, P.t+P.h+0.5); ctx.lineTo(padL+pw, P.t+P.h+0.5); ctx.stroke(); });
    // axis labels
    ctx.fillStyle = fg; ctx.font = "600 "+fsl+"px "+bodyF;
    if(X.label && opts.xAxis!==false){ ctx.textAlign = "center"; ctx.textBaseline = "bottom"; ctx.fillText(X.label, padL+pw/2, H-4*sc); }
    if(yTop){ ctx.textAlign = "left"; ctx.textBaseline = "top"; ctx.fillStyle = Y.color || Plot.colors.ink; ctx.fillText(Y.label, padL-padL+4*sc, legendH+4*sc); ctx.fillStyle = fg; }
    else if(Y.label){ ctx.save(); ctx.translate(12*sc, padT+ph/2); ctx.rotate(-Math.PI/2); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(Y.label, 0, 0); ctx.restore(); }
    if(split && Y2.label){ ctx.textAlign = "left"; ctx.textBaseline = "top"; ctx.fillStyle = Y2.color || Plot.colors.ink; ctx.fillText(Y2.label, 4*sc, P2.t - gapP + 9*sc); ctx.fillStyle = fg; }
    else if(Y2 && Y2.label){ ctx.save(); ctx.fillStyle = Y2.color || fg; ctx.translate(W-10*sc, padT+ph/2); ctx.rotate(Math.PI/2); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(Y2.label, 0, 0); ctx.restore(); }

    // clip plot area (progress animation clips along x)
    var xClip = xr[0] + (xr[1]-xr[0])*ch.progress;
    var clipW = (X.log? (tx(xClip)-padL) : pw*ch.progress);

    SER.forEach(function(s, si){
      if(s.hidden || !s.data || !s.data.length) return;
      var col = s.color || Plot.cycle[si % Plot.cycle.length], yy = (s.axis==="y2" && ty2) ? ty2 : ty;
      var pts = s.data.filter(function(p){ return p[1]!==null && isFinite(p[1]); });
      if(!pts.length) return;
      var PP = split ? panelOf(s.axis) : {t:padT, h:ph};
      ctx.save(); ctx.beginPath(); ctx.rect(padL, PP.t-2, clipW, PP.h+4); ctx.clip();
      function path(){
        ctx.beginPath();
        var started = false, prev = null;
        s.data.forEach(function(p){
          if(p[1]===null || !isFinite(p[1])){ started = false; return; }
          var x = tx(p[0]), y = yy(p[1]);
          if(!started){ ctx.moveTo(x,y); started = true; }
          else if(s.step){ ctx.lineTo(x, yy(prev[1])); ctx.lineTo(x,y); }
          else ctx.lineTo(x,y);
          prev = p;
        });
      }
      if(s.fill){
        path();
        var base = (typeof s.fill==="object" && s.fill.to!==undefined) ? yy(s.fill.to) : yy(Math.max(yr[0], Math.min(0, yr[1])));
        ctx.lineTo(tx(pts[pts.length-1][0]), base); ctx.lineTo(tx(pts[0][0]), base); ctx.closePath();
        ctx.fillStyle = typeof s.fill==="string" ? s.fill : (s.fillColor || hexA(col, 0.12)); ctx.fill();
      }
      if(s.line!==false){
        path(); ctx.strokeStyle = col; ctx.lineWidth = (s.width||2.2)*(isPresent()?1.3:1); ctx.lineJoin = "round"; ctx.lineCap = "round";
        ctx.setLineDash(s.dash||[]); ctx.stroke(); ctx.setLineDash([]);
      }
      if(s.points){
        ctx.fillStyle = col;
        pts.forEach(function(p){ ctx.beginPath(); ctx.arc(tx(p[0]), yy(p[1]), (s.r||3.2)*sc, 0, Math.PI*2); ctx.fill(); });
      }
      ctx.restore();
    });

    // reference lines
    (opts.hlines||[]).forEach(function(l){
      var yy = (l.axis==="y2" && ty2) ? ty2 : ty, y = yy(l.y); if(y<padT-1 || y>padT+ph+1) return;
      ctx.strokeStyle = l.color || Plot.colors.red; ctx.lineWidth = l.width||1.5; ctx.setLineDash(l.dash||[6,4]);
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL+pw, y); ctx.stroke(); ctx.setLineDash([]);
      if(l.label){ ctx.fillStyle = l.color || Plot.colors.red; ctx.font = "600 "+(11.5*sc)+"px "+bodyF; ctx.textAlign = l.align==="left"?"left":"right"; ctx.textBaseline = "bottom"; ctx.fillText(l.label, l.align==="left"?padL+4:padL+pw-4, y-2); }
    });
    var vlBoxes = [];
    (opts.vlines||[]).forEach(function(l){
      var x = tx(l.x); if(x<padL-1 || x>padL+pw+1) return;
      ctx.strokeStyle = l.color || Plot.colors.muted; ctx.lineWidth = l.width||1.5; ctx.setLineDash(l.dash||[4,4]);
      PANELS.forEach(function(P){ ctx.beginPath(); ctx.moveTo(x, P.t); ctx.lineTo(x, P.t+P.h); ctx.stroke(); }); ctx.setLineDash([]);
      if(l.label){ ctx.fillStyle = l.color || Plot.colors.muted; ctx.font = "600 "+(11.5*sc)+"px "+bodyF; var right = x > padL+pw*0.8, tw = ctx.measureText(l.label).width, x0 = right ? x-4-tw : x+4, row = 0;
        while(vlBoxes.some(function(b){ return b.row===row && x0 < b.x1+4 && x0+tw > b.x0-4; })) row++;
        vlBoxes.push({x0:x0, x1:x0+tw, row:row});
        ctx.textAlign = "left"; ctx.textBaseline = "top"; ctx.fillText(l.label, x0, padT+2+row*14*sc); }
    });
    // marks (annotated points)
    (opts.marks||[]).forEach(function(m){
      if(m.x > xClip) return;
      var yy = (m.axis==="y2" && ty2) ? ty2 : ty, x = tx(m.x), y = yy(m.y);
      ctx.fillStyle = m.color || Plot.colors.navy; ctx.strokeStyle = dark ? "#05060f" : "#fff"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, y, (m.r||4.5)*sc, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      if(m.label){ ctx.font = "600 "+(11.5*sc)+"px "+bodyF; ctx.textAlign = x > padL+pw*0.8 ? "right" : (x < padL+pw*0.15 ? "left" : "center"); ctx.textBaseline = m.below ? "top" : "bottom"; ctx.fillStyle = m.color || (dark?"#fff":Plot.colors.ink); ctx.fillText(m.label, x, y + (m.below ? 8 : -8)*sc); }
    });

    // end labels: series name at the last visible point (replaces legend)
    var endBoxes = [];
    SER.forEach(function(s, si){
      var EL = endOf(s);
      if(!EL || s.hidden || !s.data || !s.data.length) return;
      var yy = (s.axis==="y2" && ty2) ? ty2 : ty, col = s.color || Plot.cycle[si % Plot.cycle.length], last = null;
      for(var i=s.data.length-1;i>=0;i--){ var p = s.data[i]; if(p[1]!==null && isFinite(p[1]) && p[0]<=xClip+1e-9){ last = p; break; } }
      if(!last) return;
      var txt = typeof EL==="string" ? EL : (s.name||s.id), x = tx(last[0]), y = yy(last[1]), PE = split ? panelOf(s.axis) : {t:padT, h:ph};
      y = Math.max(PE.t+6*sc, Math.min(PE.t+PE.h-4*sc, y));
      ctx.font = "600 "+(12*sc)+"px "+bodyF;
      var h = 14*sc; endBoxes.forEach(function(b){ if(Math.abs(b-y) < h) y = b + (y>=b?h:-h); }); endBoxes.push(y);
      ctx.fillStyle = col; ctx.textAlign = "left"; ctx.textBaseline = "middle";
      ctx.save(); ctx.lineWidth = 4*sc; ctx.strokeStyle = dark ? "#05060f" : "#fff"; ctx.lineJoin = "round"; ctx.strokeText(txt, x+6*sc, y); ctx.restore();
      ctx.fillText(txt, x+6*sc, y);
    });
    // callouts: key point with leader line and a pill label. {x, y, text, axis, color, dx, dy, side}
    var coBoxes = [];
    (opts.callouts||[]).forEach(function(c){
      if(c.x > xClip+1e-9 || c.y===null || !isFinite(c.y)) return;
      var yy = (c.axis==="y2" && ty2) ? ty2 : ty, x = tx(c.x), y = yy(c.y), col = c.color || Plot.colors.ink;
      if(x<padL-1 || x>padL+pw+1 || y<padT-2 || y>padT+ph+2) return;
      ctx.font = "600 "+(12*sc)+"px "+bodyF;
      var tw = ctx.measureText(c.text).width, bh = 20*sc, bw = tw + 14*sc;
      var dy = (c.dy!==undefined ? c.dy : -30)*sc, dx = (c.dx||0)*sc;
      var lx = x+dx, ly = y+dy;
      if(ly-bh/2 < padT) ly = y + 30*sc; if(ly+bh/2 > padT+ph) ly = y - 30*sc;
      var bx = Math.max(padL+2, Math.min(padL+pw-bw-2, lx - bw/2)), by = ly - bh/2;
      function hit(X0, Y0){ return coBoxes.some(function(q){ return X0 < q[0]+q[2]+4 && X0+bw > q[0]-4 && Y0 < q[1]+q[3]+3 && Y0+bh > q[1]-3; }); }
      if(hit(bx, by)){ var alt = ly>y ? y-30*sc : y+30*sc; if(alt-bh/2>=padT && alt+bh/2<=padT+ph && !hit(bx, alt-bh/2)){ ly = alt; by = ly-bh/2; } else { var guard = 0; while(hit(bx, by) && guard++<40) by += (ly>y?1:-1)*4*sc; ly = by+bh/2; } }
      coBoxes.push([bx, by, bw, bh]);
      ctx.strokeStyle = col; ctx.lineWidth = 1.2*sc; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(Math.max(bx, Math.min(bx+bw, x)), ly>y ? by : by+bh); ctx.stroke();
      ctx.fillStyle = col; ctx.strokeStyle = dark ? "#05060f" : "#fff"; ctx.lineWidth = 2*sc; ctx.beginPath(); ctx.arc(x, y, 4.5*sc, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = dark ? "rgba(20,22,40,.95)" : "#fff"; ctx.strokeStyle = col; ctx.lineWidth = 1.2*sc; roundRect(ctx, bx, by, bw, bh, 10*sc); ctx.fill(); ctx.stroke();
      ctx.fillStyle = col; ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.fillText(c.text, bx+7*sc, by+bh/2+0.5);
    });

    // legend
    if(legendH){
      var lx = padL, ly = 4*sc + legendH/2 - 4*sc;
      ctx.font = "600 "+(12*sc)+"px "+bodyF; ctx.textBaseline = "middle"; ctx.textAlign = "left";
      (opts.series||[]).forEach(function(s, si){
        if(!s.name || s.hidden || endOf(s) || !(s.data||[]).length) return;
        var col = s.color || Plot.cycle[si % Plot.cycle.length], tw = ctx.measureText(s.name).width;
        if(lx + 22*sc + tw > W-4){ return; }
        ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.setLineDash(s.dash||[]); ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx+16*sc, ly); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = dark ? "#e6e8f2" : Plot.colors.ink; ctx.fillText(s.name, lx+20*sc, ly);
        lx += 20*sc + tw + 14*sc;
      });
    }

    // hover crosshair
    if(ch.hoverX!==null && opts.crosshair!==false){
      var hx = ch.hoverX, xv = invx(hx);
      if(xv>=xr[0] && xv<=xr[1]){
        ctx.strokeStyle = dark ? "rgba(255,255,255,.5)" : hexA(Plot.colors.ink, .4); ctx.lineWidth = 1; ctx.setLineDash([3,3]);
        ctx.beginPath(); ctx.moveTo(hx, padT); ctx.lineTo(hx, padT+ph); ctx.stroke(); ctx.setLineDash([]);
        var rows = [(X.hoverLabel||X.label||"x")+" "+(X.hoverFmt||X.fmt||defFmt((xr[1]-xr[0])/100))(xv)];
        var cols = [fg];
        (opts.series||[]).forEach(function(s, si){
          if(s.hidden || s.hover===false) return;
          var v = interp(s.data, xv, s.step); if(v===null || !isFinite(v)) return;
          var yy = (s.axis==="y2" && ty2) ? ty2 : ty, col = s.color || Plot.cycle[si % Plot.cycle.length];
          ctx.fillStyle = col; ctx.beginPath(); ctx.arc(hx, yy(v), 3.5*sc, 0, Math.PI*2); ctx.fill();
          rows.push((s.name||s.id||"y")+" "+(s.fmt ? s.fmt(v) : defFmt(Plot.niceStep(yr[1]-yr[0],5)/10)(v))+(s.unit?" "+s.unit:""));
          cols.push(col);
        });
        ctx.font = "500 "+(12*sc)+"px "+monoF;
        var bw = 0; rows.forEach(function(r){ bw = Math.max(bw, ctx.measureText(r).width); }); bw += 16*sc;
        var lh = 17*sc, bh = rows.length*lh + 8*sc, bx = hx + 10*sc + bw > padL+pw ? hx - 10*sc - bw : hx + 10*sc, by = padT + 6*sc;
        ctx.fillStyle = dark ? "rgba(20,22,40,.92)" : "rgba(255,255,255,.95)"; ctx.strokeStyle = dark ? "rgba(255,255,255,.2)" : Plot.colors.line;
        roundRect(ctx, bx, by, bw, bh, 6*sc); ctx.fill(); ctx.stroke();
        ctx.textAlign = "left"; ctx.textBaseline = "middle";
        rows.forEach(function(r, i){ ctx.fillStyle = i===0 ? fg : (dark ? "#fff" : cols[i]); ctx.fillText(r, bx+8*sc, by+4*sc+lh*(i+0.5)); });
      }
    }
    return ch;
  };

  /* API */
  ch.update = function(o){ for(var k in o) opts[k] = o[k]; return ch.draw(); };
  ch.setSeries = function(id, data, props){
    var s = (opts.series||[]).filter(function(x){ return x.id===id; })[0];
    if(!s){ s = {id:id}; (opts.series = opts.series||[]).push(s); }
    s.data = data; if(props) for(var k in props) s[k] = props[k];
    return ch.draw();
  };
  ch.series = function(id){ return (opts.series||[]).filter(function(x){ return x.id===id; })[0]; };
  ch.valueAt = function(id, x){ var s = ch.series(id); return s ? interp(s.data, x, s.step) : null; };
  /* progressive draw along x. ms duration, cb on finish. Reduced motion or presentation export: instant */
  ch.animate = function(ms, cb){
    if(anim) cancelAnimationFrame(anim);
    if(reduce || ms===0){ ch.progress = 1; ch.draw(); if(cb) cb(); return ch; }
    var t0 = null; ms = ms || 900;
    function step(ts){ if(t0===null) t0 = ts; var u = Math.min(1, (ts-t0)/ms); ch.progress = 1 - Math.pow(1-u, 2); ch.draw(); if(u<1) anim = requestAnimationFrame(step); else { anim = null; if(cb) cb(); } }
    ch.progress = 0; anim = requestAnimationFrame(step);
    return ch;
  };
  ch.toDataURL = function(){ return canvas.toDataURL("image/png"); };
  ch.destroy = function(){ if(anim) cancelAnimationFrame(anim); if(ro) ro.disconnect(); canvas.removeEventListener("pointermove", onMove); canvas.removeEventListener("pointerleave", onLeave); };

  function onMove(ev){
    if(opts.crosshair===false || !geom) return;
    var r = canvas.getBoundingClientRect(), x = ev.clientX - r.left;
    ch.hoverX = (x>=geom.padL && x<=geom.padL+geom.pw) ? x : null;
    if(opts.onHover) opts.onHover(ch.hoverX===null ? null : geom.invx(ch.hoverX));
    ch.draw();
  }
  function onLeave(){ ch.hoverX = null; if(opts.onHover) opts.onHover(null); ch.draw(); }
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerdown", onMove);
  canvas.addEventListener("pointerleave", onLeave);

  if(window.ResizeObserver){ ro = new ResizeObserver(function(){ ch.draw(); }); ro.observe(canvas); }
  else window.addEventListener("resize", function(){ ch.draw(); });
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ ch.draw(); });
  ch.draw();
  return ch;
};

/* Plot.link([ch1, ch2]): stacked panels share the hover crosshair (same x axis) */
Plot.link = function(charts){
  charts.forEach(function(c){
    var prev = c.opts.onHover;
    c.opts.onHover = function(xv){ if(prev) prev(xv); charts.forEach(function(o){ if(o===c) return; o.hoverX = (xv===null || !o.geom) ? null : o.geom.tx(xv); o.draw(); }); };
  });
  return charts;
};

/* ---------------- live strip (monitor sweep) ---------------- */
/* opts: {height, window (s), y:{min,max,label,step}, theme:"dark"|"light", color, width,
          fn(tSec) -> number or [numbers], colors:[...] for multi-trace, rate (samples/s, default 120),
          grid (s between vertical grid lines), gap (fraction of window erased ahead, default .04), label (top-left text)} */
Plot.sweep = function(target, opts){
  opts = opts || {}; Plot.syncTheme();
  var su = setupCanvas(target, opts.height||180, opts.aria), canvas = su.canvas;
  var m = {canvas:canvas, opts:opts}, raf = null, running = false, t0 = null, tLast = 0;
  var buf = [];   // per sample: [t, values[]]
  var win = opts.window || 4, rate = opts.rate || 120;

  function vals(t){ var v = opts.fn ? opts.fn(t) : 0; return Array.isArray(v) ? v : [v]; }
  function frame(ts){
    if(!running) return;
    if(t0===null) t0 = ts;
    var t = (ts - t0)/1000;
    var dt = 1/rate;
    while(tLast + dt <= t){ tLast += dt; buf.push([tLast, vals(tLast)]); }
    var cut = tLast - win; while(buf.length && buf[0][0] < cut) buf.shift();
    draw(tLast);
    raf = requestAnimationFrame(frame);
  }
  function draw(tNow){
    var fc = fitCanvas(canvas), ctx = fc.ctx, W = fc.w, H = fc.h;
    var dark = opts.theme!=="light", sc = isPresent() ? 1.3 : 1;
    var Y = opts.y || {min:-1, max:1};
    var padL = (Y.label ? 50 : 38)*sc, padR = 8*sc, padT = 8*sc, padB = 8*sc, pw = W-padL-padR, ph = H-padT-padB;
    var fg = dark ? "#9aa0bd" : Plot.colors.muted;
    ctx.fillStyle = opts.bg || (dark ? "#05060f" : "#fff"); ctx.fillRect(0,0,W,H);
    function ty(v){ return padT + ph - (v-Y.min)/(Y.max-Y.min)*ph; }
    ctx.font = (11*sc)+"px "+FONT_MONO(); ctx.textAlign = "right"; ctx.textBaseline = "middle";
    Plot.ticks(Y.min, Y.max, Y.step || Plot.niceStep(Y.max-Y.min, 4)).forEach(function(v){
      var y = ty(v); ctx.strokeStyle = dark ? "rgba(124,252,154,.10)" : "#eee"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padL, Math.round(y)+0.5); ctx.lineTo(padL+pw, Math.round(y)+0.5); ctx.stroke();
      ctx.fillStyle = fg; ctx.fillText(String(+v.toFixed(3)), padL-5*sc, y);
    });
    var gs = opts.grid || 1;
    for(var g=gs; g<win; g+=gs){ var gx = padL + g/win*pw; ctx.strokeStyle = dark ? "rgba(124,252,154,.07)" : "#f2f2f2"; ctx.beginPath(); ctx.moveTo(gx+0.5, padT); ctx.lineTo(gx+0.5, padT+ph); ctx.stroke(); }
    if(Y.label){ ctx.save(); ctx.fillStyle = fg; ctx.font = "600 "+(11.5*sc)+"px "+FONT_BODY(); ctx.translate(11*sc, padT+ph/2); ctx.rotate(-Math.PI/2); ctx.textAlign = "center"; ctx.fillText(Y.label, 0, 0); ctx.restore(); }
    if(Y.zero!==false && Y.min<0 && Y.max>0){ ctx.strokeStyle = dark ? "rgba(255,255,255,.25)" : "#ccc"; ctx.beginPath(); ctx.moveTo(padL, ty(0)); ctx.lineTo(padL+pw, ty(0)); ctx.stroke(); }

    // sweep: x position = t mod window, erase gap ahead of the write head
    var head = (tNow % win)/win, gap = opts.gap===undefined ? 0.04 : opts.gap;
    var nTr = buf.length ? buf[buf.length-1][1].length : 1;
    ctx.save(); ctx.beginPath(); ctx.rect(padL, padT, pw, ph); ctx.clip();
    for(var k=0;k<nTr;k++){
      ctx.strokeStyle = (opts.colors && opts.colors[k]) || opts.color || (dark ? "#7CFC9A" : Plot.colors.navy);
      ctx.lineWidth = (opts.width||2)*sc; ctx.lineJoin = "round"; ctx.beginPath();
      var prevX = null;
      for(var i=0;i<buf.length;i++){
        var p = buf[i], u = (p[0] % win)/win;
        var ahead = (u - head + 1) % 1;
        if(ahead > 0 && ahead < gap){ prevX = null; continue; }
        var x = padL + u*pw, y = ty(p[1][k]);
        if(prevX===null || x < prevX){ ctx.moveTo(x,y); } else ctx.lineTo(x,y);
        prevX = x;
      }
      ctx.stroke();
    }
    ctx.restore();
    if(running || buf.length){ ctx.fillStyle = dark ? "rgba(124,252,154,.8)" : Plot.colors.navy; ctx.fillRect(padL + head*pw - 1, padT, 2, ph); }
    if(opts.label){ ctx.fillStyle = dark ? "#e6e8f2" : Plot.colors.ink; ctx.font = "600 "+(12*sc)+"px "+FONT_BODY(); ctx.textAlign = "left"; ctx.textBaseline = "top"; ctx.fillText(opts.label, padL+6*sc, padT+4*sc); }
  }
  /* static full window (reduced motion / screenshot) */
  function fillStatic(){
    buf = []; var dt = 1/rate;
    for(var t=dt; t<=win*0.999; t+=dt) buf.push([t, vals(t)]);
    tLast = win*0.999; draw(tLast);
  }
  m.start = function(){ if(running) return m; if(reduce){ fillStatic(); return m; } running = true; t0 = null; tLast = 0; buf = []; raf = requestAnimationFrame(frame); return m; };
  m.stop = function(){ running = false; if(raf) cancelAnimationFrame(raf); raf = null; return m; };
  m.setFn = function(fn){ opts.fn = fn; if(!running) fillStatic(); return m; };
  m.update = function(o){ for(var k in o) opts[k] = o[k]; win = opts.window || 4; rate = opts.rate || 120; if(!running) fillStatic(); return m; };
  m.snapshot = function(){ var was = running; m.stop(); fillStatic(); if(was) m.start(); return canvas.toDataURL("image/png"); };
  m.isRunning = function(){ return running; };
  document.addEventListener("visibilitychange", function(){ if(document.hidden && running){ m.stop(); m._resume = true; } else if(!document.hidden && m._resume){ m._resume = false; m.start(); } });
  if(window.ResizeObserver){ new ResizeObserver(function(){ if(!running) draw(tLast); }).observe(canvas); }
  if(opts.autostart===false) fillStatic(); else m.start();
  return m;
};

/* helpers */
function hexA(hex, a){
  if(!hex || hex[0]!=="#") return hex;
  var h = hex.length===4 ? hex.replace(/#(.)(.)(.)/,"#$1$1$2$2$3$3") : hex;
  var r = parseInt(h.substr(1,2),16), g = parseInt(h.substr(3,2),16), b = parseInt(h.substr(5,2),16);
  return "rgba("+r+","+g+","+b+","+a+")";
}
Plot.alpha = hexA;
try { Plot.syncTheme(); } catch(e){}
function roundRect(ctx, x, y, w, h, r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath(); }
})();
