import type {SongHistory} from "../../../types/SongHistory.ts";
import {ArrowLeft, ArrowRight} from "lucide-react";
import "./SongHistoryButtonFooter.css"

export default function SongHistoryButtonFooter({songHistory}: {
    songHistory?: SongHistory
}) {
    return <div>
        {/*TODO: Styling for both buttons*/}
        {/*TODO: Test previous and next buttons*/}
        {
            songHistory?.hasMoreNext && <button
                className="song-history-action-btn">
                Next <ArrowRight className="next-song-history-btn-arrow" size={16}/>
            </button>
        }
        {
            songHistory?.hasMorePrevious &&
            <button className="song-history-action-btn">Previous <ArrowLeft
                className="next-song-history-btn-arrow" size={16}/>
            </button>
        }
    </div>
}