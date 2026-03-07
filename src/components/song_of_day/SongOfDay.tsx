import "./SongOfDay.css"
import "../common/SongOfDay.css";
import {useEffect, useState} from "react";
import {
    deleteSongOfDayForAppUser,
    getSongOfDayForAppUser
} from "../../api/song.ts";
import {useOutletContext} from "react-router";
import type {SongOfDayContext} from "../../pages/home/Home.tsx";
import {getErrorMessage} from "../../api/messages.ts";
import ErrorBanner from "../error_banner/ErrorBanner.tsx";
import Spinner from "../../pages/spinner/Spinner.tsx";
import {useToast} from "../../context/ToastContext.tsx";

export default function SongOfDay() {
    const {song, setSong} = useOutletContext<SongOfDayContext>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmingRemove, setConfirmingRemove] = useState(false);
    const {showToast} = useToast();

    useEffect(() => {
        async function getSongOfDay() {
            try {
                const data = await getSongOfDayForAppUser();
                setSong(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(getErrorMessage(err.message));
                }
            } finally {
                setLoading(false);
            }
        }

        void getSongOfDay();
    }, [setSong]);

    async function removeSongForAppUser() {
        await deleteSongOfDayForAppUser();
        setSong(null);
        showToast("Song removed successfully");
    }

    return (
        <>
            {
                error &&
                <ErrorBanner message={error} onClose={() => setError(null)}/>
            }
            <div className="page-centered-content">
                {
                    loading && <Spinner/>
                }
                {
                    !loading && !song &&
                    <h1 className="msg">No song logged yet</h1>
                }
                {
                    song &&
                    <div className="song-of-day-entry">
                        <div className="song-of-day-entry-content">
                            <img
                                src={song.trackInformation.imageUrl}
                                alt={`${song.trackInformation.trackName} image`}
                                className="song-of-day-entry-image"
                            />
                            <div className="song-of-day-entry-text">
                                <div className="song-of-day-entry-track-info">
                                    <h2 className="song-of-day-track-name"
                                        title={song.trackInformation.trackName}>
                                        {song.trackInformation.trackName}
                                    </h2>
                                    <p className="song-of-day-artist-name">
                                        {song.trackInformation.artistName}
                                    </p>
                                    <p className="song-of-day-album-name">
                                        {song.trackInformation.albumName}
                                    </p>
                                </div>
                                {
                                    song.memory && <textarea
                                        disabled
                                        value={song.memory}
                                        className="song-of-day-memory"
                                    />
                                }
                            </div>
                        </div>
                        <div className="song-of-day-entry-footer">
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
                            <p className="song-of-day-logged-at">
                                Logged at: {song.addedAtTime}
                            </p>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}