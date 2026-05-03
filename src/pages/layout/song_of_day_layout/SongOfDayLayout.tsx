import SongOfDayPageHeader from "../../../components/song_of_day_page_header/SongOfDayPageHeader.tsx";
import {Outlet, useNavigate} from "react-router";
import "./SongOfDayLayout.css"

export default function SongOfDayLayout() {
    const navigate = useNavigate();

    const onSelect = (trackId: string) => {
        navigate(`/log/${trackId}`);
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