import type {SongOfDay} from "../../../api/song.ts";
import "./HomeSidebarSong.css"

export default function HomeSidebarSong({song, isLatest}: {
    song?: SongOfDay,
    isLatest: boolean
}) {
    return (
        <div
            className={`sidebar-card ${isLatest ? "sidebar-card-latest" : ""}`}>
            {
                song && <>
                    <img
                        src={song.trackInformation.imageUrl}
                        alt={song.trackInformation.trackName}
                        className="sidebar-card-image"/>
                    <div className="sidebar-card-content">
                        {(
                            <>
                                <div
                                    className="sidebar-card-date">{isLatest ? "Today" : song.songDate}</div>
                                <div
                                    className="sidebar-card-title"
                                    title={song.trackInformation.trackName}
                                >
                                    {song.trackInformation.trackName}
                                </div>
                            </>
                        )}
                    </div>
                </>
            }
        </div>
    )
}