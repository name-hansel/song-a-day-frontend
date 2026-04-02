import {useNavigate} from "react-router";
import {formatDateForSongOfDay} from "../../../../utils/DateUtils.ts";
import "./SongOfDayHeader.css"

export default function SongOfDayHeader({date, fromHistory}: {
    date: string,
    fromHistory?: boolean
}) {
    const navigate = useNavigate();

    return (
        <div className="song-of-day-header">
            {
                fromHistory && <button onClick={() => navigate(-1)}>Back</button>
            }
            <p className="song-of-day-header-date">
                {
                    formatDateForSongOfDay(date)
                }
            </p>
        </div>
    )
}