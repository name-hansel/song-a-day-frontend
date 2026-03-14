import "./HomeSidebarSong.css"
import {Link, useParams} from "react-router";
import {ArrowRight} from "lucide-react";
import {formatToReadableDate} from "../../../utils/DateUtils.ts";
import type {SongOfDay} from "../../../types/SongOfDay.ts";

export default function HomeSidebarSong({song, isLatest}: {
    song?: SongOfDay,
    isLatest: boolean
}) {
    const {date} = useParams();


    if (!song) {
        if (!isLatest) {
            return <div className="sidebar-card empty-sidebar-card"></div>;
        }

        return <Link className="sidebar-card empty-sidebar-card latest-empty"
                     to="/">
            Log song for today <ArrowRight size={16}/>
        </Link>
    }

    function isSelected() {
        return date ? date === song?.songDate : isLatest;
    }

    return (
        <Link to={isLatest ? '/' : `/song-a-day/${song.songDate}`}
              className={`sidebar-card ${isLatest ? "sidebar-card-latest" : ""} ${isSelected() ? "selected-card" : ""}`}>
            <img
                src={song.trackInformation.smallImageUrl}
                alt={song.trackInformation.trackName}
                className="sidebar-card-image"/>
            <div className="sidebar-card-content">
                {(
                    <>
                        <div
                            className="sidebar-card-date">{isLatest ? "Today" : formatToReadableDate(song.songDate)}</div>
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