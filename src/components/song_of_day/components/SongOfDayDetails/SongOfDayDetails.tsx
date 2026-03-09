import type {TrackSearch} from "../../../../api/search.ts";
import "./SongOfDayDetails.css"

export default function SongOfDayDetails({trackInformation}: {
    trackInformation: TrackSearch
}) {
    return (
        <div className="song-of-day-entry-track-info">
            <a href={trackInformation.spotifyUrl} target="_blank">
                <h2 className="song-of-day-track-name"
                    title={trackInformation.trackName}>
                    {trackInformation.trackName}
                </h2>
            </a>
            <p className="song-of-day-artist-name">
                {trackInformation.artistName}
            </p>
            <p className="song-of-day-album-name">
                {trackInformation.albumName}
            </p>
        </div>
    )
}