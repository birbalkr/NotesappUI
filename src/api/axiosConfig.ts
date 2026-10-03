import axios from "axios";

const axiosInstance = axios.create({
  // Authentication uses the token returned by the API and stored in localStorage.
  // Credentialed requests require a stricter CORS configuration on the API host.
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
