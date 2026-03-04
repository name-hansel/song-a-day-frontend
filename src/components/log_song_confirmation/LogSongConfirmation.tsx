import {useEffect, useState} from "react";
import "./LogSongConfirmation.css"
import {useAuth} from "../../auth/AuthContext.tsx";
import {useNavigate, useOutletContext, useParams} from "react-router";
import type {SongOfDayContext} from "../../pages/home/Home.tsx";
import {searchForTrack, type TrackSearch} from "../../api/search.ts";
import {logSongOfDayForAppUser} from "../../api/song.ts";
import {getErrorMessage} from "../../api/messages.ts";
import ErrorBanner from "../error_banner/ErrorBanner.tsx";
import Spinner from "../../pages/spinner/Spinner.tsx";

export default function LogSongConfirmation() {
    const {setSong} = useOutletContext<SongOfDayContext>();
    const {appUser} = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [comment, setComment] = useState("");
    const [pendingSong, setPendingSong] = useState<TrackSearch | null>(null);
    const {trackId} = useParams();

    useEffect(() => {
        if (!trackId) return;

        const fetchTrack = async () => {
            try {
                setLoading(true);
                setError(null);

                const song = await searchForTrack(trackId);
                setPendingSong(song);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(getErrorMessage(err.message));
                }
            } finally {
                setLoading(false);
            }
        }

        void fetchTrack();
    }, [trackId]);

    function getTodayForTimezone(timezoneId: string | undefined) {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-CA", {
            timeZone: timezoneId,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        return formatter.format(now);
    }

    async function onConfirmation() {
        if (!trackId) return;

        try {
            const loggedSong = await logSongOfDayForAppUser(trackId);
            setSong(loggedSong);
            navigate("/");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getErrorMessage(err.message));
            }
        }
    }

    function onCancel() {
        navigate("/");
    }

    return <>
        {
            error &&
            <ErrorBanner message={error} onClose={() => setError(null)}/>
        }
        <div className="page-centered-content">
            <div className="log-song-confirmation-card">
                {
                    loading && <Spinner/>
                }
                {
                    pendingSong && <>
                        <div className="song-image-wrapper">
                            <img src={pendingSong.imageUrl}
                                 alt={pendingSong.trackName}
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
                                    value={getTodayForTimezone(appUser?.timezone)}
                                    disabled
                                    className="log-date-picker"/>
                                <textarea
                                    className="log-comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write a comment or diary entry..."/>
                                <div className="confirmation-actions">
                                    <button
                                        className="confirm-button"
                                        onClick={onConfirmation}
                                    >
                                        Confirm
                                    </button>
                                    <button className="cancel-button"
                                            onClick={onCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    </>
}