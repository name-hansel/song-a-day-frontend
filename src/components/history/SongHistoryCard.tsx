import type {SongOfDay} from "../../types/SongOfDay.ts";

export default function SongHistoryCard({song}: {
    song: SongOfDay
}) {
    return (
        <h1>{song.trackInformation.trackName}</h1>
    )
}