export default {
  API_SERVER: "http://localhost:3030"
};

const HOST_NAME = window && window.location && window.location.hostname;
let api_url = "";
let env = "Local";
let base_url = 'http://localhost:3000';
switch (HOST_NAME) {
  case (HOST_NAME.match(/-localhost/) || {}).input:
    env = "Local";
    api_url = 'http://localhost:3030';
    base_url = 'http://localhost:3000';
  default:
    env = "Local";
    api_url = 'http://localhost:3030';
    base_url = 'http://localhost:3000';
    break;
}


export const BASE_URL = base_url;
export const API_SERVER = api_url;