import { notification } from "antd";
import axios from "axios";
import moment from "dayjs";
import GQLQueries from "./mimic3-gQL";
import { getExternalUrl } from "../../../../../globals/settings.client";

function gQLRequest(operationName, variables, customQuery) {
  return axios(getExternalUrl("mimic3"), {
    method: "POST",
    data: {
      operationName,
      query: customQuery || GQLQueries[operationName],
      variables,
    },
  }).then((response) => {
    if (response.errors) return Promise.reject(response.errors[0]);
    return response.data;
  });
}

export function offsetDate(d) {
  return d ? moment(d).subtract(190, "years") : null;
}

export function queryPatients(params) {
  return gQLRequest("PatientList", {
    offset: (params.current - 1) * params.pageSize,
    limit: params.pageSize,
  }).then((response) => {
    const data = response.data.allPatients.nodes.map((patient) => ({
      admCount: patient.admissions.totalCount,
      dob: offsetDate(patient.dob),
      dod: offsetDate(patient.dod),
      drgCodes: patient.drgCodes,
      gender: patient.gender,
      icuStays: patient.icuStays,
      id: patient.subjectId,
    }));

    return {
      data,
      total: response.data.allPatients.totalCount,
    };
  });
}

export function getPatientData(subjectId) {
  return gQLRequest("PatientData", { subjectId: Number(subjectId) }).then(
    (response) => response.data,
  );
}

export function getPatientsDiagnosedWith(
  icd9Code,
  seqNum = 3,
  seqFilterCond = "lessThanOrEqualTo",
) {
  return gQLRequest(
    "PatientsDiagnosedWith",
    { icd9Code, seqNum },
    GQLQueries.PatientsDiagnosedWith(seqFilterCond),
  ).then((response) => {
    if (!response.data?.results?.length) {
      notification.warning({
        description: "No Patients matched the criteria",
        message: "No Results",
      });
    }
    response.data.query = { icd9Code, seqNum, seqFilterCond };
    response.data.results = response.data.results.map(({ admission, seqNum }) => ({
      ...admission,
      seqNum,
    })); // flatten the data
    return response.data;
  });
}

export function getPatientsMultiDiagnosedWith(icd9Code1, icd9Code2, seqNum = 3) {
  return gQLRequest(
    "PatientsDiagnosedWith",
    { icd9Code1, seqNum },
    GQLQueries.PatientsDiagnosedWith(seqFilterCond),
  ).then((response) => {
    if (!response.data?.results?.length) {
      notification.warning({
        description: "No Patients matched the criteria",
        message: "No Results",
      });
    }
    response.data.query = { icd9Code1, icd9Code2, seqNum };
    response.data.results = response.data.results.map(({ admission, seqNum }) => ({
      ...admission,
      seqNum,
    })); // flatten the data
    return response;
  });
}

export function getICD9CodesForDiagnosis(diagnosis, limit = 10) {
  return gQLRequest("icd9CodesForDiagnosis", { diagnosis, limit });
}
