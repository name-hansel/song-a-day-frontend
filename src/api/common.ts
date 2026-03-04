import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8080/api",
    withCredentials: true
});

export function handleError(err: unknown): never {
    if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        throw new Error(message ?? "DEFAULT");
    }

    throw new Error("DEFAULT");
}