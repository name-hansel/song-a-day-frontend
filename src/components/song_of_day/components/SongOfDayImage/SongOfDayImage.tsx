import "./SongOfDayImage.css"
import type {TrackSearch} from "../../../../types/TrackSearch.ts";
import Image from "../../../common/image/Image.tsx";

export default function SongOfDayImage({trackInformation}: {
    trackInformation: TrackSearch
}) {
    return (
        <Image
            src={trackInformation.largeImageUrl}
            alt={`${trackInformation.trackName} image`}
            className="song-of-day-entry-image"
        />
    )
}