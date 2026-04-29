import type {SongHistory} from "../../../types/SongHistory.ts";
import {ArrowLeft, ArrowRight} from "lucide-react";
import "./SongHistoryButtonFooter.css"

export default function SongHistoryButtonFooter({songHistory}: {
    songHistory?: SongHistory
}) {
    return <div className="song-history-btn-footer">
        {/*TODO: Test previous and next buttons*/}
        {
            songHistory?.hasMorePrevious &&
            <button className="song-history-footer-btn">Previous <ArrowLeft
                className="song-history-btn-arrow" size={16}/>
            </button>
        }
        {
            songHistory?.hasMoreNext && <button
                className="song-history-footer-btn">
                Next <ArrowRight className="song-history-btn-arrow" size={16}/>
            </button>
        }
    </div>
}