import type {SongOfDay} from "../../../api/song.ts";
import "./HomeSidebarSong.css"

export default function HomeSidebarSong({song}: {
    song: SongOfDay
}) {
    return (
        <div className="sidebar-card">
            <img
                src={song.trackInformation.imageUrl}
                alt={song.trackInformation.trackName}
                className="sidebar-card-image"
            />

            <div className="sidebar-card-content">
                <div className="sidebar-card-title">
                    {song.trackInformation.trackName}
                </div>

                <div className="sidebar-card-date">
                    {song.songDate}
                </div>
            </div>
        </div>
    )
}