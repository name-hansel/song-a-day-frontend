import type {TrackSearch} from "../../../api/search.ts";
import "./TrackProposalItem.css";

export default function TrackProposalItem({
                                              track,
                                              handleSelectProposal,
                                              hideProposals
                                          }: {
    track: TrackSearch,
    handleSelectProposal: (song: TrackSearch) => void,
    hideProposals: () => void
}) {
    return (
        <div className="search-item" id={track.spotifyId} onClick={() => {
            hideProposals();
            handleSelectProposal(track);
        }}>
            <img
                src={track.imageUrl}
                alt="Album cover"
                className="search-item-image"
            />
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