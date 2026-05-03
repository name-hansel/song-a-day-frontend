import SongOfDayPageHeader from "../../../components/song_of_day/page_header/SongOfDayPageHeader.tsx";
import {Outlet, useNavigate, useParams} from "react-router";
import "./SongOfDayLayout.css"

export default function SongOfDayLayout() {
    const navigate = useNavigate();
    const {date} = useParams();

    const onSelect = (trackId: string) => {
        const path = date
            ? `/log/${trackId}?date=${date}`
            : `/log/${trackId}`;
        navigate(path);
    }

    return (
        <>
            <SongOfDayPageHeader
                onSelect={onSelect}
            />
            <div className="container">
                <Outlet/>
            </div>
        </>
    )
}