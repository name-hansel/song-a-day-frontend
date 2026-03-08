import {formatDateForSongOfDay} from "../../../../utils/DateUtils.ts";
import "./SongOfDayHeader.css"

export default function SongOfDayHeader({date}: {
    date: string
}) {
    return (
        <div className="song-of-day-header">
            <p className="song-of-day-header-date">
                {
                    formatDateForSongOfDay(date)
                }
            </p>
        </div>
    )
}