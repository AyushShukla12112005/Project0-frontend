import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${API}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors safely
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const requestUrl = err.config?.url || "";

    // Only handle 401 errors from backend API
    if (
      err.response?.status === 401 &&
      requestUrl.startsWith(`${API}/api`) // <-- VERY IMPORTANT
    ) {
      const isAuthRequest =
        requestUrl.includes("/auth/login") ||
        requestUrl.includes("/auth/register");

      if (!isAuthRequest) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default api;