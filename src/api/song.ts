import {api, handleError} from "./common.ts";
import type {SongOfDay} from "../types/SongOfDay.ts";
import type {SongHistory} from "../types/SongHistory.ts";

const path = "/song-a-day";

export async function getSongOfDayForAppUser(date?: string) {
    try {
        const response = await api.get<SongOfDay | null>(`${path}${date ? `/${date}` : ''}`);
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

export async function logSongOfDayForAppUser(spotifyId: string, memory: string) {
    try {
        const response = await api.put<SongOfDay>(path, {
            spotifyId, memory
        });
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}

export async function getUserSongHistoryForWeek() {
    try {
        const response = await api.get<SongOfDay[]>(`${path}/weekly-history`);
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}

export async function updateMemoryForSong(songUuid: string, updatedMemory: string | null) {
    try {
        const response = await api.patch<SongOfDay>(`${path}/memory/${songUuid}`, {
            updatedMemory
        });
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}

export async function getUserSongHistoryInitial() {
    try {
        const response = await api.get<SongHistory>(`${path}/history`);
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}

export async function getUserSongHistoryNext(beforeDate: string) {
    try {
        const response = await api.get<SongHistory>(`${path}/history`, {
            params: {beforeDate}
        });
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}

export async function getUserSongHistoryPrevious(afterDate: string) {
    try {
        const response = await api.get<SongHistory>(`${path}/history`, {
            params: {afterDate}
        });
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}