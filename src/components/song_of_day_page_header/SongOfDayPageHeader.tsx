import "./SongOfDayPageHeader.css";
import SearchBar from "../search_bar/SearchBar.tsx";
import {ArrowLeft, ArrowRight, Home} from "lucide-react";
import {useNavigate} from "react-router";
import {getTodayForTimezone} from "../../utils/DateUtils.ts";
import {useAuth} from "../../context/AuthContext.tsx";


export default function SongOfDayPageHeader({onSelect, currentDate}: {
    onSelect?: (trackId: string) => void,
    currentDate?: string | undefined
}) {
    const navigate = useNavigate();
    const {appUser} = useAuth();

    function goHome() {
        navigate("/");
    }

    function goPreviousOrNextSong(date: string) {
        navigate(`/song-a-day/${date}`);
    }

    function shiftDate(dateStr: string | undefined, delta: number): string {
        if (!dateStr) {
            dateStr = getTodayForTimezone(appUser?.timezone);
        }

        const [yyyy, mm, dd] = dateStr.split("-").map(Number);
        const date = new Date(yyyy, mm - 1, dd);
        date.setDate(date.getDate() + delta);

        const newDD = String(date.getDate()).padStart(2, "0");
        const newMM = String(date.getMonth() + 1).padStart(2, "0");
        const newYYYY = date.getFullYear();

        return `${newYYYY}-${newMM}-${newDD}`;
    }

    return (
        <section className="song-a-day-page-header-section">
            <button onClick={goHome} className="song-a-day-page-header-btn">
                <Home size={18}/>
            </button>
            {
                onSelect && <SearchBar onSelect={onSelect}/>
            }
            {
                <div className="song-a-day-page-header-previous-next-div">
                    <button onClick={() => goPreviousOrNextSong(shiftDate(currentDate, -1))}
                            className="song-a-day-page-header-btn">
                        <ArrowLeft size={18}/>
                    </button>
                    {
                        // TODO: currentDate might be null for today's song OR if no song logged
                        // Compare against URL?
                        getTodayForTimezone(appUser?.timezone) !== currentDate &&
                        <button
                            onClick={() => goPreviousOrNextSong(shiftDate(currentDate, +1))}
                            className="song-a-day-page-header-btn">
                            <ArrowRight size={18}/>
                        </button>
                    }
                </div>
            }
        </section>
    );
}