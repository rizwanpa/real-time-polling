export default {
  API_SERVER: "http://localhost:3030"
};

const HOST_NAME = window && window.location && window.location.hostname;
console.log('HOST_NAME',HOST_NAME, (HOST_NAME.match(/localhost/) || {}));
let api_url = "http://13.233.122.152/api";
let env = "Prod";
let base_url = 'http://13.233.122.152';
let socket_path = '/api/socket.io';
let socket_url = base_url;
switch (HOST_NAME) {
  case (HOST_NAME.match(/localhost/) || {}).input:
    env = "Local";
    api_url = 'http://localhost:3030';
    base_url = 'http://localhost:3000';
    socket_path = '/socket.io';
    socket_url = api_url;
    break;
  default:
    env = "Prod";
    api_url = 'http://13.233.122.152/api';
    base_url = 'http://13.233.122.152';
    socket_path = '/api/socket.io';
    socket_url = base_url;
    break;
}


export const BASE_URL = base_url;
export const API_SERVER = api_url;
export const SOCKET_PATH = socket_path;
export const SOCKET_URL = socket_url;
console.log(BASE_URL, API_SERVER, SOCKET_PATH, SOCKET_URL);