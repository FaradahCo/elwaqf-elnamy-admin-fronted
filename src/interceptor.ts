import axios from "axios";
import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import environment from "./app/enviroments/environemnt.dev";

// Define response type structure
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
  success?: boolean;
  errors?: string[];
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: environment.apiUrl,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        localStorage.removeItem("token");
        window.location.href = "/auth";
        break;
      case 403:
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
