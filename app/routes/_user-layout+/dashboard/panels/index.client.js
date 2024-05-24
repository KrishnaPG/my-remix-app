import { triggerPanelAdd } from '../../../../globals';

export function triggerPanelCreateLC() {
	triggerPanelAdd({
    bringToFocus: true,
    id: "LC.AddNew",
    component: "LC.AddNew",
    name: "LC",
    config: {},
  });
}

export function triggerPanelCreateOrg() {
	triggerPanelAdd({
    bringToFocus: true,
    id: "Org.AddNew",
    component: "Org.AddNew",
    name: "Org",
    config: {},
  });
}

export function triggerPanelCreatePaymentApp() {
	triggerPanelAdd({
    bringToFocus: true,
    id: "PaymentApp.List",
    component: "PaymentApp.List",
    name: "TransacDetails",
    config: {},
  });	
}

export function triggerPanelShowPaymentApp(record) {
  triggerPanelAdd({
    bringToFocus: true,
    id: `PaymentApp.Show.${record.BillOfLadingNo}`,
    component: "PaymentApp.Show",
    name: `[${record.ApplicationNo}]: Application`,
    config: { record },
  });
}

/**
 * 
 * @param {object} record the complete application record {ApplicationNo, Drawee, ..., hsCodesInferred: [],flagResults:{ruleName:{match, result}},forcedFlags:{ruleName:{}} }
 * @param {string} scrollTo the ruleName of the flag that should be scrolled into view on mount
 */
export function triggerPanelFlagResults(record, scrollTo) {
  const id = `Flag.Results.${record.BillOfLadingNo}`;
  triggerPanelAdd({
    bringToFocus: true,
    id,
    component: "Flag.Results",
    name: `[${record.ApplicationNo}]: Flag Results`,
    config: { record, scrollTo },
  });
}

export function triggerPanelShowPatientRecord(record) {
  triggerPanelAdd({
    bringToFocus: true,
    id: `Patient.Show.${record.id}`,
    component: "Patient.Show",
    name: `[${record.id}]: Patient`,
    config: { record },
  });
}

export function triggerPanelNewDiagnosis(record) {
  triggerPanelAdd({
    bringToFocus: true,
    id: `Patient.newDiagnosis.${record.id}`,
    component: "Patient.newDiagnosis",
    name: `[${record.id}]: New Case`,
    config: { record },
  });
}