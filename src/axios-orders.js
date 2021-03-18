import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/v1/',
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true
});

export default instance