import "./SongOfDayPageHeader.css";
import SearchBar from "../../search_bar/SearchBar.tsx";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useNavigate, useParams} from "react-router";
import {getTodayForTimezone} from "../../../utils/DateUtils.ts";
import {useRequiredAuth} from "../../../context/AuthContext.tsx";
import HomeButton from "../../common/home_button/HomeButton.tsx";
import DateInput from "../../common/date_input/DateInput.tsx";
import Button from "../../common/button/Button.tsx";


export default function SongOfDayPageHeader({onSelect}: {
    onSelect?: (trackId: string) => void,
}) {
    const navigate = useNavigate();
    const {timezone} = useRequiredAuth();
    // URL date
    const {date} = useParams();
    const effectiveDate = date ?? getTodayForTimezone(timezone);

    function handlePrevious() {
        const previousDate = shiftDate(effectiveDate, -1);
        navigateToSongForDay(previousDate);
    }

    function handleNext() {
        const nextDate = shiftDate(effectiveDate, +1);
        navigateToSongForDay(nextDate);
    }

    function navigateToSongForDay(date: string) {
        navigate(date ? `/song-a-day/${date}` : "");
    }

    function handleDateChange(currentValue: string) {
        const today = getTodayForTimezone(timezone);

        if (currentValue > today) {
            return;
        }

        navigateToSongForDay(currentValue);
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
            <HomeButton/>
            {
                onSelect && <SearchBar onSelect={onSelect}/>
            }
            {
                <div className="song-a-day-page-header-action-div">
                    <DateInput value={date ?? getTodayForTimezone(timezone)} max={getTodayForTimezone(timezone)}
                               onChange={handleDateChange}/>
                    <div className="song-a-day-page-header-previous-next-div">
                        <Button onClick={handlePrevious} className="song-a-day-page-header-btn"
                                icon={<ArrowLeft size={18}/>}/>
                        {

                            <button
                                disabled={!date || getTodayForTimezone(timezone) === date}
                                onClick={handleNext}
                                className="song-a-day-page-header-btn">
                                <ArrowRight size={18}/>
                            </button>
                        }
                    </div>
                </div>
            }
        </section>
    );
}