import "./TodaySongHeader.css";
import SearchBar from "../searchbar/SearchBar.tsx";
import type {SongOfDay as SongOfDayType} from "../../api/song.ts";
import * as React from "react";

export default function TodaySongHeader({song, setSong}: {
    song: SongOfDayType | null;
    setSong: React.Dispatch<React.SetStateAction<SongOfDayType | null>>
}) {
    return (
        <section className="today-song-header">
            <h2 className="today-song today-song-title">today's song</h2>
            {
                !song && <SearchBar setSong={setSong}/>
            }
        </section>
    );
}