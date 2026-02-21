import axios from "axios";
import type {AppUser} from "../types/AppUser.ts";

export const api = axios.create({baseURL: "http://127.0.0.1:8080/api", withCredentials: true});

let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken() {
    if (!refreshPromise) {
        refreshPromise = api
            .post("/auth/refresh-access-token")
            .then(() => {
            })
            .finally(() => {
                refreshPromise = null;
            });
    }
    return refreshPromise;
}

api.interceptors.response.use(
    res => res,
    async error => {
        const original = error.config;
        if (original._retry || original.url?.includes("/auth/refresh-access-token") || error.response?.data?.message === "USER_NOT_LOGGED_IN")
            return Promise.reject(error);

        if (!error.response || error.response.status !== 401)
            return Promise.reject(error);

        original._retry = true;

        try {
            await refreshAccessToken();
            return api(original);
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

export const getAppUser = () => api.get<AppUser>("/auth/me");
export const logoutAppUser = () => api.post("/auth/logout");