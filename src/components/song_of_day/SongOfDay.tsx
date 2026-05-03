import "./SongOfDay.css"
import "../common/SongOfDay.css";
import {useEffect, useState} from "react";
import {deleteSongOfDayForAppUser, getSongOfDayForAppUser, updateMemoryForSong} from "../../api/song.ts";
import {useLocation, useParams} from "react-router";
import {getErrorMessage} from "../../api/messages.ts";
import ErrorBanner from "../common/error_banner/ErrorBanner.tsx";
import Spinner from "../../pages/spinner/Spinner.tsx";
import {useToast} from "../../context/ToastContext.tsx";
import SongOfDayDetails from "./details/SongOfDayDetails.tsx";
import SongOfDayImage from "./image/SongOfDayImage.tsx";
import SongOfDayFooterRemove from "./footer/SongOfDayFooterRemove.tsx";
import SongOfDayMemory from "./memory/SongOfDayMemory.tsx";
import SongOfDayHeader from "./header/SongOfDayHeader.tsx";
import {useAuth, useRequiredAuth} from "../../context/AuthContext.tsx";
import {useSong} from "../../context/SongContext.tsx";
import {getTodayForTimezone} from "../../utils/DateUtils.ts";
import {useSidebar} from "../../context/SidebarContext.tsx";

export default function SongOfDay() {
    const {date} = useParams();
    const {song, setSong} = useSong();
    const [loading, setLoading] = useState(true);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {showToast} = useToast();
    const {updateSidebar} = useSidebar();
    const location = useLocation();
    const [fromHistory] = useState<boolean>(location.state?.fromHistory ?? false);

    const {timezone} = useRequiredAuth();
    const {updateHasLoggedSongToday} = useAuth();

    useEffect(() => {
        async function getSongOfDay() {
            try {
                setLoading(true);
                const data = await getSongOfDayForAppUser(date);
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
    }, [date, setSong, song?.songDate, timezone]);

    async function removeSongForAppUser() {
        if (!song) {
            return;
        }

        try {
            setRemoveLoading(true);
            await deleteSongOfDayForAppUser(song.uuid);
            if (getTodayForTimezone(timezone) === song.songDate) {
                updateHasLoggedSongToday(false);
            }
            setSong(null);

            await updateSidebar();
            showToast("Song removed successfully");
            setError(null);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getErrorMessage(err.message));
            }
        } finally {
            setRemoveLoading(false);
        }
    }

    async function confirmEdit(draftMemory: string | null) {
        if (!song) return;

        try {
            setLoading(true);
            const updatedSong = await updateMemoryForSong(song.uuid, draftMemory);
            setSong(updatedSong);
            setError(null);
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
                    !loading && !song && !error &&
                    <h1 className="msg">No song logged.</h1>
                }
                {
                    !loading && song &&
                    <div className="song-of-day-entry">
                        <SongOfDayHeader date={song.songDate} fromHistory={fromHistory}/>
                        <div className="song-of-day-entry-content">
                            <SongOfDayImage
                                trackInformation={song.trackInformation}/>
                            <div className="song-of-day-entry-text">
                                <SongOfDayDetails
                                    trackInformation={song.trackInformation}/>
                                <SongOfDayMemory isEditableByDefault={false}
                                                 memory={song.memory}
                                                 confirmEdit={confirmEdit}/>
                            </div>
                        </div>
                        <div className="song-of-day-entry-footer">
                            <SongOfDayFooterRemove
                                removeSongForAppUser={removeSongForAppUser}
                                removeLoading={removeLoading}/>
                            <p className="song-of-day-timestamp">
                                {
                                    song.updatedAtTime === song.addedAtTime ? `Logged at: ${song.addedAtTime}` : `Updated at: ${song.updatedAtTime}`
                                }
                            </p>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}