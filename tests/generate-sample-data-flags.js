// This code transforms the below input json into grouped object form (where 
// all records that belong to one application are grouped under one key, which 
// make it easy to lookup).
// The input[] json has been generated with csv to json online from the sample data csv file.
const input = [
  {
    "ApplicationNo": 747891,
    "RedFlag": "B1",
    "Desc": "Trade counterparty involved appears to be engaged in a different business activity",
    "RedFlagDetail": "Blue Sky has been exporting textile and electronic goods for the last 3 yrs and never traded fossil fuel products"
  },
  {
    "ApplicationNo": 747891,
    "RedFlag": "B2",
    "Desc": "Discrepancy in the port of loading stated on the Bill of Lading and on IMB",
    "RedFlagDetail": "Port of Loading stated in Invoice was PORT KOZMINO but Bill of Lading states Port of Loading as KARACHI"
  },
  {
    "ApplicationNo": 747891,
    "RedFlag": "B3",
    "Desc": "Shipment routes involved a sanctioned country",
    "RedFlagDetail": "Vessel VF TANKER-18 made a port of call at sanctioned Novorossiysk Commercial Sea Port (NCSP)"
  },
  {
    "ApplicationNo": 356987,
    "RedFlag": "B4",
    "Desc": "A customer deviates significantly from its historical pattern of trade activity",
    "RedFlagDetail": "Flying Tiger Ventures' total export amount is 80% higher than historical trade average"
  },
  {
    "ApplicationNo": 356987,
    "RedFlag": "B5",
    "Desc": "Customer conducts business in jurisdictions that are at higher risk",
    "RedFlagDetail": "Grimly Partners has operating facility in Myanmar (FATF BlackList)"
  },
  {
    "ApplicationNo": 356987,
    "RedFlag": "B6",
    "Desc": "Obvious over or under pricing of goods",
    "RedFlagDetail": "Trade unit price of PRESSURIZED LPG MIXTURE is more than 200% of last traded price"
  },
  {
    "ApplicationNo": 452389,
    "RedFlag": "B7",
    "Desc": "Transaction involves obvious dual use goods",
    "RedFlagDetail": "Possible dual use good is being traded - THIODIGLYCOL"
  },
  {
    "ApplicationNo": 452389,
    "RedFlag": "B6",
    "Desc": "Obvious over or under pricing of goods",
    "RedFlagDetail": "Trade unit price of THIODIGLYCOL is more than 200% of last traded price"
  },
  {
    "ApplicationNo": 347890,
    "RedFlag": "B4",
    "Desc": "A customer deviates significantly from its historical pattern of trade activity",
    "RedFlagDetail": "Crawling Mantis' total export amount is 140% higher than historical trade average"
  },
  {
    "ApplicationNo": 347890,
    "RedFlag": "B6",
    "Desc": "Obvious over or under pricing of goods",
    "RedFlagDetail": "Trade unit price of SONGKHLA CRUDE OIL is more than 100% of last traded price"
  },
  {
    "ApplicationNo": 458956,
    "RedFlag": "B3",
    "Desc": "Shipment routes involved a sanctioned country",
    "RedFlagDetail": "Vessel SEAQT-23 made a port of call at sanctioned PORT BANDAR ABBAS in Iran"
  },
  {
    "ApplicationNo": 458956,
    "RedFlag": "B2",
    "Desc": "Discrepancy in the port of loading stated on the Bill of Lading and on IMB",
    "RedFlagDetail": "Port of Loading stated in Invoice was PORT SHANGHAI but Bill of Lading states Port of Loading as PORT BANDAR ABBAS"
  },
  {
    "ApplicationNo": 458956,
    "RedFlag": "B8",
    "Desc": "Multiple financing of same goods",
    "RedFlagDetail": "Possible identical invoice has been presented at another FI - SWIFT Code DIBBSGSG"
  },
  {
    "ApplicationNo": 527843,
    "RedFlag": "B5",
    "Desc": "Customer conducts business in jurisdictions that are at higher risk",
    "RedFlagDetail": "Sims Export has operating facility in Iran (FATF BlackList)"
  },
  {
    "ApplicationNo": 527843,
    "RedFlag": "B4",
    "Desc": "A customer deviates significantly from its historical pattern of trade activity",
    "RedFlagDetail": "Screeching Eagle's total export amount is 320% higher than historical trade average"
  },
  {
    "ApplicationNo": 527843,
    "RedFlag": "B1",
    "Desc": "Customer appears to be engaged in a different business activity",
    "RedFlagDetail": "Screeching Eagle Inc has an industry classification of 'IT Services' but are trading in fossial fuel products"
  },
  {
    "ApplicationNo": 487651,
    "RedFlag": "B4",
    "Desc": "A customer deviates significantly from its historical pattern of trade activity",
    "RedFlagDetail": "Moving Crane's total export volume is 240% higher than historical trade average"
  },
  {
    "ApplicationNo": 327865,
    "RedFlag": "B5",
    "Desc": "Customer conducts business in jurisdictions that are at higher risk",
    "RedFlagDetail": "Green Cloud Co has operating facility in Croatia (FATF GreyList)"
  },
  {
    "ApplicationNo": 327865,
    "RedFlag": "B3",
    "Desc": "Shipment routes involved a sanctioned country",
    "RedFlagDetail": "Vessel AVQTS-18 made a port of call at sanctioned PORT PRIMORSK in Russia"
  },
  {
    "ApplicationNo": 652387,
    "RedFlag": "B5",
    "Desc": "Customer conducts business in jurisdictions that are at higher risk",
    "RedFlagDetail": "Black Gold Co has operating facility in Tanzania (FATF GreyList)"
  },
  {
    "ApplicationNo": 652387,
    "RedFlag": "B4",
    "Desc": "A customer deviates significantly from its historical pattern of trade activity",
    "RedFlagDetail": "Moonshine Inc's total export amount is 250% higher than historical trade average"
  },
  {
    "ApplicationNo": 652387,
    "RedFlag": "B3",
    "Desc": "Shipment routes involved a sanctioned country",
    "RedFlagDetail": "Vessel SEAFG-3 made a port of call at sanctioned PORT KALININGRAD in Russia"
  }
];

const obj = input.reduce((old, r) => { 
  const appObj = old[r.ApplicationNo] || {};
  appObj[r.RedFlag] = r;
  old[r.ApplicationNo] = appObj;
  return old;
}, {});

console.log(JSON.stringify(obj, null, 2));