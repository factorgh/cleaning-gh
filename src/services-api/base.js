import axios from "axios";

const PUBLIC_URL = import.meta.env.VITE_API_URL;

// Create a base API client with Vite's public URL and JSON content-type header.
const axiosInstance = axios.create({
  baseURL: `${PUBLIC_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
