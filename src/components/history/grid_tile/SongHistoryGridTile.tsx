import type {SongOfDay} from "../../../types/SongOfDay.ts";
import {Link} from "react-router";
import {getDateNumericFromDate} from "../../../utils/DateUtils.ts";
import {TextIcon} from "lucide-react";
import "./SongHistoryGridTile.css"

export default function SongHistoryGridTile({song}: { song: SongOfDay }) {
    // TODO: pass history link for "Back" button instead of only boolean
    return <Link to={`/song-a-day/${song.songDate}`} className="song-history-tile-link" state={{fromHistory: true}}>
        <div className="song-history-tile">
            <div className="song-history-tile-date-div">
                {getDateNumericFromDate(song.songDate)}
                <div className="song-history-tile-footer">
                    {
                        song.memory && <TextIcon className="song-history-tile-icon" size={14}/>
                    }
                </div>
            </div>
            <img src={song.trackInformation.mediumImageUrl} alt="album" className="song-history-tile-img"/>
            <div className="song-history-tile-info">
                <div className="song-history-tile-name">
                    {song.trackInformation.trackName}
                </div>
                <div className="song-history-tile-artist">
                    {song.trackInformation.artistName}
                </div>
            </div>
        </div>
    </Link>
}