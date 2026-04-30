import type {SongHistory} from "../../../types/SongHistory.ts";
import {ArrowLeft, ArrowRight} from "lucide-react";
import "./SongHistoryButtonFooter.css"
import {getUserSongHistoryNext, getUserSongHistoryPrevious} from "../../../api/song.ts";
import {getErrorMessage} from "../../../api/messages.ts";
import type {Dispatch, SetStateAction} from "react";

export default function SongHistoryButtonFooter({songHistory, setSongHistory, setLoading, setError}: {
    songHistory: SongHistory,
    setSongHistory: Dispatch<SetStateAction<SongHistory | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string | null>>;
}) {
    async function loadPreviousSongHistory() {
        try {
            const previousSongHistory = await getUserSongHistoryPrevious(songHistory.previousDate);
            setSongHistory(previousSongHistory);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getErrorMessage(err.message));
            }
        } finally {
            setLoading(false);
        }
    }

    async function loadNextSongHistory() {
        try {
            const nextSongHistory = await getUserSongHistoryNext(songHistory.nextDate);
            setSongHistory(nextSongHistory);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getErrorMessage(err.message));
            }
        } finally {
            setLoading(false);
        }
    }

    return <div className="song-history-btn-footer">
        {
            songHistory.hasMorePrevious &&
            <button className="song-history-footer-btn"
                    onClick={loadPreviousSongHistory}><ArrowLeft
                size={16}/>
            </button>
        }
        {
            songHistory.hasMoreNext && <button onClick={loadNextSongHistory}
                                               className="song-history-footer-btn">
                <ArrowRight size={16}/>
            </button>
        }
    </div>
}