import "./SongOfDayImage.css"
import type {TrackSearch} from "../../../../types/TrackSearch.ts";

export default function SongOfDayImage({trackInformation}: {
    trackInformation: TrackSearch
}) {
    return (
        <img
            src={trackInformation.largeImageUrl}
            alt={`${trackInformation.trackName} image`}
            className="song-of-day-entry-image"
        />
    )
}