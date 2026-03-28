import type {SongOfDay} from "./SongOfDay.ts";

export interface SongHistory {
    history: SongOfDay[];
    nextDate: string;
    hasMore: boolean;
}