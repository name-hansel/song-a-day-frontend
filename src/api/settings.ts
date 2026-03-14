import {api, handleError} from "./common.ts";
import type {Timezone} from "../types/Timezone.ts";

export async function getTimezones() {
    try {
        const response = await api.get<Timezone[]>("/app-user/timezones");
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}

export async function saveTimezone(timezone: string) {
    try {
        const response = await api.patch<Timezone>("/app-user/timezone", {
            timezone
        });
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}