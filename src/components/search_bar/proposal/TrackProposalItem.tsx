import "./TrackProposalItem.css";
import type {TrackSearch} from "../../../types/TrackSearch.ts";
import Image from "../../common/image/Image.tsx";

export default function TrackProposalItem({
                                              track,
                                              hideProposals,
                                              onSelect
                                          }: {
    track: TrackSearch,
    hideProposals: () => void,
    onSelect: (trackId: string) => void
}) {
    return (
        <div className="search-item" id={track.spotifyId} onClick={() => {
            hideProposals();
            onSelect(track.spotifyId);
        }}>
            <Image src={track.smallImageUrl}
                   alt="Album cover"
                   className="search-item-image"/>
            <div className="search-item-details">
                <div
                    className="search-item-detail search-item-title">{track.trackName}</div>
                <div
                    className="search-item-detail search-item-artist">{track.artistName}</div>
                <div
                    className="search-item-detail search-item-album">{track.albumName}</div>
            </div>
        </div>
    )
}