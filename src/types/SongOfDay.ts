import type {TrackSearch} from "./TrackSearch.ts";

export type SongOfDay = {
    uuid: string;
    songDate: string;
    trackInformation: TrackSearch;
    addedAtTime: string;
    updatedAtTime: string;
    memory: string;
}