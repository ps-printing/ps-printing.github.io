const WA = "33751392075";
const $ = (s) => document.querySelector(s);
const TYPES = [["tee", "T-shirt"], ["hoodie", "Hoodie"], ["zip", "Veste zippée"]];
const COLORS = [["#111111", "Noir"], ["#ffffff", "Blanc"], ["#8d9096", "Gris chiné"], ["#34363b", "Anthracite"], ["#d3202b", "Rouge"], ["#6b1624", "Bordeaux"], ["#14224a", "Bleu marine"], ["#2a55c9", "Bleu roi"], ["#1f4d36", "Vert bouteille"], ["#d9c7a3", "Beige"], ["#f0a6c0", "Rose"], ["#f2c623", "Jaune"]];
const PCOL = ["#ffffff", "#111111", "#e4161c", "#00aeef", "#ec008c", "#fff200", "#d9a441", "#25d366"];
const FONTS = ["Anton", "Bebas Neue", "Permanent Marker", "Pacifico", "Orbitron", "Archivo"];
const ICONS = {
  bolt: "M10-45L-25 5L-2 5L-12 45L25-8L2-8Z", star: "M0-40L12-12L42-12L18 8L27 38L0 20L-27 38L-18 8L-42-12L-12-12Z",
  heart: "M0 35C-60-5-30-45 0-15C30-45 60-5 0 35Z", crown: "M-40 25L-45-25L-20 0L0-30L20 0L45-25L40 25Z",
  flame: "M0-45C10-20 35-10 30 15C28 35 10 42 0 42C-12 42-30 32-28 12C-26-2-10-8 0-45Z"
};
const KINDS = [["text", "Texte"], ["icon", "Icône"], ["logo", "Logo PS"], ["img", "Mon image"]];
const POS = [["chest", "Poitrine"], ["center", "Centre"], ["back", "Dos"]];
const SIZES = ["S", "M", "L", "XL", "XXL"];
const S = { type: "hoodie", color: "#111111", kind: "text", text: "PS PRINTING", font: "Anton", icon: "bolt", pc: "#ffffff", pos: "center", scale: 1, dx: 0, dy: 0, img: "", size: "M", qty: 1 };
const PRESETS = [
  { name: "Night Rider", cat: "hoodie", type: "hoodie", color: "#111111", kind: "text", text: "NIGHT RIDER", font: "Anton", pc: "#ffffff", pos: "back" },
  { name: "Good Vibes", cat: "tee", type: "tee", color: "#ffffff", kind: "text", text: "Good Vibes", font: "Pacifico", pc: "#e4161c", pos: "center" },
  { name: "Éclair", cat: "zip", type: "zip", color: "#34363b", kind: "icon", icon: "bolt", pc: "#fff200", pos: "chest" },
  { name: "Royal", cat: "hoodie", type: "hoodie", color: "#6b1624", kind: "icon", icon: "crown", pc: "#d9a441", pos: "center" },
  { name: "Étoile", cat: "tee", type: "tee", color: "#111111", kind: "icon", icon: "star", pc: "#00aeef", pos: "chest" },
  { name: "Stay Wild", cat: "hoodie", type: "hoodie", color: "#d9c7a3", kind: "text", text: "STAY WILD", font: "Permanent Marker", pc: "#111111", pos: "center" },
  { name: "Flamme", cat: "zip", type: "zip", color: "#111111", kind: "icon", icon: "flame", pc: "#e4161c", pos: "back" },
  { name: "Team 2026", cat: "tee", type: "tee", color: "#2a55c9", kind: "text", text: "TEAM 2026", font: "Bebas Neue", pc: "#ffffff", pos: "center" },
  { name: "Love", cat: "hoodie", type: "hoodie", color: "#f0a6c0", kind: "icon", icon: "heart", pc: "#ffffff", pos: "chest" }
];
const TL = { tee: "T-shirt", hoodie: "Hoodie", zip: "Veste zippée" };
const T = "M130 30L45 78L12 170L72 192L95 156V405H305V156L328 192L388 170L355 78L270 30Q200 80 130 30Z";
const H = "M120 40L55 70L16 322L68 334L95 160V405H305V160L332 334L384 322L345 70L280 40Q200 85 120 40Z";
const esc = (t) => t.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

function art(s) {
  const k = s.kind;
  if (k === "text") {
    const t = (s.text || "").trim() || " ";
    return `<text text-anchor="middle" dominant-baseline="middle" font-family="${s.font},Archivo,sans-serif" font-size="${Math.min(58, 240 / Math.max(t.length * .5, 1))}" fill="${s.pc}">${esc(t)}</text>`;
  }
  if (k === "icon") return `<path d="${ICONS[s.icon] || ICONS.bolt}" fill="${s.pc}" transform="scale(1.3)"/>`;
  if (k === "logo") return `<image href="logo.png" x="-75" y="-48" width="150" height="96"/>`;
  return s.img ? `<image href="${s.img}" x="-70" y="-70" width="140" height="140" preserveAspectRatio="xMidYMid meet"/>` : "";
}

function svg(s) {
  const L = s.type !== "tee", back = s.pos === "back", c = s.color, d = L ? H : T;
  const sh = (p) => `<path d="${p}" fill="url(#sh)"/>`;
  let o = `<defs><linearGradient id="sh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset=".35" stop-color="#fff" stop-opacity=".2"/><stop offset=".65" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></linearGradient></defs>`;
  const hoodF = "M125 46Q200-35 275 46L268 98Q200 132 132 98Z";
  if (L && !back) o += `<path d="${hoodF}" fill="${c}"/>` + sh(hoodF);
  o += `<path d="${d}" fill="${c}" stroke="rgba(255,255,255,.18)" stroke-width="1.5"/>` + sh(d);
  if (L) {
    o += `<path d="M19 298L71 311L68 334L16 322Z M381 298L329 311L332 334L384 322Z" fill="rgba(0,0,0,.22)"/><rect x="95" y="386" width="210" height="19" fill="rgba(0,0,0,.22)"/>`;
    if (back) { const hb = "M125 46Q200-40 275 46Q200 150 125 46Z"; o += `<path d="${hb}" fill="${c}"/>` + sh(hb) + `<path d="M200 4V104" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`; }
    else o += `<path d="M126 42Q200 86 274 42Q200-10 126 42Z" fill="rgba(0,0,0,.45)"/>`;
  } else o += `<rect x="95" y="396" width="210" height="9" fill="rgba(0,0,0,.18)"/><path d="M130 30Q200 ${back ? 52 : 84} 270 30Q200 ${back ? 68 : 112} 130 30Z" fill="rgba(0,0,0,.32)"/>`;
  if (L && !back) {
    if (s.type === "zip") o += `<path d="M200 96V405" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-dasharray="2 3"/><path d="M128 300L140 352M272 300L260 352" stroke="rgba(255,255,255,.25)" stroke-width="2"/>`;
    else o += `<path d="M132 322H268L284 388H116Z" fill="rgba(0,0,0,.16)" stroke="rgba(255,255,255,.15)"/><path d="M186 100V150M214 100V150" stroke="rgba(255,255,255,.55)" stroke-width="3"/>`;
  }
  const P = { chest: [258, 150, .42], center: [200, 235, 1], back: [200, 215, 1.15] }[s.pos];
  o += `<g id="art" transform="translate(${P[0] + (s.dx || 0)} ${P[1] + (s.dy || 0)}) scale(${P[2] * (s.scale || 1)})">${art(s)}</g>`;
  return `<svg viewBox="0 0 400 440" role="img" aria-label="Aperçu ${TL[s.type]}">${o}</svg>`;
}

function btn(box, v, label, k, extra) {
  const b = document.createElement("button");
  b.className = extra || "chip"; b.dataset.k = k; b.dataset.v = v;
  if (extra === "sw") { b.style.background = v; b.setAttribute("aria-label", label); b.title = label; } else if (extra === "chip ic") b.innerHTML = label; else b.textContent = label;
  if (k === "font") b.style.fontFamily = v;
  b.onclick = () => {
    S[k] = v;
    if (k === "pos") { S.dx = 0; S.dy = 0; }
    sync(); draw();
  };
  $(box).appendChild(b);
}
TYPES.forEach(([v, l]) => btn("#c-type", v, l, "type"));
COLORS.forEach(([v, l]) => btn("#c-color", v, l, "color", "sw"));
KINDS.forEach(([v, l]) => btn("#c-kind", v, l, "kind"));
FONTS.forEach((f) => btn("#c-font", f, "Abc", "font"));
Object.keys(ICONS).forEach((i) => btn("#c-icon", i, `<svg viewBox="-50 -50 100 100"><path d="${ICONS[i]}" fill="currentColor"/></svg>`, "icon", "chip ic"));
PCOL.forEach((v) => btn("#c-pc", v, v, "pc", "sw"));
POS.forEach(([v, l]) => btn("#c-pos", v, l, "pos"));
SIZES.forEach((v) => btn("#c-size", v, v, "size"));

function sync() {
  document.querySelectorAll("[data-k]").forEach((b) => b.classList.toggle("on", String(S[b.dataset.k]) === b.dataset.v));
  document.querySelectorAll(".sub-p").forEach((p) => p.classList.toggle("show", p.dataset.for === S.kind));
  $("#g-pc").style.display = S.kind === "text" || S.kind === "icon" ? "" : "none";
  $("#txt").value = S.text; $("#scale").value = S.scale; $("#qty").value = S.qty;
}
function draw() { $("#stage").innerHTML = svg(S); }

$("#txt").oninput = (e) => { S.text = e.target.value; draw(); };
$("#scale").oninput = (e) => { S.scale = +e.target.value; draw(); };
$("#qty").oninput = (e) => { S.qty = Math.max(1, +e.target.value || 1); };
$("#file").onchange = (e) => {
  const f = e.target.files[0]; if (!f) return;
  S.file = f; const r = new FileReader(); r.onload = () => { S.img = r.result; draw(); }; r.readAsDataURL(f);
};
// drag the artwork on the garment
let drag = null;
$("#stage").addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY, dx: S.dx, dy: S.dy }; $("#stage").setPointerCapture(e.pointerId); });
$("#stage").addEventListener("pointermove", (e) => {
  if (!drag) return;
  const k = 400 / $("#stage svg").getBoundingClientRect().width;
  S.dx = Math.max(-120, Math.min(120, drag.dx + (e.clientX - drag.x) * k));
  S.dy = Math.max(-130, Math.min(150, drag.dy + (e.clientY - drag.y) * k));
  draw();
});
["pointerup", "pointercancel"].forEach((n) => $("#stage").addEventListener(n, () => (drag = null)));

// 360 viewer
const v = $("#v360"); let fr = 0, acc = 0, sx = null, auto = !matchMedia("(prefers-reduced-motion:reduce)").matches;
const show = (i) => { fr = (i + 8) % 8; v.style.backgroundPosition = `${(fr % 4) * 33.3333}% ${Math.floor(fr / 4) * 100}%`; };
v.addEventListener("pointerdown", (e) => { sx = e.clientX; auto = false; v.setPointerCapture(e.pointerId); });
v.addEventListener("pointermove", (e) => { if (sx === null) return; acc += e.clientX - sx; sx = e.clientX; const st = Math.trunc(acc / 45); if (st) { show(fr - st); acc -= st * 45; } });
["pointerup", "pointercancel"].forEach((n) => v.addEventListener(n, () => (sx = null)));
setInterval(() => auto && show(fr + 1), 700);

// WhatsApp
const wa = (m) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(m)}`, "_blank");
// Envoi WhatsApp avec photos de référence : liens dans le message + images jointes si le téléphone le permet
const abs = (u) => (/^(https?:|data:)/.test(u) ? u : new URL(u, location.href).href);
async function sendWA(msg, refs = [], files = []) {
  const uniq = [...new Set(refs)];
  const links = uniq.filter((u) => !u.startsWith("data:") && location.protocol.startsWith("http")).map(abs);
  const text = msg + (links.length ? "\n\nPhotos de référence :\n" + links.join("\n") : "");
  try {
    if (navigator.canShare && navigator.share) {
      const fs = [...files];
      for (const u of uniq) { if (u.startsWith("data:")) continue; const b = await (await fetch(u)).blob(); fs.push(new File([b], u.split("/").pop(), { type: b.type })); }
      if (fs.length && navigator.canShare({ files: fs })) { await navigator.share({ files: fs, text }); return; }
    }
  } catch (e) { if (e.name === "AbortError") return; }
  wa(text);
}
const cn = (h) => (COLORS.find((c) => c[0] === h) || [0, h])[1];
$("#send").onclick = () => {
  const what = S.kind === "text" ? `Texte « ${S.text} » (police ${S.font}, couleur ${S.pc})` : S.kind === "icon" ? `Icône ${S.icon} (couleur ${S.pc})` : S.kind === "logo" ? "Logo PS Printing" : "Mon image (je te l’envoie ici)";
  sendWA(`Bonjour PS Printing ! Je voudrais commander :\nProduit : ${TL[S.type]}\nCouleur : ${cn(S.color)}\nMotif : ${what}\nEmplacement : ${POS.find((p) => p[0] === S.pos)[1]}\nTaille : ${S.size}\nQuantité : ${S.qty}`, [], S.kind === "img" && S.file ? [S.file] : []);
};
$("#form").onsubmit = (e) => { e.preventDefault(); wa(`Bonjour PS Printing ! Je m’appelle ${$("#f-name").value}.\nProduit : ${$("#f-item").value}\nQuantité : ${$("#f-qty").value}\n${$("#f-msg").value}`); };

sync(); draw(); show(0);
