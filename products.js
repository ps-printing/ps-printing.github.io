// ====== TES PRODUITS : modifie cette liste ======
// price : nombre (ex. 29.9) ou null pour "Prix sur WhatsApp"
// Photos réelles : envoie id.jpg (face) et id-dos.jpg (dos) à la racine du site.
// Dès que la photo existe, elle remplace automatiquement l’aperçu dessiné.
const PRODUCTS = [
  { id: "veste-premium", name: "Veste premium à capuche", cat: "zip", price: 19.9, isNew: true, imgs: ["veste-face.jpg", "veste-dos.jpg"], desc: "Zip intégral, poches zippées, capuche. Style, confort et qualité.", mock: { type: "zip", color: "#111111", kind: "logo", pos: "chest" } },
  { id: "hoodie-speed-club", name: "Hoodie Speed Club", cat: "hoodie", price: null, isNew: true, desc: "Grand visuel au dos, petit logo sur la poitrine.", mock: { type: "hoodie", color: "#111111", kind: "text", text: "SPEED CLUB", font: "Anton", pc: "#ffffff", pos: "back" } },
  { id: "hoodie-midnight", name: "Hoodie Midnight Garage", cat: "hoodie", price: null, isNew: true, desc: "Un hoodie noir avec un motif flamme rouge dans le dos.", mock: { type: "hoodie", color: "#111111", kind: "icon", icon: "flame", pc: "#e4161c", pos: "back" } },
  { id: "hoodie-racer-girl", name: "Hoodie Racer Girl", cat: "hoodie", price: null, isNew: true, desc: "Motif rose dans le dos, coloris noir.", mock: { type: "hoodie", color: "#111111", kind: "text", text: "Racer Girl", font: "Pacifico", pc: "#ec008c", pos: "back" } },
  { id: "tee-drive-mode", name: "T-shirt Drive Mode", cat: "tee", price: null, isNew: true, desc: "T-shirt noir, texte blanc sur le devant.", mock: { type: "tee", color: "#111111", kind: "text", text: "DRIVE MODE", font: "Bebas Neue", pc: "#ffffff", pos: "center" } },
  { id: "zip-racing-line", name: "Veste zippée Racing Line", cat: "zip", price: null, desc: "Veste anthracite avec éclair jaune sur la poitrine.", mock: { type: "zip", color: "#34363b", kind: "icon", icon: "bolt", pc: "#fff200", pos: "chest" } },
  { id: "hoodie-royal", name: "Hoodie Royal", cat: "hoodie", price: null, desc: "Bordeaux avec couronne dorée.", mock: { type: "hoodie", color: "#6b1624", kind: "icon", icon: "crown", pc: "#d9a441", pos: "center" } },
  { id: "tee-good-vibes", name: "T-shirt Good Vibes", cat: "tee", price: null, desc: "Blanc avec lettrage rouge.", mock: { type: "tee", color: "#ffffff", kind: "text", text: "Good Vibes", font: "Pacifico", pc: "#e4161c", pos: "center" } },
  { id: "tee-team", name: "T-shirt Team 2026", cat: "tee", price: null, desc: "Idéal pour une équipe ou un événement.", mock: { type: "tee", color: "#2a55c9", kind: "text", text: "TEAM 2026", font: "Bebas Neue", pc: "#ffffff", pos: "center" } }
];
