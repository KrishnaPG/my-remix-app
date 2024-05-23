const frequentBuys = [
  {
    item: "Tottle Eaze Drop Lit Glow Enhance Dir Deco Tottle Cap Eaze Rop Lit All Over Glow Enhancer Plts",
    weight: 10962,
    country: "pt",
  },
  {
    item: "Cap Body Pofb Fty Plts",
    weight: 774,
    country: "ae",
  },
  {
    item: "Fty Cap Body Plts",
    weight: 692,
    country: "sg",
  },
  {
    item: "Fty Vial Fenty Eau Parfum Rollerbal Plts",
    weight: 511,
    country: "fr",
  },
  {
    item: "Cosmetics",
    weight: 306,
    country: "us",
  },
];
const frequentBuys_10747891 = [
  {
    item: "ESPO CRUDE OIL, BRL",
    weight: 81600,
    country: "fr",
  },
  {
    item: "LUBRICATING OIL ADDITIVE, NON-HAZARDOUS, NOS",
    weight: 64387,
    country: "pt",
  },

  {
    item: "PLASTIC RESIN ADDITIVES, NON-HAZARDOUS, NOS",
    weight: 47832,
    country: "sg",
  },
  {
    item: "RESIN, NOS",
    weight: 3200,
    country: "ae",
  },
  {
    item: "ESPO BLEND CRUDE",
    weight: 3060,
    country: "us",
  },
];
const frequentBuys_20452389 = [
  {
    item: "LOW SULPHUR FUEL OIL",
    weight: 81600,
    country: "fr",
  },
  {
    item: "PAINTS, PIGMENTS AND PUTTIES; HAZARDOUS, NOS",
    weight: 64387,
    country: "pt",
  },
  {
    item: "PARAXYLENE, BRL",
    weight: 47832,
    country: "sg",
  },
  {
    item: "HIGH SULPHUR FUEL OIL",
    weight: 3560,
    country: "us",
  },
  {
    item: "CHEMICALS, HAZARDOUS, NOS",
    weight: 3200,
    country: "ae",
  },
];

export function getFrequentBuys(r) {
  if (r.ApplicationNo == 10747891) return frequentBuys_10747891;
  if (r.ApplicationNo == 20452389) return frequentBuys_20452389;
  return frequentBuys;
}

const frequentSuppliers = [
  {
    supplier: "International Cosmetic Suppliers ",
    count: 17,
    country: "tw",
  },
  {
    supplier: "Bao Sheng",
    count: 6,
    country: "cn",
  },
  {
    supplier: "Art Cosmetics ",
    count: 2,
    country: "it",
  },
];
const frequentSuppliers_10747891 = [
  {
    supplier: "International Oil Suppliers",
    count: 17,
    country: "tw",
  },
  {
    supplier: "Bao Sheng",
    count: 6,
    country: "cn",
  },
  {
    supplier: "Art Cosmetics ",
    count: 2,
    country: "it",
  },
];
const frequentSuppliers_20452389 = [
  {
    supplier: "Surface Chemistry",
    count: 17,
    country: "tw",
  },
  {
    supplier: "Star Chemicals",
    count: 6,
    country: "cn",
  },
  {
    supplier: "Oil House Inc",
    count: 2,
    country: "it",
  },
];
export function getFrequentSuppliers(r) {
  if (r.ApplicationNo == 10747891) return frequentSuppliers_10747891;
if (r.ApplicationNo == 20452389) return frequentSuppliers_20452389;
  return frequentSuppliers;
}

const frequentSells = [
  {
    item: "Cosmetics",
    weight: 1735,
    country: "sg",
  },
  {
    item: "Fty Vial Fenty Eau Parfum Rollerbal Plts",
    weight: 705,
    country: "fr",
  },
  {
    item: "Fty Cap Body Plts",
    weight: 676,
    country: "pt",
  },
  {
    item: "Cap Body Pofb Fty Plts",
    weight: 318,
    country: "ae",
  },
  {
    item: "Tottle Eaze Drop Lit Glow Enhance Dir Deco Tottle Cap Eaze Rop Lit All Over Glow Enhancer Plts",
    weight: 278,
    country: "ru",
  },
];
const frequentSells_20452389 = [
  {
    item: "LOW SULPHUR FUEL OIL",
    weight: 81600,
    country: "ae",
  },
  {
    item: "PAINTS, PIGMENTS AND PUTTIES; HAZARDOUS, NOS",
    weight: 64387,
    country: "sg",
  },
  {
    item: "PARAXYLENE, BRL",
    weight: 47832,
    country: "pt",
  },
  {
    item: "CHEMICALS, HAZARDOUS, NOS",
    weight: 3200,
    country: "fr",
  },
  {
    item: "HIGH SULPHUR FUEL OIL",
    weight: 2780,
    country: "ru",
  },
];
export function getFrequentSells(r) {
  if (r.ApplicationNo == 20452389) return frequentSells_20452389;
  return frequentSells;
}

const frequentBuyers = [
  {
    buyer: "True Botanicals ",
    count: 194,
    country: "us",
  },
  {
    buyer: "Beauticontrol",
    count: 6,
    country: "us",
  },
  {
    buyer: "Inmar Supply Chain Solutions",
    count: 1,
    country: "us",
  },
];
export function getFrequentBuyers(r) {
  return frequentBuyers;
}
