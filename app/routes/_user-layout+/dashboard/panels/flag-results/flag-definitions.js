export default [
  {
    category: "Buyer",
    ruleName: "B1.1",
    notes: "Verify the entity details",
  },
  {
    category: "Buyer",
    ruleName: "B1.2",
    notes: "Verify if the entity is sanctioned",
  },
  {
    category: "Buyer",
    ruleName: "B1.3",
    notes: "Verify if the entity operates in sanctioned location",
  },

  {
    category: "Seller",
    ruleName: "S1.1",
    notes: "Verify the entity details",
  },
  {
    category: "Seller",
    ruleName: "S1.2",
    notes: "Verify if the entity is sanctioned",
  },
  {
    category: "Seller",
    ruleName: "S1.3",
    notes: "Verify if the entity operates in sanctioned location",
  },

  {
    category: "Transaction",
    ruleName: "T1.1",
    notes: "Are goods matching the Buyer's business activity?",
  },
  {
    category: "Transaction",
    ruleName: "T1.2",
    notes: "Are goods matching the Seller's business activity?",
  },
  {
    category: "Transaction",
    ruleName: "T2",
    notes: "Check for Dual-use goods",
  },
  {
    category: "Transaction",
    ruleName: "T3",
    notes: "Verify if the price is within the market range",
  },
  {
    category: "Transaction",
    ruleName: "T4",
    notes: "Verify the relation between Buyer and Seller",
  },
  {
    category: "Port",
    ruleName: "P1",
    notes: "Verify if the port of loading is sanctioned",
  },
  {
    category: "Port",
    ruleName: "P2",
    notes: "Verify if the port of discharge is sanctioned",
  },

  {
    category: "BL",
    ruleName: "BL1",
    notes: "Check for duplicates on the Blockchain network",
  },
  {
    category: "BL",
    ruleName: "BL2.1",
    notes: "Verify if the port of loading details are matching with IMB",
  },
  {
    category: "BL",
    ruleName: "BL2.2",
    notes: "Verify if the port of discharge details are matching with IMB",
  },

  {
    category: "ShipRoute",
    ruleName: "R1",
    notes: "Check if the ship route involves a sanctioned country",
  },
  // {
  //   category: "Seller",
  //   ruleName: "B1",
  //   notes: "Trade counter-party involved appears to be engaged in a different business activity",
  //   result: "Pass",
  // },
  // {
  //   category: "Port",
  //   ruleName: "B2",
  //   notes: "Discrepancy in the port of loading stated on the Bill of Lading and on IMB",
  //   result: "Warn",
  // },
  // { category: "ShipRoute", ruleName: "B3", notes: "Shipment routes involved a sanctioned country", result: "Fail" },
];
