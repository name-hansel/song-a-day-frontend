import SongOfDayPageHeader from "../../../components/song_of_day_page_header/SongOfDayPageHeader.tsx";
import SongOfDay from "../../../components/song_of_day/SongOfDay.tsx";
import {useSong} from "../../../context/SongContext.tsx";
import {useNavigate, useParams} from "react-router";
import "./SongOfDayLayout.css"

export default function SongOfDayLayout() {
    const {song} = useSong();
    const {date} = useParams();
    const navigate = useNavigate();

    const onSelect = (trackId: string) => {
        navigate(`/log/${trackId}`);
    }

    return (
        <>
            <SongOfDayPageHeader
                currentDate={date ?? song?.songDate}
                onSelect={onSelect}
            />
            <div className="container">
                <SongOfDay/>
            </div>
        </>
    )
}