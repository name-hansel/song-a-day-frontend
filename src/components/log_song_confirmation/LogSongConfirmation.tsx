import {useEffect, useState} from "react";
import "./LogSongConfirmation.css"
import "../common/SongOfDay.css";
import {useAuth} from "../../auth/AuthContext.tsx";
import {useNavigate, useOutletContext, useParams} from "react-router";
import type {SongOfDayContext} from "../../pages/home/Home.tsx";
import {searchForTrack} from "../../api/search.ts";
import {logSongOfDayForAppUser} from "../../api/song.ts";
import {getErrorMessage} from "../../api/messages.ts";
import ErrorBanner from "../common/error_banner/ErrorBanner.tsx";
import Spinner from "../../pages/spinner/Spinner.tsx";
import {useToast} from "../../context/ToastContext.tsx";
import SongOfDayImage from "../song_of_day/components/SongOfDayImage/SongOfDayImage.tsx";
import SongOfDayDetails from "../song_of_day/components/SongOfDayDetails/SongOfDayDetails.tsx";
import SongOfDayMemory from "../song_of_day/components/SongOfDayMemory/SongOfDayMemory.tsx";
import type {TrackSearch} from "../../types/TrackSearch.ts";
import Button from "../common/button/Button.tsx";

export default function LogSongConfirmation() {
    const {setSong} = useOutletContext<SongOfDayContext>();
    const {appUser, setAppUser} = useAuth();
    const {showToast} = useToast();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [memory, setMemory] = useState("");
    const [pendingSong, setPendingSong] = useState<TrackSearch | null>(null);
    const {trackId} = useParams();

    useEffect(() => {
        if (!trackId) return;

        const fetchTrack = async () => {
            try {
                setLoading(true);
                setError(null);
                setMemory("");

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
            setConfirmLoading(true);
            const loggedSong = await logSongOfDayForAppUser(trackId, memory.trim());
            setSong(loggedSong);
            setAppUser(prev => prev ? {
                ...prev, hasLoggedSongToday: true
            } : prev)
            showToast("Song logged successfully!");
            navigate("/");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getErrorMessage(err.message));
            }
        } finally {
            setConfirmLoading(false);
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
            {
                loading && <Spinner/>
            }
            {
                pendingSong &&
                <div className="song-of-day-entry">
                    <div className="song-of-day-entry-content">
                        <SongOfDayImage trackInformation={pendingSong}/>
                        <div className="song-of-day-entry-text">
                            <SongOfDayDetails
                                trackInformation={pendingSong}/>
                            <SongOfDayMemory isEditableByDefault
                                             memory={memory}
                                             setMemory={setMemory}/>
                        </div>
                    </div>
                    <div className="song-of-day-entry-footer">
                        <div
                            className="log-song-confirmation-entry-footer-confirm">
                            <Button className={"log-song-confirmation-confirm-btn"} onClick={onConfirmation}
                                    buttonText={"Confirm"} loading={confirmLoading}/>
                            <input
                                type="date"
                                value={getTodayForTimezone(appUser?.timezone)}
                                disabled
                                className="log-song-confirmation-date-picker"/>
                        </div>
                        <Button className={"log-song-confirmation-cancel-btn"} onClick={onCancel}
                                buttonText={"Cancel"}/>
                    </div>
                </div>
            }
        </div>
    </>
}