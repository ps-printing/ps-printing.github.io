// ====== TES PRODUITS : modifie cette liste ======
// price : nombre (ex. 29.9) ou null pour "Prix sur WhatsApp"
// imgs : photos du produit, la première = face, la deuxième = dos (mets les fichiers à la racine du site)
const PRODUCTS = [
  { id: "veste-premium", name: "Veste premium à capuche", cat: "zip", price: 19.9, isNew: true, imgs: ["veste-face.jpg", "veste-dos.jpg"], desc: "Zip intégral, poches zippées, capuche. Style, confort et qualité." },
  { id: "hoodie-bmw-m4", name: "Hoodie BMW M4", cat: "hoodie", price: null, isNew: true, imgs: ["bmw-m4-face.jpg", "bmw-m4-dos.jpg"], desc: "Hoodie noir : petit logo BMW sur la poitrine, grand visuel BMW M4 « The Ultimate Driving Machine » dans le dos." },
  { id: "hoodie-bmw-girl", name: "Hoodie BMW Girl (rose)", cat: "hoodie", price: null, isNew: true, imgs: ["bmw-girl-face.jpg", "bmw-girl-dos.jpg"], desc: "Hoodie noir : logo rose sur la poitrine, grand visuel BMW rose avec papillons dans le dos." },
  { id: "hoodie-porsche-911", name: "Hoodie Porsche 911 GT3 RS", cat: "hoodie", price: null, isNew: true, imgs: ["porsche-911-face.jpg", "porsche-911-dos.jpg"], desc: "Hoodie oversize noir : texte Porsche sur le devant, visuel 911 GT3 RS dans le dos." },
  { id: "zip-motorsport", name: "Vestes zippées Motorsport", cat: "zip", price: null, isNew: true, imgs: ["zip-motorsport-face.jpg"], desc: "Vestes zippées noires avec logos sport automobile : BMW M, Mercedes AMG, Porsche, Audi Sport, Volkswagen GTI, Renault Sport. Dis-nous la marque que tu veux." }
];
