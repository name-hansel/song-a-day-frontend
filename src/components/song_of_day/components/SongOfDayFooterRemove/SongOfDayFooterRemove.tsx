import {useState} from "react";
import "./SongOfDayFooterRemove.css"

export default function SongOfDayFooterRemove({removeSongForAppUser}: {
    removeSongForAppUser?: () => Promise<void>
}) {
    const [confirmingRemove, setConfirmingRemove] = useState(false);

    return (
        <div className="song-of-day-footer-left">
            {
                confirmingRemove ?
                    <div
                        className="song-of-day-remove-confirm">
                        <button
                            className="song-of-day-confirm-btn"
                            onClick={removeSongForAppUser}
                        >
                            Confirm
                        </button>
                        <button
                            className="song-of-day-cancel-btn"
                            onClick={() => setConfirmingRemove(false)}
                        >
                            Cancel
                        </button>
                        <span
                            className="song-of-day-remove-text">
                                                Are you sure?
                                            </span>
                    </div> : <button
                        className="song-of-day-remove-btn"
                        onClick={() => setConfirmingRemove(true)}
                    >
                        Remove
                    </button>
            }
        </div>
    )
}