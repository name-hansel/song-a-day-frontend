import type {TrackSearch} from "../../../api/search.ts";
import "./TrackProposalItem.css";

export default function TrackProposalItem({track}: {
    track: TrackSearch
}) {

    return (
        <div className="search-item" id={track.spotifyId}>
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