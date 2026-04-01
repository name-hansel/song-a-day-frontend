import {api, handleError} from "./common.ts";
import type {Timezone} from "../types/Timezone.ts";
import type {AppUser} from "../types/AppUser.ts";

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
        const response = await api.patch<AppUser>("/app-user/timezone", {
            timezone
        });
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}