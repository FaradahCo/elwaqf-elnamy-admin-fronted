import { message } from "antd";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import environment from "./app/enviroments/environemnt.dev";
import { triggerForceLogoutForInterceptor } from "@shared/services/sharedService";

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
    const token = localStorage.getItem("ADMIN_token");
    const teamId = localStorage.getItem("teamId");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (teamId) {
      config.headers["X-Team-Id"] = teamId;
    }

    // Inject API key
    config.headers["X-API-Key"] = "Tpvra20!3o#ynyq";

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Only show success message for non-GET requests
    if (response.config.method?.toLowerCase() !== "get") {
      message.success(response.data.message || "تمت العملية بنجاح");
    }
    return response.data;
  },
  (error) => {
    switch (error.response?.status) {
      case 401:
        triggerForceLogoutForInterceptor();
        break;
      case 403:
        message.error(error.response?.data?.message || error.message);
        break;
      case 404:
        break;
      case 422:
        message.error(error.response?.data?.message || error.message);
        break;

      case 429:
        message.error(error.response?.data?.message || error.message);
        break;
      case 500:
        break;
      default:
        break;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
