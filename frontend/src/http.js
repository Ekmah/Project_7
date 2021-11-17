import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Attribue le header Authorization avec le token à toutes les requêtes axios
http.interceptors.request.use(function (config)
{
  const token = sessionStorage.getItem('token');
  config.headers.Authorization = token ? `${token}` : 'abc';
  console.log("method", config.method)
  if (config.method == 'delete' || config.method == 'put') {
    const role = sessionStorage.getItem('role');
    config.data['role'] = role;
  }
  if (config.method != 'get') {
    config.data['userId'] = sessionStorage.getItem('id');
  }
  
  
  return config;
});

export default http;
