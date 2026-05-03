import "./SongOfDayPageHeader.css";
import SearchBar from "../search_bar/SearchBar.tsx";
import {ArrowLeft, ArrowRight, Home} from "lucide-react";
import {useNavigate, useParams} from "react-router";
import {getTodayForTimezone} from "../../utils/DateUtils.ts";
import {useAuth} from "../../context/AuthContext.tsx";


export default function SongOfDayPageHeader({onSelect}: {
    onSelect?: (trackId: string) => void,
}) {
    const navigate = useNavigate();
    const {appUser} = useAuth();
    // URL date
    const {date} = useParams();
    const effectiveDate = date ?? getTodayForTimezone(appUser?.timezone);

    function goHome() {
        navigate("/");
    }

    function handlePrevious() {
        const previousDate = shiftDate(effectiveDate, -1);
        navigateToSongForDay(previousDate);
    }

    function handleNext() {
        const nextDate = shiftDate(effectiveDate, +1);
        navigateToSongForDay(nextDate);
    }

    function navigateToSongForDay(date: string) {
        navigate(`/song-a-day/${date}`);
    }

    function shiftDate(dateStr: string, delta: number): string {
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
                    <button onClick={handlePrevious}
                            className="song-a-day-page-header-btn">
                        <ArrowLeft size={18}/>
                    </button>
                    {
                        (
                            date && getTodayForTimezone(appUser?.timezone) !== date
                        )
                        &&
                        <button
                            onClick={handleNext}
                            className="song-a-day-page-header-btn">
                            <ArrowRight size={18}/>
                        </button>
                    }
                </div>
            }
        </section>
    );
}