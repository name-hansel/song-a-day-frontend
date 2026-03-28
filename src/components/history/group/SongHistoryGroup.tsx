import type {SongOfDay} from "../../../types/SongOfDay.ts";
import SongHistoryCard from "../SongHistoryCard.tsx";
import "./SongHistoryGroup.css"

export default function SongHistoryGroup({group}: {
    group: { month: string; songs: SongOfDay[] }
}) {
    return <div className="month-group">
        <div className="month-header">
            <span>{group.month}</span>
        </div>
        <div className="month-entries">
            {
                group.songs.map(song => (
                    <SongHistoryCard song={song}/>
                ))
            }
        </div>
    </div>

}