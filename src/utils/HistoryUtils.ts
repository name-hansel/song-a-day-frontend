import type {SongOfDay} from "../types/SongOfDay.ts";

export function groupSongHistoryByMonth(songHistory: SongOfDay[]) {
    const map = new Map<string, SongOfDay[]>();

    songHistory.forEach((song) => {
        const date = new Date(song.songDate);
        const month = date.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
        });

        if (!map.has(month)) {
            map.set(month, []);
        }

        map.get(month)!.push(song);
    });

    return Array.from(map.entries()).map(([month, songs]) => ({month, songs}));
}