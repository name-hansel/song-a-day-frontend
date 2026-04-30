import type {SongHistory} from "../../../types/SongHistory.ts";
import {ArrowLeft, ArrowRight} from "lucide-react";
import "./SongHistoryButtonFooter.css"
import {getErrorMessage} from "../../../api/messages.ts";
import type {Dispatch, SetStateAction} from "react";
import {getUserSongHistoryNext, getUserSongHistoryPrevious} from "../../../api/song.ts";

export default function SongHistoryButtonFooter({songHistory, setSongHistory, setLoading, setError}: {
    songHistory: SongHistory,
    setSongHistory: Dispatch<SetStateAction<SongHistory | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string | null>>;
}) {
    async function loadSongHistory(fetchFn: (date: string) => Promise<SongHistory>, date?: string) {
        if (!date) return;
        setLoading(true);

        try {
            const data = await fetchFn(date);
            setSongHistory(data);
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
                    onClick={() => loadSongHistory(getUserSongHistoryPrevious, songHistory.previousDate)}><ArrowLeft
                size={16}/>
            </button>
        }
        {
            songHistory.hasMoreNext &&
            <button onClick={() => loadSongHistory(getUserSongHistoryNext, songHistory.nextDate)}
                    className="song-history-footer-btn">
                <ArrowRight size={16}/>
            </button>
        }
    </div>
}