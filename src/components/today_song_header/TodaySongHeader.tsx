import "./TodaySongHeader.css";
import SearchBar from "../search_bar/SearchBar.tsx";
import type {SongOfDay as SongOfDayType} from "../../api/song.ts";
import type {TrackSearch} from "../../api/search.ts";

export default function TodaySongHeader({
                                            song,
                                            handleSelectProposal,
                                            pendingSong
                                        }: {
    song: SongOfDayType | null,
    handleSelectProposal: (song: TrackSearch) => void,
    pendingSong?: TrackSearch | null
}) {
    return (
        <section className="today-song-header">
            <h2 className="today-song today-song-title">today's song</h2>
            {
                !song && !pendingSong &&
                <SearchBar handleSelectProposal={handleSelectProposal}/>
            }
        </section>
    );
}