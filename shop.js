const CATS = [["all", "Tout"], ["new", "Nouveautés"], ["hoodie", "Hoodies"], ["tee", "T-shirts"], ["zip", "Vestes zippées"]];
const euro = (n) => n.toFixed(2).replace(".", ",") + " €";
const CATL = { hoodie: "Hoodie", tee: "T-shirt", zip: "Veste zippée" };
let cat = "all", q = "", cart = [];
try { cart = JSON.parse(localStorage.getItem("ps-cart") || "[]"); } catch (e) {}
const mockOf = (p) => svg({ ...S, text: "", ...p.mock, dx: 0, dy: 0, scale: p.mock.kind === "text" ? .8 : 1 });
const imgs = (p) => p.imgs || [p.id + ".jpg", p.id + "-dos.jpg"];
const price = (p) => (p.price ? euro(p.price) : "Prix sur WhatsApp");
const load = (src, ok) => { const i = new Image(); i.onload = () => ok(src); i.src = src; };

function card(p) {
  const a = document.createElement("button"); a.className = "pc";
  a.innerHTML = `<div class="im">${mockOf(p)}<span class="tg">${p.isNew ? "Nouveau" : ""}</span><span class="tg pv">Aperçu</span></div><small class="br">PS PRINTING</small><h3>${p.name}</h3><div class="pr ${p.price ? "" : "q"}">${price(p)}</div>`;
  load(imgs(p)[0], (s) => { const im = a.querySelector(".im"); im.querySelector("svg").replaceWith(Object.assign(new Image(), { src: s, alt: p.name })); a.querySelector(".pv").remove(); });
  a.onclick = () => openQV(p);
  return a;
}
const match = (p) => (cat === "all" || (cat === "new" ? p.isNew : p.cat === cat)) && (!q || (p.name + " " + CATL[p.cat]).toLowerCase().includes(q.toLowerCase()));
function grid() {
  const g = $("#grid"); g.innerHTML = "";
  const list = PRODUCTS.filter(match);
  list.forEach((p) => g.appendChild(card(p)));
  if (!list.length) g.innerHTML = `<p class="sub">Aucun résultat. Essaie un autre mot, ou écris-nous sur WhatsApp pour une demande sur mesure.</p>`;
  $("#tabs").querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.c === cat));
}
$("#tabs").innerHTML = CATS.map(([v, l]) => `<button class="chip" data-c="${v}">${l}</button>`).join("");
$("#tabs").onclick = (e) => { if (e.target.dataset.c) { cat = e.target.dataset.c; grid(); } };
PRODUCTS.filter((p) => p.isNew).forEach((p) => $("#car").appendChild(card(p)));
$("#pl").onclick = () => $("#car").scrollBy({ left: -320, behavior: "smooth" });
$("#pr").onclick = () => $("#car").scrollBy({ left: 320, behavior: "smooth" });
document.querySelectorAll("[data-cat]").forEach((a) => a.addEventListener("click", () => { cat = a.dataset.cat; grid(); }));
$("#q").oninput = (e) => { q = e.target.value.trim(); cat = "all"; grid(); };
$("#search").onsubmit = (e) => { e.preventDefault(); $("#catalogue").scrollIntoView({ behavior: "smooth" }); };

// ----- fiche produit -----
const close = () => { ["#qv", "#cart", "#ov"].forEach((s) => ($(s).hidden = true)); document.body.style.overflow = ""; };
const openLayer = (id) => { $("#ov").hidden = false; $(id).hidden = false; document.body.style.overflow = "hidden"; };
$("#ov").onclick = close;
document.addEventListener("keydown", (e) => e.key === "Escape" && close());
function openQV(p) {
  const st = { print: "sans", size: "M", qty: 1, i: 0, list: [] };
  const el = $("#qv");
  const chips = (arr, k) => arr.map(([v, l]) => `<button class="chip" data-k="${k}" data-v="${v}">${l}</button>`).join("");
  el.innerHTML = `<button class="x" aria-label="Fermer">×</button><div class="qm"><div class="qi"></div><div class="row th"></div></div>
  <div class="qb"><small class="br">PS PRINTING</small><h2>${p.name}</h2><div class="pr ${p.price ? "" : "q"}">${price(p)}</div><p>${p.desc || ""}</p>
  <h3>Option</h3><div class="row">${chips([["sans", "Sans impression"], ["avec", "Avec impression"]], "print")}</div>
  <div class="note" hidden>Ton impression est confirmée sur WhatsApp. <a href="#studio">Crée ton design dans le studio</a> ou envoie ton PNG.</div>
  <h3>Taille</h3><div class="row">${chips(SIZES.map((x) => [x, x]), "size")}</div>
  <label class="qty">Quantité <input type="number" min="1" value="1"></label>
  <button class="btn" id="add">Ajouter au panier</button></div>`;
  const show = () => {
    $(".qi", el).innerHTML = st.list.length ? `<img src="${st.list[st.i]}" alt="${p.name}">` : mockOf(p);
    $(".th", el).innerHTML = st.list.length > 1 ? st.list.map((_, j) => `<button class="chip ${j === st.i ? "on" : ""}" data-j="${j}">${j ? "Dos" : "Face"}</button>`).join("") : "";
  };
  imgs(p).forEach((s, j) => load(s, () => { st.list[j] = s; st.list = st.list.filter(Boolean); show(); }));
  const mark = () => { el.querySelectorAll("[data-k]").forEach((b) => b.classList.toggle("on", String(st[b.dataset.k]) === b.dataset.v)); $(".note", el).hidden = st.print !== "avec"; };
  el.onclick = (e) => {
    const t = e.target;
    if (t.dataset.k) { st[t.dataset.k] = t.dataset.v; mark(); }
    if (t.dataset.j) { st.i = +t.dataset.j; show(); }
    if (t.classList.contains("x")) close();
    if (t.tagName === "A" && t.hash) close();
    if (t.id === "add") { add(p, st); }
  };
  $(".qty input", el).oninput = (e) => (st.qty = Math.max(1, +e.target.value || 1));
  show(); mark(); openLayer("#qv");
}

// ----- panier -----
const save = () => { try { localStorage.setItem("ps-cart", JSON.stringify(cart)); } catch (e) {} $("#cc").textContent = cart.reduce((n, c) => n + c.qty, 0); };
function add(p, st) {
  const k = cart.find((c) => c.id === p.id && c.print === st.print && c.size === st.size);
  k ? (k.qty += st.qty) : cart.push({ id: p.id, print: st.print, size: st.size, qty: st.qty });
  save(); renderCart(); close(); openLayer("#cart");
}
function renderCart() {
  const el = $("#cart"); let total = 0, quote = 0;
  const rows = cart.map((c, i) => {
    const p = PRODUCTS.find((x) => x.id === c.id); if (!p) return "";
    p.price ? (total += p.price * c.qty) : (quote += c.qty);
    return `<div class="ci"><div class="cim">${mockOf(p)}</div><div><b>${p.name}</b><small>${c.size} · ${c.print === "avec" ? "Avec impression" : "Sans impression"}</small><small>${p.price ? euro(p.price * c.qty) : "Prix sur WhatsApp"}</small>
    <div class="row"><button class="sq" data-m="${i}" data-d="-1" aria-label="Moins">−</button><span>${c.qty}</span><button class="sq" data-m="${i}" data-d="1" aria-label="Plus">+</button><button class="lnk" data-r="${i}">Retirer</button></div></div></div>`;
  }).join("");
  el.innerHTML = `<div class="ch"><h2>Mon panier</h2><button class="x" aria-label="Fermer">×</button></div><div class="cl">${rows || "<p class='sub'>Ton panier est vide. Choisis un modèle dans la collection.</p>"}</div>
  <div class="cf">${total ? `<div class="tt"><span>Sous-total</span><b>${euro(total)}</b></div>` : ""}${quote ? `<small>${quote} article(s) au prix donné sur WhatsApp. Les impressions sont confirmées avant paiement.</small>` : ""}<button class="btn" id="co" ${cart.length ? "" : "disabled"}>Commander sur WhatsApp</button></div>`;
  el.onclick = (e) => {
    const t = e.target;
    if (t.classList.contains("x")) close();
    if (t.dataset.m) { const c = cart[+t.dataset.m]; c.qty = Math.max(1, c.qty + +t.dataset.d); save(); renderCart(); }
    if (t.dataset.r) { cart.splice(+t.dataset.r, 1); save(); renderCart(); }
    if (t.id === "co") {
      const lines = cart.map((c) => { const p = PRODUCTS.find((x) => x.id === c.id); return `- ${p.name} | ${c.size} | ${c.print === "avec" ? "AVEC impression" : "SANS impression"} | x${c.qty}${p.price ? " | " + euro(p.price * c.qty) : ""}`; });
      wa(`Bonjour PS Printing ! Je voudrais commander :\n${lines.join("\n")}${total ? "\nSous-total : " + euro(total) : ""}`);
    }
  };
}
$("#cartbtn").onclick = () => { renderCart(); openLayer("#cart"); };

// ----- bannière -----
const slides = [...document.querySelectorAll(".slide")]; let si = 0, ap = !matchMedia("(prefers-reduced-motion:reduce)").matches;
$("#dots").innerHTML = slides.map((_, i) => `<button aria-label="Bannière ${i + 1}"></button>`).join("");
const go = (i) => { si = (i + slides.length) % slides.length; slides.forEach((s, j) => s.classList.toggle("on", j === si)); $("#dots").querySelectorAll("button").forEach((b, j) => b.classList.toggle("on", j === si)); };
$("#dots").onclick = (e) => { const j = [...$("#dots").children].indexOf(e.target); if (j > -1) go(j); };
$("#hp").onclick = () => go(si - 1); $("#hn").onclick = () => go(si + 1);
$("#hero").addEventListener("pointerenter", () => (ap = false));
setInterval(() => ap && go(si + 1), 6500);
$("#slide-mock").innerHTML = svg({ ...S, type: "hoodie", color: "#111111", kind: "text", text: "TON IDÉE", font: "Anton", pc: "#ffffff", pos: "center", dx: 0, dy: 0, scale: 1 });
go(0); grid(); save(); renderCart();
