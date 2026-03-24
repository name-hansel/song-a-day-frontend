import {useState} from "react";
import "./SongOfDayFooterRemove.css"
import Button from "../../../common/button/Button.tsx";

export default function SongOfDayFooterRemove({removeSongForAppUser, isRemoveAllowed, removeLoading}: {
    removeSongForAppUser?: () => Promise<void>,
    isRemoveAllowed: boolean,
    removeLoading: boolean
}) {
    const [confirmingRemove, setConfirmingRemove] = useState(false);

    return (
        <div className="song-of-day-footer-left">
            {
                isRemoveAllowed && removeSongForAppUser && (confirmingRemove ?
                    <div
                        className="song-of-day-remove-confirm">
                        <Button buttonText={"Confirm"} className={"song-of-day-confirm-btn"}
                                onClick={removeSongForAppUser} loading={removeLoading}/>
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