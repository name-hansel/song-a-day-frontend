import {useNavigate} from "react-router";
import {formatDateForSongOfDay} from "../../../utils/DateUtils.ts";
import "./SongOfDayHeader.css"
import Button from "../../common/button/Button.tsx";

export default function SongOfDayHeader({date, fromHistory}: {
    date: string,
    fromHistory?: boolean
}) {
    const navigate = useNavigate();

    return (
        <div className="song-of-day-header">
            {
                fromHistory && <Button onClick={() => navigate(-1)} buttonText="Back"/>
            }
            <p className="song-of-day-header-date">
                {
                    formatDateForSongOfDay(date)
                }
            </p>
        </div>
    )
}