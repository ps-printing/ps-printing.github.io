// ====== EDIT THESE ======
const WHATSAPP = "91XXXXXXXXXX"; // country code + number, no + or spaces
const INSTAGRAM = ""; // e.g. "https://instagram.com/yourpage"
// ========================

const GARMENTS = ["#111111", "#ffffff", "#e4161c", "#1f3a8a", "#6b7280"];
const PRINTS = ["#ffffff", "#e4161c", "#00aeef", "#ec008c", "#fff200", "#111111"];
const st = { type: "tee", size: "M", garment: GARMENTS[0], print: PRINTS[0] };
const $ = (s) => document.querySelector(s);

function swatches(id, colors, key) {
  const box = $(id);
  colors.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "sw" + (i === 0 ? " on" : "");
    b.style.background = c;
    b.setAttribute("aria-label", c);
    b.onclick = () => {
      st[key] = c;
      box.querySelectorAll(".sw").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      render();
    };
    box.appendChild(b);
  });
}
swatches("#garment-colors", GARMENTS, "garment");
swatches("#print-colors", PRINTS, "print");

function render() {
  const text = $("#txt").value.trim() || " ";
  const p = $("#print");
  p.textContent = text.toUpperCase();
  p.style.fill = st.print;
  p.style.fontSize = Math.max(22, Math.min(48, 520 / text.length)) + "px";
  ["#body", "#hood", "#pocket"].forEach((s) => ($(s).style.fill = st.garment));
  $("#hood-extra").style.display = st.type === "hoodie" ? "block" : "none";
}
$("#txt").addEventListener("input", render);

document.querySelectorAll("[data-type]").forEach((b) => (b.onclick = () => {
  st.type = b.dataset.type;
  document.querySelectorAll("[data-type]").forEach((x) => x.classList.toggle("on", x === b));
  render();
}));
document.querySelectorAll("[data-size]").forEach((b) => (b.onclick = () => {
  st.size = b.dataset.size;
  document.querySelectorAll("[data-size]").forEach((x) => x.classList.toggle("on", x === b));
}));

const open = (msg) => window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
$("#send").onclick = () =>
  open(`Hi PS Printing! I'd like to order:\nItem: ${st.type === "tee" ? "T-shirt" : "Hoodie"}\nSize: ${st.size}\nGarment colour: ${st.garment}\nText: ${$("#txt").value}\nPrint colour: ${st.print}`);
$("#form").onsubmit = (e) => {
  e.preventDefault();
  open(`Hi PS Printing! I'm ${$("#f-name").value}.\nItem: ${$("#f-item").value}\nQuantity: ${$("#f-qty").value}\n${$("#f-msg").value}`);
};
$("#contact").innerHTML = INSTAGRAM ? `<a href="${INSTAGRAM}" target="_blank" rel="noopener">Instagram</a>` : "";
render();
