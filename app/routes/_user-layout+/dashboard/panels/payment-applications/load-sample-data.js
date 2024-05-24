import axios from "axios";
export function loadSampleData() {
  return axios.get("/api/applications").then(x => x.data).then(data => {
    return data.map(d => {
      d.Amount = Math.trunc(d.Amount % 10**6); // fix the amount to be less than 7 digits
      return d;
    });
  });
}