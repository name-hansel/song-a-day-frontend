import "./TodaySongHeader.css";
import SearchBar from "../search_bar/SearchBar.tsx";
import {formatToReadableDate} from "../../utils/DateUtils.ts";


export default function TodaySongHeader({onSelect, date}: {
    onSelect?: (trackId: string) => void,
    date?: string
}) {
    return (
        <section className="today-song-header">
            <h2 className="today-song today-song-title">
                {
                    date ? `${formatToReadableDate(date)}'s song` : "today's song"
                }
            </h2>
            {
                onSelect && <SearchBar onSelect={onSelect}/>
            }
        </section>
    );
}