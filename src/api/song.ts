import {api, handleError} from "./common.ts";
import type {TrackSearch} from "./search.ts";

export type SongOfDay = {
    uuid: string;
    songDate: string;
    trackInformation: TrackSearch;
    addedAtTime: string;
}

const path = "/song-a-day";

export async function getSongOfDayForAppUser() {
    try {
        const response = await api.get<SongOfDay | null>(path);
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}

export async function deleteSongOfDayForAppUser() {
    try {
        await api.delete(path);
    } catch (err: unknown) {
        handleError(err);
    }
}

export async function logSongOfDayForAppUser(spotifyId: string) {
    try {
        const response = await api.put<SongOfDay>(path, {
            spotifyId
        });
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}

export async function getUserSongHistoryForWeek() {
    try {
        const response = await api.get<SongOfDay[]>(path + "/history");
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}