/* CORE-06 Pathology SVG kit (v1.0.1, 20 Nov 2026: fibrin thrombi PAS-negative, opts.thrombusType "fibrin"|"hyaline" for PAS-positive hyaline/cryo thrombi)
   Schematic glomerular pathology drawn in SVG. Every word inside the pictures is English (content rule 5).
   Works with or without shell.js. Deterministic (seeded) so screenshots are stable.

   Patho.loop(el, opts)    EM-scale capillary wall + mesangium. Deposits by site, effacement, GBM changes, TMA, Alport.
   Patho.glom(el, opts)    LM glomerulus (PAS/H&E look). Hypercellularity, endocapillary, crescent, sclerosis, nodules ...
   Patho.ifStain(el, opts) IF pattern on the same tuft geometry (linear, granular, mesangial, full-house ...).
   Patho.fibrils(el, opts) High-magnification EM field of organised deposits with a nm scale bar.
   Each returns {update(opts), svg, geom}. update() merges new opts into old ones and redraws.
   el = element, id string, or an <svg>. A div gets an <svg> appended. */
(function(){
"use strict";
var NS = "http://www.w3.org/2000/svg";
var FONT = "IBM Plex Sans Thai, Geist, sans-serif", MONO = "Geist Mono, monospace";

function rng(seed){ var a = seed >>> 0; return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function S(tag, at, parent){ var n = document.createElementNS(NS, tag); for(var k in at){ if(at[k] == null) continue; if(k === "text") n.textContent = at[k]; else n.setAttribute(k, at[k]); } if(parent) parent.appendChild(n); return n; }
function getSvg(el, vb, aria){
  if(typeof el === "string") el = document.getElementById(el);
  var svg = el;
  if(!el || el.tagName.toLowerCase() !== "svg"){ svg = S("svg", {}); el.appendChild(svg); }
  svg.setAttribute("viewBox", vb); svg.setAttribute("role", "img");
  if(aria) svg.setAttribute("aria-label", aria);
  svg.style.width = "100%"; svg.style.height = "auto"; svg.style.display = "block";
  return svg;
}
function merge(a, b){ var o = {}, k; for(k in a) o[k] = a[k]; for(k in (b || {})) o[k] = b[k]; return o; }
function blob(cx, cy, rx, ry, r, n, jit){ // irregular closed path
  n = n || 9; jit = jit == null ? 0.18 : jit; var pts = [];
  for(var i = 0; i < n; i++){ var a = i / n * Math.PI * 2, f = 1 + (r() - 0.5) * 2 * jit; pts.push([cx + Math.cos(a) * rx * f, cy + Math.sin(a) * ry * f]); }
  var d = "";
  for(i = 0; i < n; i++){ var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    if(i === 0) d += "M" + p1[0].toFixed(1) + "," + p1[1].toFixed(1);
    var c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += "C" + c1[0].toFixed(1) + "," + c1[1].toFixed(1) + " " + c2[0].toFixed(1) + "," + c2[1].toFixed(1) + " " + p2[0].toFixed(1) + "," + p2[1].toFixed(1); }
  return d + "Z";
}

/* ---------------- palettes ---------------- */
var PAL = {
  schematic:{bg:"#FBFBFE", urinary:"#F4F6FB", podo:"#D9D3F5", podoLine:"#8F84D6", podoNuc:"#6B5FC4", slit:"#5B4BFF",
    gbmOuter:"#C9CCDD", gbm:"#9A9FB8", endo:"#F3D6DD", endoLine:"#C98A9B", endoNuc:"#B0637A", lumen:"#FFF5F6", rbc:"#E0606E",
    mes:"#F1E7C9", mesLine:"#C9B378", mesNuc:"#9C7F2E", dep:"#2B2346", depHi:"#5B4BFF", lucent:"#FFFFFF", fibrin:"#E99AAE",
    label:"#5E6075", ink:"#0B0B1F", hi:"#5B4BFF"},
  em:{bg:"#D8D8D8", urinary:"#E4E4E4", podo:"#B9B9B9", podoLine:"#7C7C7C", podoNuc:"#6A6A6A", slit:"#3A3A3A",
    gbmOuter:"#9C9C9C", gbm:"#5F5F5F", endo:"#C6C6C6", endoLine:"#7F7F7F", endoNuc:"#5E5E5E", lumen:"#ECECEC", rbc:"#4A4A4A",
    mes:"#ADADAD", mesLine:"#7E7E7E", mesNuc:"#575757", dep:"#161616", depHi:"#161616", lucent:"#F2F2F2", fibrin:"#8A8A8A",
    label:"#3F3F3F", ink:"#111111", hi:"#FFDE59"}
};

/* ================= Patho.loop ================= */
var LOOP_DEF = {mode:"schematic", labels:true, effacement:0, gbm:1, deposits:[], spikes:false, ribbon:false,
  doubleContour:false, tma:0, alport:false, thin:false, gbmBreak:false, highlight:null, mesExpand:0, mesCells:1, seed:7, title:null};
/* deposits: [{site:"subepi"|"hump"|"intramembranous"|"subendo"|"mesangial", n, size, hi}] */
function loop(el, opts){
  var svg = getSvg(el, "0 0 640 360", "Glomerular capillary wall schematic");
  var o = merge(LOOP_DEF, opts), api = {svg:svg, geom:{}};
  function draw(){
    var P = PAL[o.mode] || PAL.schematic, r = rng(o.seed), g = {};
    svg.innerHTML = "";
    var X0 = o.labels ? 104 : 8, X1 = 632, XM = 452; // XM = start of mesangial zone
    var deps = o.deposits || [], has = function(s){ return deps.some(function(d){ return d.site === s; }); };
    var depOf = function(s){ return deps.filter(function(d){ return d.site === s; })[0]; };
    var gbmT = 26 * (o.thin ? 0.45 : 1) * (o.alport ? 1.9 : 1) * (o.gbm || 1);
    var yFoot = 100, yG0 = 130, yG1 = yG0 + gbmT;
    var subH = (has("subendo") ? 14 + 10 * ((depOf("subendo").size || 1) - 1) : 0) + (o.tma ? 10 + 18 * o.tma : 0) + (o.doubleContour ? 8 : 0);
    var yE0 = yG1 + subH, endoT = 9 + (o.tma ? 10 * o.tma : 0), yE1 = yE0 + endoT, yBot = 356;
    g = {x0:X0, x1:X1, xMes:XM, yUrinary:[0, yFoot], yFoot:[yFoot, yG0], yGBM:[yG0, yG1], ySub:[yG1, yE0], yEndo:[yE0, yE1], yLumen:[yE1, yBot], slits:[]};
    S("rect", {x:0, y:0, width:640, height:360, fill:P.bg}, svg);
    S("rect", {x:X0, y:0, width:X1 - X0, height:yG0, fill:P.urinary}, svg);
    // lumen
    S("rect", {x:X0, y:yE1, width:XM - X0, height:yBot - yE1, fill:P.lumen}, svg);
    // RBC + platelet/fibrin thrombus (TMA)
    if(o.tma > 0.4){
      S("path", {d:blob(250, yE1 + (yBot - yE1) * 0.55, 95, (yBot - yE1) * 0.33, r, 12, 0.25), fill:P.fibrin, opacity:0.75}, svg);
      for(var f = 0; f < 18; f++){ var fx = 165 + r() * 170, fy = yE1 + 25 + r() * (yBot - yE1 - 50); S("line", {x1:fx, y1:fy, x2:fx + 14 * (r() - 0.5), y2:fy + 10 * (r() - 0.5), stroke:o.mode === "em" ? "#555" : "#B8546E", "stroke-width":1}, svg); }
      [[205, 0.62, "frag"], [300, 0.78, "frag"], [380, 0.5, "rbc"]].forEach(function(c){ drawRBC(c[0], yE1 + (yBot - yE1) * c[1], c[2] === "frag"); });
    } else {
      [[215, 0.55], [345, 0.42], [395, 0.8]].forEach(function(c){ drawRBC(c[0], yE1 + (yBot - yE1) * c[1], false); });
    }
    function drawRBC(cx, cy, frag){
      if(frag){ S("path", {d:"M" + (cx - 16) + "," + cy + " q8,-12 20,-4 l10,-6 q-2,14 -14,16 q-10,2 -16,-6z", fill:P.rbc}, svg); return; }
      S("ellipse", {cx:cx, cy:cy, rx:24, ry:10, fill:P.rbc}, svg);
      S("ellipse", {cx:cx, cy:cy, rx:11, ry:3.6, fill:"#fff", opacity:0.28}, svg);
    }
    // mesangium
    var mesW = X1 - XM, mesTop = yG1;
    S("rect", {x:XM, y:mesTop, width:mesW, height:yBot - mesTop, fill:P.mes}, svg);
    if(o.mesExpand > 0){ for(var m = 0; m < 26 * o.mesExpand; m++){ var mx = XM + 10 + r() * (mesW - 20), my = mesTop + 12 + r() * (yBot - mesTop - 20); S("line", {x1:mx, y1:my, x2:mx + 12 * (r() - 0.5), y2:my + 8 * (r() - 0.5), stroke:P.mesLine, "stroke-width":1, opacity:0.7}, svg); } }
    var nMes = Math.max(1, Math.round(o.mesCells || 1));
    for(var c = 0; c < nMes; c++){
      var mcx = XM + mesW * (nMes === 1 ? 0.5 : 0.22 + 0.56 * c / (nMes - 1)) + (r() - 0.5) * 8, mcy = mesTop + (yBot - mesTop) * (0.48 + (c % 2 ? 0.22 : -0.05));
      S("path", {d:blob(mcx, mcy, 30 - nMes * 2, 22 - nMes, r, 8, 0.15), fill:o.mode === "em" ? "#9A9A9A" : "#E6D29A", stroke:P.mesLine, "stroke-width":1}, svg);
      S("ellipse", {cx:mcx, cy:mcy, rx:12 - nMes * 0.6, ry:8, fill:P.mesNuc}, svg);
    }
    // endothelium (peripheral loop only) with fenestrae
    var endoFill = P.endo;
    if(o.tma > 0){ // swollen endothelium, few fenestrae
      S("path", {d:"M" + X0 + "," + yE0 + " L" + XM + "," + yE0 + " L" + XM + "," + yE1 + " Q" + (X0 + XM) / 2 + "," + (yE1 + 14 * o.tma) + " " + X0 + "," + yE1 + "Z", fill:endoFill, stroke:P.endoLine, "stroke-width":1}, svg);
    } else {
      for(var x = X0; x < XM; x += 24){ S("rect", {x:x, y:yE0, width:Math.min(17, XM - x), height:endoT, rx:3, fill:endoFill, stroke:P.endoLine, "stroke-width":0.8}, svg); }
    }
    S("path", {d:"M" + (X0 + 48) + "," + yE1 + " q30,22 60,0", fill:endoFill, stroke:P.endoLine, "stroke-width":1}, svg); // endothelial cell body
    S("ellipse", {cx:X0 + 78, cy:yE1 + 6, rx:20, ry:6, fill:P.endoNuc}, svg);
    S("line", {x1:XM, y1:yE0, x2:XM, y2:yBot, stroke:P.endoLine, "stroke-width":2}, svg);
    // subendothelial space (TMA lucency / double contour)
    if(o.tma > 0){
      S("rect", {x:X0, y:yG1, width:XM - X0, height:yE0 - yG1, fill:P.lucent}, svg);
      for(var t = 0; t < 40 * o.tma; t++){ var tx = X0 + r() * (XM - X0), ty = yG1 + 2 + r() * (yE0 - yG1 - 4); S("circle", {cx:tx, cy:ty, r:0.9 + r(), fill:o.mode === "em" ? "#AAA" : "#D7C7CF"}, svg); }
    }
    if(o.doubleContour){
      var yN = yE0 - 4;
      S("rect", {x:X0, y:yN - 4, width:XM - X0, height:4, fill:P.gbm, opacity:0.85}, svg); // new basement membrane
      S("path", {d:"M" + (X0 + 120) + "," + (yG1 + 1) + " q60," + (yN - yG1 - 6) + " 160,0", fill:o.mode === "em" ? "#9A9A9A" : "#E6D29A", stroke:P.mesLine, "stroke-width":0.8, opacity:0.9}, svg); // mesangial interposition
      g.newGBM = yN - 4;
    }
    // GBM
    if(o.alport){
      S("rect", {x:X0, y:yG0, width:X1 - X0, height:gbmT, fill:P.gbmOuter}, svg);
      for(var L = 0; L < 6; L++){
        var d = "M" + X0 + "," + (yG0 + 4 + L * (gbmT - 8) / 5);
        for(var xx = X0; xx <= X1; xx += 20) d += " L" + xx + "," + (yG0 + 4 + L * (gbmT - 8) / 5 + (r() - 0.5) * 7);
        S("path", {d:d, fill:"none", stroke:P.gbm, "stroke-width":2.2}, svg);
      }
      for(var b = 0; b < 14; b++) S("circle", {cx:X0 + r() * (X1 - X0), cy:yG0 + 4 + r() * (gbmT - 8), r:1.6, fill:P.dep, opacity:0.6}, svg);
      // a thinned segment
      S("rect", {x:300, y:yG0 - 1, width:60, height:gbmT + 2, fill:P.urinary}, svg);
      S("rect", {x:300, y:yG0 + gbmT * 0.35, width:60, height:gbmT * 0.3, fill:P.gbm}, svg);
    } else {
      S("rect", {x:X0, y:yG0, width:X1 - X0, height:gbmT, fill:P.gbmOuter}, svg);
      S("rect", {x:X0, y:yG0 + gbmT * 0.2, width:X1 - X0, height:gbmT * 0.6, fill:o.ribbon ? P.dep : P.gbm}, svg);
      if(o.ribbon){ for(var rb = 0; rb < 9; rb++){ var rx = X0 + 20 + rb * 58 + r() * 10; S("ellipse", {cx:rx, cy:yG0 + gbmT / 2, rx:22 + r() * 8, ry:gbmT * 0.42, fill:P.dep}, svg); } }
    }
    if(o.gbmBreak){
      S("rect", {x:230, y:yG0 - 2, width:26, height:gbmT + 4, fill:P.urinary}, svg);
      S("path", {d:blob(243, yG0 - 26, 30, 22, r, 9, 0.3), fill:P.fibrin, opacity:0.8}, svg);
      S("path", {d:"M232," + yG0 + " l-6,-6 M254," + yG0 + " l6,-6", stroke:P.gbm, "stroke-width":2}, svg);
    }
    // intramembranous / subendo / subepi / hump / mesangial deposits
    function depFill(d){ return d && d.hi && o.mode !== "em" ? P.depHi : P.dep; }
    var dIn = depOf("intramembranous");
    if(dIn){ for(var i = 0; i < (dIn.n || 7); i++){ var ix = X0 + 30 + i * ((XM - X0 - 40) / Math.max(1, (dIn.n || 7) - 1)) + (r() - 0.5) * 10; S("path", {d:blob(ix, yG0 + gbmT * 0.5, 9 * (dIn.size || 1), gbmT * 0.26, r, 8, 0.25), fill:depFill(dIn), opacity:0.9}, svg); if(o.mode !== "em") S("path", {d:blob(ix, yG0 + gbmT * 0.5, 5, 3, r, 6, 0.2), fill:P.lucent, opacity:0.35}, svg); } }
    var dSe = depOf("subendo");
    if(dSe){ var nSe = dSe.n || 5; for(var j = 0; j < nSe; j++){ var sx = X0 + 40 + j * ((XM - X0 - 70) / Math.max(1, nSe - 1)) + (r() - 0.5) * 12; S("path", {d:blob(sx, yG1 + (yE0 - yG1) * 0.5, 16 * (dSe.size || 1), (yE0 - yG1) * 0.42, r, 9, 0.2), fill:depFill(dSe)}, svg); } }
    // mesangial
    var dMe = depOf("mesangial");
    if(dMe){ var nMe = dMe.n || 6; for(var k = 0; k < nMe; k++){ var kx = XM + 14 + r() * (mesW - 28), ky = mesTop + 10 + (k < 2 ? 4 : r() * (yBot - mesTop - 30)); S("path", {d:blob(kx, ky, 9 * (dMe.size || 1), 6 * (dMe.size || 1), r, 8, 0.25), fill:depFill(dMe)}, svg); } }
    // podocytes + foot processes (subepi deposits displace them)
    var dSp = depOf("subepi"), dHu = depOf("hump"), depX = [];
    if(dSp){ var nSp = dSp.n || 9; for(var q = 0; q < nSp; q++) depX.push({x:X0 + 24 + q * ((X1 - X0 - 48) / Math.max(1, nSp - 1)) + (r() - 0.5) * 8, w:15 * (dSp.size || 1), h:14 * (dSp.size || 1), d:dSp}); }
    var humpX = [];
    if(dHu){ var nH = dHu.n || 2; for(var hq = 0; hq < nH; hq++) humpX.push({x:X0 + 90 + hq * 190, w:34 * (dHu.size || 1), h:30 * (dHu.size || 1), d:dHu}); }
    if(o.spikes && dSp){ for(var sp = 0; sp < depX.length - 1; sp++){ var spx = (depX[sp].x + depX[sp + 1].x) / 2; S("rect", {x:spx - 3, y:yG0 - depX[sp].h, width:6, height:depX[sp].h + 2, rx:2, fill:P.gbm}, svg); } }
    // foot processes
    var fpTop = yFoot, fpH = yG0 - yFoot, wFP = 17, gap = 7, x0 = X0, idx = 0, segStart = null;
    function obstacleAt(x){ var arr = depX.concat(humpX); for(var a = 0; a < arr.length; a++){ if(Math.abs(x - arr[a].x) < arr[a].w + 4) return arr[a]; } return null; }
    var pieces = [];
    for(var px = X0; px < X1; px += wFP + gap){ pieces.push(px); }
    var effSeq = rng(o.seed + 11), run = null;
    pieces.forEach(function(px, n){
      var open = effSeq() >= o.effacement; // slit present after this process?
      var ob = obstacleAt(px + wFP / 2), lift = ob ? ob.h : 0;
      if(run === null) run = {x:px, lift:lift};
      if(open || n === pieces.length - 1 || lift !== run.lift){
        var w = px + wFP - run.x;
        S("rect", {x:run.x, y:fpTop - run.lift, width:Math.min(w, X1 - run.x), height:fpH, rx:6, fill:P.podo, stroke:P.podoLine, "stroke-width":0.9}, svg);
        if(open && px + wFP + gap < X1){
          var sx2 = px + wFP + gap / 2; g.slits.push(sx2);
          S("line", {x1:px + wFP, y1:yG0 - 4 - lift, x2:px + wFP + gap, y2:yG0 - 4 - lift, stroke:P.slit, "stroke-width":1.4}, svg);
        }
        run = null;
      }
    });
    // primary processes + cell body
    S("path", {d:"M150," + (fpTop + 4) + " C170,60 230,70 250," + (fpTop + 4) + " M330," + (fpTop + 4) + " C345,62 410,60 430," + (fpTop + 4) + " M490," + (fpTop + 4) + " C500,64 560,64 575," + (fpTop + 4), fill:"none", stroke:P.podoLine, "stroke-width":10, "stroke-linecap":"round", opacity:0.55}, svg);
    S("path", {d:blob(300, 44, 118, 30, r, 11, 0.1), fill:P.podo, stroke:P.podoLine, "stroke-width":1}, svg);
    S("ellipse", {cx:300, cy:44, rx:46, ry:16, fill:P.podoNuc, opacity:0.9}, svg);
    if(o.effacement > 0.6){ for(var mv = 0; mv < 7; mv++) S("path", {d:"M" + (200 + mv * 28) + ",16 q4,-12 8,0", fill:"none", stroke:P.podoLine, "stroke-width":2}, svg); } // microvillous change
    // subepi deposits and humps (drawn over GBM, under lifted foot processes)
    depX.forEach(function(dp){ S("path", {d:blob(dp.x, yG0 - dp.h / 2 - 1, dp.w * 0.55, dp.h / 2, r, 8, 0.2), fill:depFill(dp.d)}, svg); });
    humpX.forEach(function(hp){ S("path", {d:"M" + (hp.x - hp.w) + "," + yG0 + " Q" + hp.x + "," + (yG0 - hp.h * 1.7) + " " + (hp.x + hp.w) + "," + yG0 + "Z", fill:depFill(hp.d)}, svg); });
    // highlight zone
    if(o.highlight){
      var Z = {urinary:[X0, 0, X1, yFoot], podocyte:[X0, 0, X1, yG0], slit:[X0, yFoot, X1, yG0], subepi:[X0, yFoot - 16, X1, yG0 + 2], gbm:[X0, yG0, X1, yG1],
        intramembranous:[X0, yG0, X1, yG1], subendo:[X0, yG1, XM, yE0 + 2], endothelium:[X0, yE0 - 2, XM, yE1 + 4], lumen:[X0, yE1, XM, yBot], mesangium:[XM, yG1, X1, yBot]}[o.highlight];
      if(Z) S("rect", {x:Z[0] + 1, y:Z[1] + 1, width:Z[2] - Z[0] - 2, height:Math.max(6, Z[3] - Z[1] - 2), fill:"none", stroke:P.hi, "stroke-width":2.5, "stroke-dasharray":"7 5", rx:8}, svg);
    }
    // labels
    if(o.labels){
      S("rect", {x:0, y:0, width:X0 - 4, height:360, fill:P.bg}, svg);
      var lab = [["Urinary space", 40], ["Podocyte", fpTop + fpH / 2 - 6], ["GBM", (yG0 + yG1) / 2], ["Endothelium", (yE0 + yE1) / 2 + (subH ? 4 : 0)], ["Capillary lumen", (yE1 + yBot) / 2]];
      if(subH > 4) lab.splice(3, 0, [o.tma ? "Subendo (lucent)" : "Subendothelial", (yG1 + yE0) / 2]);
      lab.forEach(function(L){ S("text", {x:8, y:L[1] + 4, "font-family":FONT, "font-size":11.5, fill:P.label, text:L[0]}, svg); S("line", {x1:X0 - 10, y1:L[1], x2:X0 - 2, y2:L[1], stroke:P.label, "stroke-width":1}, svg); });
      S("text", {x:X1 - 6, y:yBot - 8, "text-anchor":"end", "font-family":FONT, "font-size":11.5, fill:P.label, text:"Mesangium"}, svg);
    }
    if(o.title) S("text", {x:X1 - 6, y:18, "text-anchor":"end", "font-family":FONT, "font-size":13, "font-weight":600, fill:P.ink, text:o.title}, svg);
    api.geom = g;
  }
  api.update = function(n){ o = merge(o, n); draw(); return api; };
  api.opts = function(){ return o; };
  draw();
  return api;
}

/* ================= shared tuft geometry ================= */
function tuftGeom(seed, cx, cy, R){
  var r = rng(seed), loops = [], mes = [];
  var rings = [[0.0, 1, 0.2], [0.42, 7, 0.19], [0.8, 12, 0.165]];
  rings.forEach(function(rg, ri){ for(var i = 0; i < rg[1]; i++){ var a = i / rg[1] * Math.PI * 2 + ri * 0.4 + (r() - 0.5) * 0.15, d = rg[0] * R;
    loops.push({x:cx + Math.cos(a) * d, y:cy + Math.sin(a) * d, r:rg[2] * R * (0.9 + r() * 0.2), a:a, ring:ri}); } });
  // mesangial areas: midpoints between inner and middle ring loops
  for(var m = 0; m < 6; m++){ var a2 = (m + 0.5) / 6 * Math.PI * 2 + 0.4, d2 = 0.26 * R; mes.push({x:cx + Math.cos(a2) * d2, y:cy + Math.sin(a2) * d2, r:0.1 * R, a:a2}); }
  for(var n = 0; n < 5; n++){ var a3 = (n + 0.3) / 5 * Math.PI * 2 + 0.9, d3 = 0.58 * R; mes.push({x:cx + Math.cos(a3) * d3, y:cy + Math.sin(a3) * d3, r:0.075 * R, a:a3}); }
  return {loops:loops, mes:mes, cx:cx, cy:cy, R:R};
}
function angIn(a, a0, span){ var d = ((a - a0) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI; return Math.abs(d) <= span / 2; }

/* ================= Patho.glom (LM) ================= */
var GLOM_DEF = {stain:"PAS", hyper:0, endocap:0, neutrophils:0, mesExpand:0, nodules:0, thick:0, wireloop:0, crescent:"none", crescentFrac:0,
  sclerosis:0, collapse:false, thrombi:0, thrombusType:"fibrin", necrosis:0, lobular:false, spikes:false, doubleContour:false, label:null, seed:3};
function glom(el, opts){
  var svg = getSvg(el, "0 0 360 360", "Glomerulus light microscopy schematic");
  var o = merge(GLOM_DEF, opts), api = {svg:svg};
  function draw(){
    svg.innerHTML = "";
    var r = rng(o.seed), silver = o.stain === "silver", he = o.stain === "HE";
    var C = silver ? {bg:"#EFE6CF", cyto:"#E2D3AE", nuc:"#6C5A3A", mem:"#1B1408", rbc:"#C9A86A", mat:"#3A2C14", lum:"#F7F1E2", fib:"#C3B07E", fibrin:"#F1E6CD", fibLine:"#C9B48A", hyal:"#B9A06A"}
      : he ? {bg:"#F6E3EC", cyto:"#EBB3C9", nuc:"#3E2470", mem:"#D58BB0", rbc:"#D94B5E", mat:"#E59DC1", lum:"#FDF4F8", fib:"#F2C7D8", fibrin:"#EE6F8F", fibLine:"#C94A6B", hyal:"#F2A6C8"}
      : {bg:"#F7E7EF", cyto:"#EDC3D6", nuc:"#3E2470", mem:"#B23C84", rbc:"#D94B5E", mat:"#CC6FA6", lum:"#FDF5F9", fib:"#E7B6CF", fibrin:"#F5D8C8", fibLine:"#D99A80", hyal:"#B8327A"};
    var cx = 180, cy = 180, Rb = 158;
    S("rect", {x:0, y:0, width:360, height:360, fill:C.bg}, svg);
    // tubules around
    for(var t = 0; t < 6; t++){ var ta = t / 6 * Math.PI * 2 + 0.3; S("path", {d:blob(cx + Math.cos(ta) * 205, cy + Math.sin(ta) * 205, 42, 34, r, 10, 0.12), fill:C.cyto, stroke:C.mem, "stroke-width":silver ? 2 : 1}, svg); }
    // Bowman capsule
    S("circle", {cx:cx, cy:cy, r:Rb, fill:C.lum, stroke:C.mem, "stroke-width":silver ? 3.4 : 2.6}, svg);
    for(var pe = 0; pe < 24; pe++){ var pa = pe / 24 * Math.PI * 2; S("ellipse", {cx:cx + Math.cos(pa) * (Rb - 3), cy:cy + Math.sin(pa) * (Rb - 3), rx:5, ry:2, transform:"rotate(" + (pa * 180 / Math.PI + 90) + " " + (cx + Math.cos(pa) * (Rb - 3)) + " " + (cy + Math.sin(pa) * (Rb - 3)) + ")", fill:C.nuc, opacity:0.8}, svg); }
    // crescent
    var cf = o.crescent === "none" ? 0 : Math.max(0.15, o.crescentFrac || 0.5), cA0 = -Math.PI / 2 - 0.4, cSpan = cf * Math.PI * 2;
    var tR = 126 * (1 - 0.33 * cf) * (o.collapse ? 0.72 : 1), tcx = cx - Math.cos(cA0) * cf * 26, tcy = cy - Math.sin(cA0) * cf * 26;
    if(cf > 0){
      var cpath = "", steps = 40;
      for(var i = 0; i <= steps; i++){ var a = cA0 - cSpan / 2 + cSpan * i / steps; cpath += (i ? "L" : "M") + (cx + Math.cos(a) * (Rb - 4)).toFixed(1) + "," + (cy + Math.sin(a) * (Rb - 4)).toFixed(1); }
      for(i = steps; i >= 0; i--){ var a2 = cA0 - cSpan / 2 + cSpan * i / steps; cpath += "L" + (tcx + Math.cos(a2) * (tR + 6)).toFixed(1) + "," + (tcy + Math.sin(a2) * (tR + 6)).toFixed(1); }
      var fibrous = o.crescent === "fibrous", fc = o.crescent === "fibrocellular";
      S("path", {d:cpath + "Z", fill:fibrous ? C.fib : C.cyto, stroke:C.mem, "stroke-width":1}, svg);
      var nn = fibrous ? 10 : fc ? 34 : 70;
      for(var k = 0; k < nn; k++){ var ka = cA0 - cSpan / 2 + r() * cSpan, kd = tR + 12 + r() * (Rb - tR - 20); var kx = tcx + Math.cos(ka) * kd, ky = tcy + Math.sin(ka) * kd;
        if(Math.hypot(kx - cx, ky - cy) < Rb - 8) S("ellipse", {cx:kx, cy:ky, rx:fibrous ? 6 : 4.2, ry:fibrous ? 1.6 : 3.2, transform:"rotate(" + (ka * 57.3 + 90) + " " + kx + " " + ky + ")", fill:C.nuc, opacity:fibrous ? 0.6 : 0.9}, svg); }
      if(fibrous || fc){ for(var fl = 0; fl < 14; fl++){ var fa = cA0 - cSpan / 2 + (fl + 0.5) / 14 * cSpan, d0 = tR + 10, d1 = Rb - 10; S("path", {d:"M" + (tcx + Math.cos(fa) * d0) + "," + (tcy + Math.sin(fa) * d0) + " Q" + (tcx + Math.cos(fa + 0.08) * (d0 + d1) / 2) + "," + (tcy + Math.sin(fa + 0.08) * (d0 + d1) / 2) + " " + (tcx + Math.cos(fa) * d1) + "," + (tcy + Math.sin(fa) * d1), fill:"none", stroke:C.mat, "stroke-width":1, opacity:0.55}, svg); } }
    }
    var G = tuftGeom(o.seed, tcx, tcy, tR);
    // tuft base (mesangium/matrix colour)
    S("path", {d:blob(tcx, tcy, tR + 8, tR + 4, r, 14, o.collapse ? 0.2 : 0.06), fill:C.cyto, opacity:0.55}, svg);
    if(o.collapse){ for(var cp = 0; cp < 26; cp++){ var ca = cp / 26 * Math.PI * 2; S("circle", {cx:tcx + Math.cos(ca) * (tR + 10), cy:tcy + Math.sin(ca) * (tR + 10), r:6, fill:C.cyto, stroke:C.mem, "stroke-width":0.6}, svg); S("circle", {cx:tcx + Math.cos(ca) * (tR + 10), cy:tcy + Math.sin(ca) * (tR + 10), r:2.8, fill:C.nuc}, svg); } }
    var sclA = -Math.PI * 0.15, sclSpan = o.sclerosis * Math.PI * 2;
    G.loops.forEach(function(L, li){
      var lr = L.r * (o.lobular ? 0.92 : 1) * (o.collapse ? 0.55 : 1);
      var inScl = o.sclerosis > 0 && L.ring > 0 && angIn(L.a, sclA, sclSpan);
      var thromb = o.thrombi > 0 && r() < o.thrombi, necro = o.necrosis > 0 && L.ring === 2 && angIn(L.a, Math.PI * 0.75, o.necrosis * Math.PI * 1.2);
      if(inScl){ S("circle", {cx:L.x, cy:L.y, r:lr + 3, fill:C.mat, opacity:silver ? 0.75 : 0.6}, svg); S("circle", {cx:L.x, cy:L.y, r:lr * 0.3, fill:C.mat}, svg); return; }
      var wall = 1.6 + o.thick * 3.2;
      var hyal = o.thrombusType === "hyaline";
      S("circle", {cx:L.x, cy:L.y, r:lr, fill:thromb ? (hyal ? C.hyal : C.fibrin) : C.lum, stroke:C.mem, "stroke-width":wall, opacity:thromb && hyal ? 0.9 : 1}, svg);
      if(thromb && !hyal){ // fibrin: PAS-negative pale meshwork with trapped fragmented RBC
        for(var fs = 0; fs < 5; fs++){ var fa = r() * 6.28; S("line", {x1:L.x + Math.cos(fa) * lr * 0.75, y1:L.y + Math.sin(fa) * lr * 0.75, x2:L.x - Math.cos(fa + 0.4) * lr * 0.7, y2:L.y - Math.sin(fa + 0.4) * lr * 0.7, stroke:C.fibLine, "stroke-width":0.8, opacity:0.8}, svg); }
        S("path", {d:"M" + (L.x - 4) + "," + (L.y + 2) + " q3,-4 7,-1 l3,-2 q-1,5 -5,6z", fill:C.rbc, opacity:0.85}, svg);
      }
      if(o.wireloop > 0 && r() < o.wireloop) S("circle", {cx:L.x, cy:L.y, r:lr - wall - 1.6, fill:"none", stroke:he ? "#E77FAE" : C.mat, "stroke-width":3.6, opacity:0.9}, svg);
      if(o.doubleContour) S("circle", {cx:L.x, cy:L.y, r:lr - wall - 2.2, fill:"none", stroke:C.mem, "stroke-width":1.1}, svg);
      if(o.spikes && silver){ for(var sp = 0; sp < 14; sp++){ var sa = sp / 14 * Math.PI * 2; S("line", {x1:L.x + Math.cos(sa) * lr, y1:L.y + Math.sin(sa) * lr, x2:L.x + Math.cos(sa) * (lr + 3.5), y2:L.y + Math.sin(sa) * (lr + 3.5), stroke:C.mem, "stroke-width":1.4}, svg); } }
      if(necro){ S("circle", {cx:L.x, cy:L.y, r:lr + 2, fill:C.fibrin, stroke:C.fibLine, "stroke-width":1, opacity:0.95}, svg); for(var nf = 0; nf < 4; nf++){ var na = r() * 6.28; S("line", {x1:L.x + Math.cos(na) * lr * 0.8, y1:L.y + Math.sin(na) * lr * 0.8, x2:L.x - Math.cos(na) * lr * 0.6, y2:L.y - Math.sin(na) * lr * 0.6, stroke:C.fibLine, "stroke-width":0.8}, svg); } for(var kr = 0; kr < 6; kr++) S("circle", {cx:L.x + (r() - 0.5) * lr, cy:L.y + (r() - 0.5) * lr, r:1.3, fill:C.nuc}, svg); return; }
      if(thromb) return;
      // endocapillary cells occluding lumen
      var nEndo = Math.round(o.endocap * 5);
      for(var e = 0; e < nEndo; e++){ var ex = L.x + (r() - 0.5) * lr * 1.1, ey = L.y + (r() - 0.5) * lr * 1.1; S("circle", {cx:ex, cy:ey, r:3.4, fill:C.nuc}, svg); }
      if(o.neutrophils > 0 && r() < o.neutrophils){ var nx = L.x + (r() - 0.5) * lr * 0.6, ny = L.y + (r() - 0.5) * lr * 0.6; [[-2.6, 0], [0, -2], [2.6, 0.6]].forEach(function(p){ S("circle", {cx:nx + p[0], cy:ny + p[1], r:1.9, fill:C.nuc}, svg); }); }
      if(nEndo < 3 && r() < 0.5) S("ellipse", {cx:L.x + lr * 0.2, cy:L.y - lr * 0.15, rx:lr * 0.42, ry:lr * 0.22, fill:C.rbc, opacity:0.8}, svg);
      S("ellipse", {cx:L.x + Math.cos(L.a) * lr * 0.9, cy:L.y + Math.sin(L.a) * lr * 0.9, rx:3.2, ry:2.2, fill:C.nuc, opacity:0.85}, svg); // podocyte nucleus
    });
    // mesangium
    G.mes.forEach(function(M, mi){
      if(o.sclerosis > 0 && mi >= 6 && angIn(M.a, sclA, sclSpan)) return;
      var mr = M.r * (1 + o.mesExpand * 1.2 + (o.lobular ? 0.5 : 0)) * (o.collapse ? 0.6 : 1);
      if(o.nodules > 0 && mi < 6 && r() < 0.35 + o.nodules * 0.65){ var nr = mr * (1.6 + o.nodules * 0.9); S("circle", {cx:M.x, cy:M.y, r:nr, fill:C.mat, opacity:silver ? 0.8 : 0.7}, svg); for(var lam = 1; lam < 4; lam++) S("circle", {cx:M.x, cy:M.y, r:nr * lam / 4, fill:"none", stroke:C.mem, "stroke-width":0.6, opacity:0.5}, svg); S("circle", {cx:M.x + nr * 0.8, cy:M.y, r:2.6, fill:C.nuc}, svg); return; }
      S("path", {d:blob(M.x, M.y, mr, mr * 0.8, r, 7, 0.25), fill:C.mat, opacity:0.55 + o.mesExpand * 0.3}, svg);
      var nNuc = 1 + Math.round(o.hyper * 4);
      for(var q = 0; q < nNuc; q++) S("circle", {cx:M.x + (r() - 0.5) * mr * 1.1, cy:M.y + (r() - 0.5) * mr * 0.9, r:2.9, fill:C.nuc}, svg);
    });
    if(o.sclerosis > 0){ // adhesion (synechia) to capsule
      var aa = sclA; S("path", {d:"M" + (tcx + Math.cos(aa) * tR) + "," + (tcy + Math.sin(aa) * tR) + " L" + (cx + Math.cos(aa) * (Rb - 2)) + "," + (cy + Math.sin(aa) * (Rb - 2)), stroke:C.mat, "stroke-width":8, "stroke-linecap":"round", opacity:0.7}, svg);
      S("circle", {cx:tcx + Math.cos(sclA) * tR * 0.75, cy:tcy + Math.sin(sclA) * tR * 0.75, r:5, fill:"#fff", stroke:C.mem, "stroke-width":0.8}, svg); // hyalinosis droplet
    }
    // vascular pole
    S("path", {d:"M" + (cx - 14) + "," + (cy + Rb - 2) + " q14,20 28,0", fill:C.cyto, stroke:C.mem, "stroke-width":1.5}, svg);
    S("text", {x:10, y:350, "font-family":MONO, "font-size":11, fill:silver ? "#3A2C14" : "#6B2A55", text:(o.stain === "HE" ? "H&E" : o.stain === "silver" ? "Jones silver" : "PAS") + (o.label ? "  " + o.label : "")}, svg);
    api.geom = G;
  }
  api.update = function(n){ o = merge(o, n); draw(); return api; };
  api.opts = function(){ return o; };
  draw();
  return api;
}

/* ================= Patho.ifStain ================= */
/* pattern: "negative" | "linear" | "pseudolinear" | "granular-cap" | "coarse-cap" | "mesangial" | "mes-cap" | "fullhouse" | "smudgy" | "chunky"
   intensity 0..3, label e.g. "IgG", tbm: true adds tubular basement membrane staining */
var IF_DEF = {pattern:"negative", intensity:2, label:"IgG", tbm:false, crescent:0, seed:3, color:"#7CFF6B"};
function ifStain(el, opts){
  var svg = getSvg(el, "0 0 360 360", "Immunofluorescence pattern schematic");
  var o = merge(IF_DEF, opts), api = {svg:svg};
  function draw(){
    svg.innerHTML = "";
    var r = rng(o.seed + 5), col = o.color, I = Math.max(0, Math.min(3, o.intensity)), al = I === 0 ? 0 : 0.25 + 0.25 * I, pat = I === 0 ? "negative" : o.pattern;
    var cx = 180, cy = 180;
    S("rect", {x:0, y:0, width:360, height:360, fill:"#050806"}, svg);
    var defs = S("defs", {}, svg), flt = S("filter", {id:"ifglow" + o.seed, x:"-20%", y:"-20%", width:"140%", height:"140%"}, defs);
    S("feGaussianBlur", {stdDeviation:1.4, result:"b"}, flt); var fm = S("feMerge", {}, flt); S("feMergeNode", {"in":"b"}, fm); S("feMergeNode", {"in":"SourceGraphic"}, fm);
    var grp = S("g", {filter:"url(#ifglow" + o.seed + ")"}, svg);
    var tR = 126 * (1 - 0.3 * (o.crescent || 0));
    var G = tuftGeom(o.seed, cx, cy, tR);
    // faint autofluorescence of tubules + capsule
    for(var t = 0; t < 6; t++){ var ta = t / 6 * Math.PI * 2 + 0.3; S("path", {d:blob(cx + Math.cos(ta) * 205, cy + Math.sin(ta) * 205, 42, 34, r, 10, 0.12), fill:"none", stroke:o.tbm && I ? col : "#1B3A1B", "stroke-width":o.tbm && I ? 2.2 : 1.4, opacity:o.tbm && I ? al * 0.8 : 0.9}, grp); }
    S("circle", {cx:cx, cy:cy, r:158, fill:"none", stroke:o.tbm && I ? col : "#173017", "stroke-width":1.6, opacity:o.tbm && I ? al * 0.6 : 1}, grp);
    G.loops.forEach(function(L){ S("circle", {cx:L.x, cy:L.y, r:L.r, fill:"none", stroke:"#12301A", "stroke-width":1.2}, grp); });
    function capGranules(size, density, jitter){
      G.loops.forEach(function(L){ var n = Math.round(L.r * density); for(var i = 0; i < n; i++){ var a = i / n * Math.PI * 2 + r() * 0.2, rr = L.r + (r() - 0.5) * jitter; S("circle", {cx:L.x + Math.cos(a) * rr, cy:L.y + Math.sin(a) * rr, r:size * (0.6 + r() * 0.7), fill:col, opacity:al * (0.7 + r() * 0.3)}, grp); } });
    }
    function mesGranules(size, count){ G.mes.forEach(function(M){ for(var i = 0; i < count; i++){ S("circle", {cx:M.x + (r() - 0.5) * M.r * 2.2, cy:M.y + (r() - 0.5) * M.r * 1.8, r:size * (0.6 + r() * 0.8), fill:col, opacity:al * (0.65 + r() * 0.35)}, grp); } }); }
    if(pat === "linear" || pat === "pseudolinear"){
      var pl = pat === "pseudolinear";
      G.loops.forEach(function(L){ S("circle", {cx:L.x, cy:L.y, r:L.r, fill:"none", stroke:col, "stroke-width":pl ? 1.3 : 2.4, opacity:pl ? al * 0.55 : al}, grp); });
    } else if(pat === "granular-cap"){ capGranules(1.5, 1.6, 1.2); }
    else if(pat === "coarse-cap"){ capGranules(3.2, 0.62, 4); mesGranules(2.6, 2); }
    else if(pat === "mesangial"){ mesGranules(2.4, 9); }
    else if(pat === "mes-cap"){ mesGranules(2.2, 6); capGranules(2.1, 0.9, 3); }
    else if(pat === "fullhouse" || pat === "chunky"){ mesGranules(2.5, 7); capGranules(2.3, 1.1, 3);
      G.loops.forEach(function(L){ if(r() < (pat === "chunky" ? 0.55 : 0.3)){ var a0 = r() * 6.28; S("path", {d:"M" + (L.x + Math.cos(a0) * (L.r - 2)) + "," + (L.y + Math.sin(a0) * (L.r - 2)) + " A" + (L.r - 2) + "," + (L.r - 2) + " 0 0 1 " + (L.x + Math.cos(a0 + 1.6) * (L.r - 2)) + "," + (L.y + Math.sin(a0 + 1.6) * (L.r - 2)), fill:"none", stroke:col, "stroke-width":4.2, "stroke-linecap":"round", opacity:al}, grp); } }); }
    else if(pat === "smudgy"){
      G.loops.forEach(function(L){ var n = 7; for(var i = 0; i < n; i++){ var a = i / n * 6.28 + r(); S("path", {d:"M" + (L.x + Math.cos(a) * L.r) + "," + (L.y + Math.sin(a) * L.r) + " A" + L.r + "," + L.r + " 0 0 1 " + (L.x + Math.cos(a + 0.6) * L.r) + "," + (L.y + Math.sin(a + 0.6) * L.r), fill:"none", stroke:col, "stroke-width":2.6, opacity:al * 0.85}, grp); } });
      G.mes.forEach(function(M){ S("circle", {cx:M.x, cy:M.y, r:M.r * 0.9, fill:"none", stroke:col, "stroke-width":2.4, opacity:al * 0.9}, grp); for(var i = 0; i < 3; i++) S("circle", {cx:M.x + (r() - 0.5) * M.r, cy:M.y + (r() - 0.5) * M.r, r:1.6, fill:col, opacity:al}, grp); });
    }
    if(o.crescent){ S("path", {d:"M70,72 Q180,6 290,72", fill:"none", stroke:"#2A4A2A", "stroke-width":30, opacity:0.5}, svg); }
    var grade = (I === 0 || o.pattern === "negative") ? "neg" : I < 1 ? "trace" : I < 2 ? "1+" : I < 3 ? "2+" : "3+";
    S("text", {x:14, y:26, "font-family":MONO, "font-size":15, fill:"#E9FFE6", text:(o.label || "") + "  " + grade}, svg);
    api.geom = G;
  }
  api.update = function(n){ o = merge(o, n); draw(); return api; };
  api.opts = function(){ return o; };
  draw();
  return api;
}

/* ================= Patho.fibrils (high-mag EM) ================= */
/* kind: "amyloid" | "fibrillary" | "immunotactoid" | "cryo" | "lcdd" | "fibronectin" | "collagen3" ; size nm (diameter); pxPerNm default 2.2 */
var FIB_DEF = {kind:"amyloid", size:10, pxPerNm:0.75, bar:100, seed:9, density:1};
function fibrils(el, opts){
  var svg = getSvg(el, "0 0 600 320", "Electron microscopy of organized deposits");
  var o = merge(FIB_DEF, opts), api = {svg:svg};
  function draw(){
    svg.innerHTML = "";
    var r = rng(o.seed), k = o.kind, w = Math.max(1, o.size * o.pxPerNm);
    S("rect", {x:0, y:0, width:600, height:320, fill:"#CFCFCF"}, svg);
    for(var n = 0; n < 900; n++) S("circle", {cx:r() * 600, cy:r() * 320, r:0.6 + r() * 0.8, fill:r() < 0.5 ? "#BDBDBD" : "#DCDCDC"}, svg); // grain
    var g = S("g", {}, svg);
    if(k === "amyloid" || k === "fibrillary"){
      var cnt = Math.round((k === "amyloid" ? 260 : 170) * o.density);
      for(var i = 0; i < cnt; i++){ var x = r() * 640 - 20, y = r() * 360 - 20, a = r() * Math.PI, L = 40 + r() * 70; S("line", {x1:x, y1:y, x2:x + Math.cos(a) * L, y2:y + Math.sin(a) * L, stroke:"#2E2E2E", "stroke-width":w, "stroke-linecap":"round", opacity:0.55 + r() * 0.35}, g); }
    } else if(k === "immunotactoid"){
      var bundles = [[60, 70, 0.12], [330, 60, -0.08], [120, 200, -0.2], [380, 210, 0.15]];
      bundles.forEach(function(B){ for(var t2 = 0; t2 < 7; t2++){ var oy = t2 * (w + 3), x0 = B[0] + (r() - 0.5) * 10, y0 = B[1] + oy, L2 = 150 + r() * 30, dx = Math.cos(B[2]) * L2, dy = Math.sin(B[2]) * L2;
        S("line", {x1:x0, y1:y0, x2:x0 + dx, y2:y0 + dy, stroke:"#2A2A2A", "stroke-width":w, opacity:0.9}, g);
        S("line", {x1:x0, y1:y0, x2:x0 + dx, y2:y0 + dy, stroke:"#D8D8D8", "stroke-width":w * 0.42, opacity:0.95}, g);
        S("ellipse", {cx:x0, cy:y0, rx:w * 0.25, ry:w * 0.5, fill:"#D8D8D8", stroke:"#2A2A2A", "stroke-width":w * 0.29}, g); } });
    } else if(k === "cryo"){
      for(var q = 0; q < 26; q++){ var cx = 30 + r() * 540, cy = 30 + r() * 260, rr = 18 + r() * 22, a0 = r() * 6.28, sw = 1.2 + r() * 2.2;
        S("path", {d:"M" + (cx + Math.cos(a0) * rr) + "," + (cy + Math.sin(a0) * rr) + " A" + rr + "," + rr + " 0 " + (sw > 2.5 ? 1 : 0) + " 1 " + (cx + Math.cos(a0 + sw) * rr) + "," + (cy + Math.sin(a0 + sw) * rr), fill:"none", stroke:"#2A2A2A", "stroke-width":w, "stroke-linecap":"round", opacity:0.85}, g);
        S("path", {d:"M" + (cx + Math.cos(a0) * rr) + "," + (cy + Math.sin(a0) * rr) + " A" + rr + "," + rr + " 0 " + (sw > 2.5 ? 1 : 0) + " 1 " + (cx + Math.cos(a0 + sw) * rr) + "," + (cy + Math.sin(a0 + sw) * rr), fill:"none", stroke:"#D4D4D4", "stroke-width":w * 0.4, opacity:0.9}, g); }
    } else if(k === "lcdd"){
      S("rect", {x:0, y:120, width:600, height:70, fill:"#8E8E8E"}, g);
      for(var p = 0; p < 1400; p++) S("circle", {cx:r() * 600, cy:118 + r() * 8 + (r() < 0.5 ? 0 : 66), r:0.9 + r() * 1.3, fill:"#151515", opacity:0.85}, g); // powdery, along inner and outer aspect
      for(var p2 = 0; p2 < 300; p2++) S("circle", {cx:r() * 600, cy:125 + r() * 60, r:0.8, fill:"#2A2A2A", opacity:0.5}, g);
    } else if(k === "fibronectin" || k === "collagen3"){
      for(var f = 0; f < 70; f++){ var fx = r() * 600, fy = r() * 320, fa = r() * 6.28, fl = 30 + r() * 40, d = "M" + fx + "," + fy;
        for(var s = 1; s <= 6; s++) d += " L" + (fx + Math.cos(fa) * fl * s / 6 + (r() - 0.5) * 8) + "," + (fy + Math.sin(fa) * fl * s / 6 + (r() - 0.5) * 8);
        S("path", {d:d, fill:"none", stroke:"#2E2E2E", "stroke-width":w, opacity:0.75, "stroke-dasharray":k === "collagen3" ? "6 3" : null}, g); }
    }
    // scale bar
    var barPx = o.bar * o.pxPerNm;
    S("rect", {x:600 - barPx - 26, y:280, width:barPx + 16, height:30, rx:4, fill:"#FFFFFF", opacity:0.85}, svg);
    S("rect", {x:600 - barPx - 18, y:298, width:barPx, height:5, fill:"#111"}, svg);
    S("text", {x:600 - barPx / 2 - 18, y:293, "text-anchor":"middle", "font-family":MONO, "font-size":12, fill:"#111", text:o.bar + " nm"}, svg);
    api.geom = {pxPerNm:o.pxPerNm};
  }
  api.update = function(n){ o = merge(o, n); draw(); return api; };
  api.opts = function(){ return o; };
  draw();
  return api;
}

window.Patho = {version:"1.0.1", loop:loop, glom:glom, ifStain:ifStain, fibrils:fibrils, tuftGeom:tuftGeom, rng:rng, PAL:PAL};
})();
