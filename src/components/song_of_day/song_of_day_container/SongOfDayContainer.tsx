import "./SongOfDayContainer.css";
import SongOfDay from "../song_of_day/SongOfDay.tsx";
import {type SongOfDay as SongOfDayType} from "../../../api/song.ts";
import * as React from "react";
import type {TrackSearch} from "../../../api/search.ts";
import LogSongConfirmation
    from "../../log_song_confirmation/LogSongConfirmation.tsx";

export default function SongOfDayContainer({
                                               song,
                                               setSong,
                                               pendingSong,
                                               onConfirmationCancel,
                                               handleConfirmation
                                           }: {
    song: SongOfDayType | null,
    setSong: React.Dispatch<React.SetStateAction<SongOfDayType | null>>,
    pendingSong?: TrackSearch | null,
    onConfirmationCancel: () => void,
    handleConfirmation: (trackId: string) => void
}) {
    return (
        <div className="container">
            {
                pendingSong ? <LogSongConfirmation pendingSong={pendingSong}
                                                   handleConfirmation={handleConfirmation}
                                                   onConfirmationCancel={onConfirmationCancel}/> :
                    <SongOfDay song={song} setSong={setSong}/>
            }
        </div>
    )
}