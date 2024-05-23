import axios from 'axios';
import { getExternalUrl } from "../../globals/settings.client";

const instance = axios.create({
  baseURL: getExternalUrl("gleif"),
  headers: {
    Accept: "application/vnd.api+json",
  },
  maxBodyLength: Infinity,
  timeout: 5000,
});

export function getAPIRequest(url, cancelPrevious) {
  return instance
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response)
        throw new Error(error.response.data ? JSON.stringify(error.response.data, null, 2) : error.response.statusText);
      throw error;
    });
}

export default instance;