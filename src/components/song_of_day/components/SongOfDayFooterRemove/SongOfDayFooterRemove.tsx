import {useState} from "react";
import "./SongOfDayFooterRemove.css"

export default function SongOfDayFooterRemove({removeSongForAppUser, isRemoveAllowed}: {
    removeSongForAppUser?: () => Promise<void>,
    isRemoveAllowed: boolean
}) {
    const [confirmingRemove, setConfirmingRemove] = useState(false);

    return (
        <div className="song-of-day-footer-left">
            {
                isRemoveAllowed && (confirmingRemove ?
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
                    </button>)
            }
        </div>
    )
}