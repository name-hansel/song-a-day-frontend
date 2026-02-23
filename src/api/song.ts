import {api} from "./common.ts";
import type {TrackSearch} from "./search.ts";

export type SongOfDay = {
    uuid: string;
    songDate: string;
    trackInformation: TrackSearch;
    addedAtTime: string;
}

const path = "/song-a-day";

export async function getSongOfDayForAppUser() {
    const response = await api.get<SongOfDay | null>(path);
    return response.data;
}

export async function deleteSongOfDayForAppUser() {
    await api.delete(path);
}

export async function logSongOfDayForAppUser(spotifyId: string) {
    const response = await api.put<SongOfDay>(path, {
        spotifyId
    });

    return response.data;
}