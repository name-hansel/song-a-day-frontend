import {ArrowLeft, ArrowRight} from "lucide-react";
import "./SongHistoryButtonFooter.css"
import Button from "../../common/button/Button.tsx";

export default function SongHistoryButtonFooter({hasMorePrevious, hasMoreNext, handleNext, handlePrevious}: {
    hasMorePrevious: boolean,
    hasMoreNext: boolean,
    handleNext: () => void,
    handlePrevious: () => void
}) {

    return <div className="song-history-btn-footer">
        {
            hasMorePrevious &&
            <Button className="song-history-footer-btn" onClick={handlePrevious} icon={<ArrowLeft
                size={16}/>}
            />
        }
        {
            hasMoreNext &&
            <Button onClick={handleNext} className="song-history-footer-btn" icon={<ArrowRight size={16}/>}/>
        }
    </div>
}