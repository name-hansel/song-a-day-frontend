import "./SongOfDay.css"
import "../common/SongOfDay.css";
import {useEffect, useState} from "react";
import {
    deleteSongOfDayForAppUser,
    getSongOfDayForAppUser,
    updateMemoryForSong
} from "../../api/song.ts";
import {useOutletContext, useParams} from "react-router";
import type {SongOfDayContext} from "../../pages/home/Home.tsx";
import {getErrorMessage} from "../../api/messages.ts";
import ErrorBanner from "../error_banner/ErrorBanner.tsx";
import Spinner from "../../pages/spinner/Spinner.tsx";
import {useToast} from "../../context/ToastContext.tsx";
import SongOfDayDetails
    from "./components/SongOfDayDetails/SongOfDayDetails.tsx";
import SongOfDayImage from "./components/SongOfDayImage/SongOfDayImage.tsx";
import SongOfDayFooterRemove
    from "./components/SongOfDayFooterRemove/SongOfDayFooterRemove.tsx";
import SongOfDayMemory from "./components/SongOfDayMemory/SongOfDayMemory.tsx";

export default function SongOfDay() {
    const {date} = useParams();
    const {song, setSong} = useOutletContext<SongOfDayContext>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {showToast} = useToast();

    useEffect(() => {
        async function getSongOfDay() {
            try {
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
    }, [date, setSong]);

    async function removeSongForAppUser() {
        await deleteSongOfDayForAppUser();
        setSong(null);
        showToast("Song removed successfully");
    }

    async function confirmEdit(draftMemory: string) {
        if (!song) return;

        try {
            setLoading(true);
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
                    !loading && !song && !error &&
                    <h1 className="msg">No song logged yet :(</h1>
                }
                {
                    !loading && song &&
                    <div className="song-of-day-entry">
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
                                removeSongForAppUser={removeSongForAppUser}/>
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