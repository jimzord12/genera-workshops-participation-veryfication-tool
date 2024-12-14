import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_EXPRESS_SERVER_URL, // Use your VITE env variable
  timeout: 5000, // Optional: timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// // Optionally add interceptors for request/response
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Add authorization token or other custom logic
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally (e.g., log out user on 401)
//     if (error.response?.status === 401) {
//       console.error("Unauthorized - Redirecting to login");
//       // Optional: Redirect to login or show notification
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
