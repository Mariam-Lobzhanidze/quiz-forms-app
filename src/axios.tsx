import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL;

const httpClient = axios.create({
  baseURL: API_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// httpClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       const message = error.response.data.message;

//       if (message === "Token has expired. Please log in again.") {
//         localStorage.removeItem("token");
//         localStorage.removeItem("activeUserId");
//         window.location.href = "/login";
//       } else {
//         console.error(message);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default httpClient;
