import {Grid, List} from "lucide-react";
import "./SongHistoryHeader.css"

export default function SongHistoryHeader({setEntriesNumber, view, handleViewToggle}: {
    setEntriesNumber: (value: (((prevState: number) => number) | number)) => void,
    view: "list" | "grid",
    handleViewToggle: () => void
}) {
    return (
        <div className="history-page-header">
            <h1 className="history-title">Song History</h1>
            <div className="history-page-header-action-div">
                <div className="entries-number-div">
                    <label htmlFor="entries-number" className="entries-number-label">Show</label>
                    <select onChange={(e) => setEntriesNumber(Number(e.target.value))} id="entries-number"
                            className="entries-number-select" defaultValue={10}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <button onClick={handleViewToggle}>
                    {view == "list" ? <Grid size={16}/> : <List size={16}/>}
                </button>
            </div>
        </div>
    )
}