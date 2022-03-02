const socketApiBaseUrl =
  "http://localhost:8081" || process.env.REACT_APP_SOCKETAPIBASEURL || "";
const BASEURL = process.env.REACT_APP_BASEURL || "";

// console.log({ socketApiBaseUrl });

export { BASEURL, socketApiBaseUrl };
