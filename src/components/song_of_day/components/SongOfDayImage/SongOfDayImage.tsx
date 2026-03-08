import type {TrackSearch} from "../../../../api/search.ts";
import "./SongOfDayImage.css"

export default function SongOfDayImage({trackInformation}: {
    trackInformation: TrackSearch
}) {
    return (
        <img
            src={trackInformation.imageUrl}
            alt={`${trackInformation.trackName} image`}
            className="song-of-day-entry-image"
        />
    )
}