import type {TrackSearch} from "./TrackSearch.ts";

export type SongOfDay = {
    uuid: string;
    songDate: string;
    trackInformation: TrackSearch;
    addedAtTime: string;
    memory: string;
}