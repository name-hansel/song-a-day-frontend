import "./SongOfDay.css"
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
                    !song && <h1 className="msg">No song logged yet</h1>
                }
                {
                    song && <div className="song-card">
                        <div className="song-image-wrapper">
                            <img
                                src={song.trackInformation.imageUrl}
                                alt="Song cover"
                                className="song-image"
                            />
                        </div>
                        <div className="song-details">
                            <div className="track-details">
                                <a target="_blank"
                                   className="song-title track-link"
                                   href={song.trackInformation.spotifyUrl}><h3
                                    className="song-title">{song.trackInformation.trackName}</h3>
                                </a>
                                <p className="song-artist">{song.trackInformation.artistName}</p>
                                <p className="song-album">{song.trackInformation.albumName}</p>
                            </div>
                            <div className="song-metainfo">
                                <p className="logged-at">
                                    logged at: {song.addedAtTime}
                                </p>
                                <button className="remove-button"
                                        onClick={removeSongForAppUser}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}