import {useEffect, useState} from "react";
import "./LogSongConfirmation.css"
import "../common/SongOfDay.css";
import {useAuth, useRequiredAuth} from "../../context/AuthContext.tsx";
import {useNavigate, useParams, useSearchParams} from "react-router";
import {searchForTrack} from "../../api/search.ts";
import {logSongOfDayForAppUser} from "../../api/song.ts";
import {getErrorMessage} from "../../api/messages.ts";
import ErrorBanner from "../common/error_banner/ErrorBanner.tsx";
import Spinner from "../../pages/spinner/Spinner.tsx";
import {useToast} from "../../context/ToastContext.tsx";
import SongOfDayImage from "../song_of_day/image/SongOfDayImage.tsx";
import SongOfDayDetails from "../song_of_day/details/SongOfDayDetails.tsx";
import SongOfDayMemory from "../song_of_day/memory/SongOfDayMemory.tsx";
import type {TrackSearch} from "../../types/TrackSearch.ts";
import {useSong} from "../../context/SongContext.tsx";
import LogSongConfirmationFooter from "./footer/LogSongConfirmationFooter.tsx";

export default function LogSongConfirmation() {
    const {setSong} = useSong();
    const {timezone} = useRequiredAuth();
    const {updateHasLoggedSongToday} = useAuth();
    const {showToast} = useToast();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [memory, setMemory] = useState("");
    const [pendingSong, setPendingSong] = useState<TrackSearch | null>(null);
    const {trackId} = useParams();
    const [searchParams] = useSearchParams();
    const urlDate = searchParams.get("date");
    const [date, setDate] = useState<string>(urlDate ?? getTodayForTimezone(timezone));

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
            const loggedSong = await logSongOfDayForAppUser(trackId, memory.trim(), date);
            setSong(loggedSong);
            if (getTodayForTimezone(timezone) === loggedSong.songDate) {
                updateHasLoggedSongToday(true);
            }

            showToast("Song logged successfully!");
            navigate(`/song-a-day/${loggedSong.songDate}`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getErrorMessage(err.message));
            }
        } finally {
            setConfirmLoading(false);
        }
    }

    function onCancel() {
        navigate(urlDate ? `/song-a-day/${urlDate}` : "/");
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
                    <LogSongConfirmationFooter onConfirmation={onConfirmation} confirmLoading={confirmLoading}
                                               date={date} setDate={setDate} onCancel={onCancel}/>
                </div>
            }
        </div>
    </>
}