import "./SongOfDay.css"
import "../common/SongOfDay.css";
import {useEffect, useState} from "react";
import {
    deleteSongOfDayForAppUser,
    getSongOfDayForAppUser,
    updateMemoryForSong
} from "../../api/song.ts";
import {useOutletContext} from "react-router";
import type {SongOfDayContext} from "../../pages/home/Home.tsx";
import {getErrorMessage} from "../../api/messages.ts";
import ErrorBanner from "../error_banner/ErrorBanner.tsx";
import Spinner from "../../pages/spinner/Spinner.tsx";
import {useToast} from "../../context/ToastContext.tsx";
import {Check, Pencil, X} from "lucide-react";

export default function SongOfDay() {
    const {song, setSong} = useOutletContext<SongOfDayContext>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmingRemove, setConfirmingRemove] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [draftMemory, setDraftMemory] = useState(song?.memory ?? "");
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

    function startEdit() {
        setDraftMemory(song?.memory ?? "")
        setIsEditing(true)
    }

    function cancelEdit() {
        setDraftMemory(song?.memory ?? "")
        setIsEditing(false)
    }

    async function confirmEdit() {
        if (!song) return;

        try {
            setLoading(true);
            setIsEditing(false);
            const updatedSong = await updateMemoryForSong(song.uuid, draftMemory);
            setSong(updatedSong);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getErrorMessage(err.message));
            }
        } finally {
            setLoading(false);
        }
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
                    !loading && song &&
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
                                    song.memory &&
                                    <>
                                        <textarea
                                            disabled={!isEditing}
                                            value={isEditing ? draftMemory : song.memory}
                                            onChange={(e) => setDraftMemory(e.target.value)}
                                            className="song-of-day-memory"/>
                                        <div
                                            className="song-of-day-memory-header">
                                            {
                                                !isEditing && <button
                                                    className="song-of-day-memory-edit"
                                                    onClick={startEdit}>
                                                    <Pencil size={18}/>
                                                </button>
                                            }
                                            {
                                                isEditing &&
                                                <>
                                                    <button
                                                        onClick={confirmEdit}
                                                        className="song-of-day-memory-edit">
                                                        <Check size={18}/>
                                                    </button>
                                                    <button
                                                        className="song-of-day-memory-edit"
                                                        onClick={cancelEdit}>
                                                        <X size={18}/>
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </>
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