import "./SongOfDayContainer.css";
import SongOfDay from "../song_of_day/SongOfDay.tsx";
import {type SongOfDay as SongOfDayType} from "../../../api/song.ts";
import * as React from "react";

export default function SongOfDayContainer({song, setSong}: {
    song: SongOfDayType | null;
    setSong: React.Dispatch<React.SetStateAction<SongOfDayType | null>>
}) {
    return (
        <div className="container">
            <SongOfDay song={song} setSong={setSong}/>
        </div>
    )
}