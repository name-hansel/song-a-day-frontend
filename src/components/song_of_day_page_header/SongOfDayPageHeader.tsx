import "./SongOfDayPageHeader.css";
import SearchBar from "../search_bar/SearchBar.tsx";
import {ArrowLeft, ArrowRight, Home} from "lucide-react";
import {useNavigate} from "react-router";


export default function SongOfDayPageHeader({onSelect}: {
    onSelect?: (trackId: string) => void,
}) {
    const navigate = useNavigate();

    function goHome() {
        navigate("/");
    }

    return (
        <section className="song-a-day-page-header-section">
            <button onClick={goHome} className="song-a-day-page-header-btn">
                <Home size={18}/>
            </button>
            {
                onSelect && <SearchBar onSelect={onSelect}/>
            }
            <div className="song-a-day-page-header-previous-next-div">
                <button className="song-a-day-page-header-btn">
                    <ArrowLeft size={18}/>
                </button>
                <button className="song-a-day-page-header-btn">
                    <ArrowRight size={18}/>
                </button>
            </div>
        </section>
    );
}