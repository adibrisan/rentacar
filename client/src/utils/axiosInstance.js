import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (config.method === "get" && config.data) {
    config.params = config.data;
    delete config.data;
  }
  return config;
});

export default api;
