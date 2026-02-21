import axios from "axios";
import type {AppUser} from "../types/AppUser.ts";

export const api = axios.create({baseURL: "http://127.0.0.1:8080/api", withCredentials: true});

export const getAppUser = () => api.get<AppUser>("/auth/me");
export const logout = () => api.get("/auth/logout");