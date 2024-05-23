import axios from 'axios';

const sessionid = "8a8eb96e-3cce-40d2-9a5a-ca77547dedbe";

export function postAPIRequest(url, body, cancelPrevious) {
    return axios
      .post(url, body, {headers: {sessionid}})
      .then((response) => response.data)
      .catch((error) => {
        if (error.response)
          throw new Error(error.response.data ? JSON.stringify(error.response.data, null, 2) : error.response.statusText);
        throw error;
      });
  }

export function hsClassify(params) {
    return postAPIRequest("https://classifierapi.trademo.com/api/v1/classify", params);
}

export function hsValidate(params) {
    return postAPIRequest("https://compliance.trademo.com/trademo/tc/api/v1/validateHscode", params);
}

// returns if there is any restriction on the Import/Export of a HSCode item for a given country
export function hsControls(params) {
    return postAPIRequest("https://compliance.trademo.com/trademo/tc/api/v1/getData", params);
}