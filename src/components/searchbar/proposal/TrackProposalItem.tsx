import type {TrackSearch} from "../../../api/search.ts";
import "./TrackProposalItem.css";
import {
    logSongOfDayForAppUser,
    type SongOfDay as SongOfDayType
} from "../../../api/song.ts";
import * as React from "react";

export default function TrackProposalItem({track, setSong}: {
    track: TrackSearch;
    setSong: React.Dispatch<React.SetStateAction<SongOfDayType | null>>
}) {
    async function logSong() {
        const data = await logSongOfDayForAppUser(track.spotifyId);
        setSong(data);
    }

    return (
        <div className="search-item" id={track.spotifyId} onClick={logSong}>
            <img
                src={track.imageUrl}
                alt="Album cover"
                className="search-item-image"
            />
            <div className="search-item-details">
                <div className="search-item-title">{track.trackName}</div>
                <div className="search-item-artist">{track.artistName}</div>
                <div className="search-item-album">{track.albumName}</div>
            </div>
        </div>
    )
}