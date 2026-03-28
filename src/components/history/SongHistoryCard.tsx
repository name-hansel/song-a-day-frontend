import type {SongOfDay} from "../../types/SongOfDay.ts";
import "./SongHistoryCard.css"
import {getDateNumericFromDate} from "../../utils/DateUtils.ts";

export default function SongHistoryCard({song}: {
    song: SongOfDay
}) {
    return (
        <div className="entry-row">
            <div className="entry-date">{getDateNumericFromDate(song.songDate)}</div>
            <div className="entry-card">
                <img
                    src={song.trackInformation.smallImageUrl}
                    alt="album"
                    className="entry-album"
                />

                <div className="entry-info">
                    <div className="entry-track">{song.trackInformation.trackName}</div>
                    <div className="entry-artist">{song.trackInformation.artistName}</div>
                </div>

                <div className="entry-action">
                    <span className="entry-icon">›</span>
                </div>
            </div>
        </div>
    )
}