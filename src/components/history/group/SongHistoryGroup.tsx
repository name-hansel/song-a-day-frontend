import type {SongOfDay} from "../../../types/SongOfDay.ts";
import SongHistoryCard from "../SongHistoryCard.tsx";

export default function SongHistoryGroup({group}: {
    group: { month: string; songs: SongOfDay[] }
}) {
    return <div>
        <h3>{group.month}</h3>
        {
            group.songs.map(song => (
                <SongHistoryCard song={song}/>
            ))
        }
    </div>
}