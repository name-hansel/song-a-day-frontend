import type {SongHistory} from "../../../types/SongHistory.ts";
import {ArrowLeft, ArrowRight} from "lucide-react";
import "./SongHistoryButtonFooter.css"
import {getUserSongHistoryNext, getUserSongHistoryPrevious} from "../../../api/song.ts";

export default function SongHistoryButtonFooter({songHistory, setSongHistory}: {
    songHistory: SongHistory,
    setSongHistory: React.Dispatch<React.SetStateAction<SongHistory | null>>
}) {
    async function loadPreviousSongHistory() {
        const previousSongHistory = await getUserSongHistoryPrevious(songHistory.previousDate);
        setSongHistory(previousSongHistory);
    }

    async function loadNextSongHistory() {
        const nextSongHistory = await getUserSongHistoryNext(songHistory.nextDate);
        setSongHistory(nextSongHistory);
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