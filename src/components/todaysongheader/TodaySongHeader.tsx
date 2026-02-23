import "./TodaySongHeader.css";
import SearchBar from "../searchbar/SearchBar.tsx";

export default function TodaySongHeader() {
    return (
        <section className="today-song-header">
            <h2 className="today-song today-song-title">today's song</h2>
            <SearchBar/>
            {/*<h2 className="today-song today-song-day">{date?.toLowerCase()}</h2>*/}
        </section>
    );
}