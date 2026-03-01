import {useState} from "react";
import type {TrackSearch} from "../../api/search.ts";
import "./LogSongConfirmation.css"

export default function LogSongConfirmation({
                                                onConfirmationCancel,
                                                pendingSong,
                                                handleConfirmation
                                            }: {
    onConfirmationCancel: () => void,
    pendingSong: TrackSearch,
    handleConfirmation: (trackId: string) => void
}) {
    const [comment, setComment] = useState("");

    return <div className="log-song-confirmation-card">
        <div className="song-image-wrapper">
            <img src={pendingSong.imageUrl} alt={pendingSong.trackName}
                 className="song-image"/>
        </div>

        <div className="song-details">
            <div className="track-details">
                <h2 className="song-title">{pendingSong.trackName}</h2>
                <p className="song-artist">{pendingSong.artistName}</p>
                <p className="song-album">{pendingSong.albumName}</p>
            </div>

            <div className="song-metainfo">
                <input
                    type="date"
                    // value={today}
                    disabled
                    className="log-date-picker"
                />
                <textarea
                    className="log-comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment or diary entry..."
                />
                <div className="confirmation-actions">
                    <button
                        className="confirm-button"
                        onClick={() => {
                            handleConfirmation(pendingSong.spotifyId)
                        }}
                    >
                        Confirm
                    </button>
                    <button className="cancel-button"
                            onClick={onConfirmationCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
}