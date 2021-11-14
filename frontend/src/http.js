import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Attribue le header Authorization avec le token à toutes les requêtes axios
http.interceptors.request.use(function (config)
{
  const token = sessionStorage.getItem('token');
  console.log(token)
  config.headers.Authorization = token ? `${token}` : 'abc';
  return config;
});

export default http;
