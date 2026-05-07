import {useState} from "react";
import "./SongOfDayFooterRemove.css"
import Button from "../../common/button/Button.tsx";

export default function SongOfDayFooterRemove({removeSongForAppUser, removeLoading}: {
    removeSongForAppUser?: () => Promise<void>,
    removeLoading: boolean
}) {
    const [confirmingRemove, setConfirmingRemove] = useState(false);

    return (
        <div className="song-of-day-footer-left">
            {
                removeSongForAppUser && (confirmingRemove ?
                        <div
                            className="song-of-day-remove-confirm">
                            <Button buttonText="Confirm" className={"song-of-day-confirm-btn"}
                                    onClick={removeSongForAppUser} loading={removeLoading}/>
                            <Button className="song-of-day-cancel-btn" onClick={() => setConfirmingRemove(false)}
                                    buttonText="Cancel"/>
                            <span
                                className="song-of-day-remove-text">
                                                Are you sure?
                                            </span>
                        </div> :
                        <Button buttonText="Remove" className="song-of-day-remove-btn"
                                onClick={() => setConfirmingRemove(true)}
                        />
                )
            }
        </div>
    )
}