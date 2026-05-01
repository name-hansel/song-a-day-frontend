import type {SongOfDay} from "../../../types/SongOfDay.ts";
import SongHistoryListCard from "../list_card/SongHistoryListCard.tsx";
import "./SongHistoryGroup.css"
import SongHistoryGridTile from "../grid_tile/SongHistoryGridTile.tsx";

export default function SongHistoryGroup({group, view}: {
    group: { month: string; songs: SongOfDay[] },
    view: "list" | "grid"
}) {
    return <div className="month-group">
        <div className="month-header">
            <span>{group.month}</span>
        </div>
        <div className={`month-entries ${view}`}>
            {
                group.songs.map(song => view === "list" ? (
                        <SongHistoryListCard song={song}/>) : (
                        <SongHistoryGridTile song={song}/>
                    )
                )
            }
        </div>
    </div>

}