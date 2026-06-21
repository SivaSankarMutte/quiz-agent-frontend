import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8000"  // for Local development
  baseURL: import.meta.env.VITE_API_URL // for Production environment
});

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export default api;