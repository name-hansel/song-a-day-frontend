import axios from "axios";
import type {AppUser} from "../types/AppUser.ts";

const REFRESH_TOKEN_API_URL = "/auth/refresh-access-token";
const GET_CURRENT_USER_API_URL = "/app-user/me";
const LOGOUT_API_URL = "/auth/logout";

export const api = axios.create({baseURL: "http://127.0.0.1:8080/api", withCredentials: true});

let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken() {
    if (!refreshPromise) {

        refreshPromise = api
            .post(REFRESH_TOKEN_API_URL)
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
        if (original._retry || original.url?.includes(REFRESH_TOKEN_API_URL) || error.response?.data?.message === "USER_NOT_LOGGED_IN")
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

export const getAppUser = () => api.get<AppUser>(GET_CURRENT_USER_API_URL);
export const logoutAppUser = () => api.post(LOGOUT_API_URL);