import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import i18n from "@/lib/i18n";
import { ApiError } from "@/types/api";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status ?? (error.code === "ECONNABORTED" ? 408 : 0);
    const message =
      status === 0
        ? i18n.t("common.networkError")
        : (error.response?.data?.message ??
          error.message ??
          i18n.t("common.unexpectedError"));

    const isAuthMe = error.config?.url?.includes("/auth/me");

    if (status === 401 && !isAuthMe) {
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    return Promise.reject(new ApiError(message, status));
  },
);

export async function apiGet<T>(url: string, config?: InternalAxiosRequestConfig) {
  const { data } = await apiClient.get<T>(url, config);
  return data;
}

export async function apiPost<T>(
  url: string,
  body?: unknown,
  config?: InternalAxiosRequestConfig,
) {
  const { data } = await apiClient.post<T>(url, body, config);
  return data;
}

export async function apiPut<T>(
  url: string,
  body?: unknown,
  config?: InternalAxiosRequestConfig,
) {
  const { data } = await apiClient.put<T>(url, body, config);
  return data;
}

export async function apiPatch<T>(
  url: string,
  body?: unknown,
  config?: InternalAxiosRequestConfig,
) {
  const { data } = await apiClient.patch<T>(url, body, config);
  return data;
}

export async function apiDelete<T>(url: string, config?: InternalAxiosRequestConfig) {
  const { data } = await apiClient.delete<T>(url, config);
  return data;
}
