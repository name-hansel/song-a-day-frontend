import {ArrowLeft, ArrowRight} from "lucide-react";
import "./SongHistoryButtonFooter.css"

export default function SongHistoryButtonFooter({hasMorePrevious, hasMoreNext, handleNext, handlePrevious}: {
    hasMorePrevious: boolean,
    hasMoreNext: boolean,
    handleNext: () => void,
    handlePrevious: () => void
}) {

    return <div className="song-history-btn-footer">
        {
            hasMorePrevious &&
            <button className="song-history-footer-btn"
                    onClick={handlePrevious}><ArrowLeft
                size={16}/>
            </button>
        }
        {
            hasMoreNext &&
            <button onClick={handleNext}
                    className="song-history-footer-btn">
                <ArrowRight size={16}/>
            </button>
        }
    </div>
}