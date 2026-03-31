import "./TodaySongHeader.css";
import SearchBar from "../search_bar/SearchBar.tsx";


export default function TodaySongHeader({onSelect}: {
    onSelect?: (trackId: string) => void,
}) {
    return (
        <section className="today-song-header">
            <h2 className="today-song-title">
                today's song
            </h2>
            {
                onSelect && <SearchBar onSelect={onSelect}/>
            }
        </section>
    );
}