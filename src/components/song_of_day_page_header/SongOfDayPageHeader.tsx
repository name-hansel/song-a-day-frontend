import "./SongOfDayPageHeader.css";
import SearchBar from "../search_bar/SearchBar.tsx";
import {ArrowLeft, ArrowRight, Home} from "lucide-react";


export default function SongOfDayPageHeader({onSelect}: {
    onSelect?: (trackId: string) => void,
}) {
    return (
        <section className="song-a-day-page-header-section">
            <button className="song-a-day-page-header-btn">
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