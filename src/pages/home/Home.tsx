import {useAuth} from "../../context/AuthContext.tsx";
import SongOfDayPageHeader from "../../components/song_of_day_page_header/SongOfDayPageHeader.tsx";
import "./Home.css"
import {useNavigate} from "react-router";
import {useSong} from "../../context/SongContext.tsx";
import SongOfDay from "../../components/song_of_day/SongOfDay.tsx";


export default function Home() {
    const {song} = useSong();
    const {appUser} = useAuth();
    const navigate = useNavigate();

    if (!appUser) {
        return null;
    }

    const onSelect = (trackId: string) => {
        navigate(`/log/${trackId}`);
    }

    return (
        <>
            <SongOfDayPageHeader currentDate={song?.songDate} onSelect={onSelect}/>
            <div className="container">
                <SongOfDay/>
            </div>
        </>
    );
}