import Axios from "axios";
import { getAPIURL } from "../../globals/settings.client";

function makePOSTRequest(url, data = {}) {
  return Axios.post(url, data)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response)
        throw new Error(error.response.data ? JSON.stringify(error.response.data, null, 2) : error.response.statusText);
      throw error;
    });
}

export function startAnalysis() {
  return makePOSTRequest(getAPIURL("runAnalysis"));
}