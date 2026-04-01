import type {SongOfDay} from "../../types/SongOfDay.ts";
import "./SongHistoryCard.css"
import {getDateNumericFromDate} from "../../utils/DateUtils.ts";
import {Link} from "react-router";

export default function SongHistoryCard({song}: {
    song: SongOfDay
}) {
    return (

        <div className="song-history-row">
            <div className="song-history-date">{getDateNumericFromDate(song.songDate)}</div>
            <Link to={`/song-a-day/${song.songDate}`} className="song-history-link">
                <div className="song-history-card">
                    <img
                        src={song.trackInformation.smallImageUrl}
                        alt="album"
                        className="song-history-album-img"
                    />

                    <div className="song-history-track-info">
                        <div className="song-history-track-name">{song.trackInformation.trackName}</div>
                        <div className="song-history-track-artist">{song.trackInformation.artistName}</div>
                    </div>

                    <div className="song-history-action">
                        <span className="song-history-action-icon">›</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}