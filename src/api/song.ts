import {api} from "./common.ts";
import type {TrackSearch} from "./search.ts";

export type SongOfDay = {
    uuid: string;
    songDate: string;
    trackInformation: TrackSearch;
    addedAtTime: string;
}

export async function getSongOfDayForAppUser() {
    const response = await api.get<SongOfDay | null>("/song-a-day");
    return response.data;
}