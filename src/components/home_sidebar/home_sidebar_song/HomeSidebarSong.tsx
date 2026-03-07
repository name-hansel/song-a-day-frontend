import type {SongOfDay} from "../../../api/song.ts";
import "./HomeSidebarSong.css"
import {Link} from "react-router";

export default function HomeSidebarSong({song, isLatest}: {
    song?: SongOfDay,
    isLatest: boolean
}) {
    function formatDateForSidebar(dateString: string): string {
        const date: Date = new Date(dateString);
        const day: string = date.toLocaleDateString("en-US", {day: "2-digit"});
        const month: string = date.toLocaleDateString("en-US", {month: "long"});
        return `${day} ${month}`;
    }

    if (!song) {
        return <div className="sidebar-card empty-sidebar-card"></div>;
    }

    return (
        <Link to={isLatest ? "/" : `/song-a-day/${song.songDate}`}
              className={`sidebar-card ${isLatest ? "sidebar-card-latest" : ""}`}>
            <img
                src={song.trackInformation.imageUrl}
                alt={song.trackInformation.trackName}
                className="sidebar-card-image"/>
            <div className="sidebar-card-content">
                {(
                    <>
                        <div
                            className="sidebar-card-date">{isLatest ? "Today" : formatDateForSidebar(song.songDate)}</div>
                        <div
                            className="sidebar-card-title"
                            title={song.trackInformation.trackName}
                        >
                            {song.trackInformation.trackName}
                        </div>
                    </>
                )}
            </div>
        </Link>
    )
}