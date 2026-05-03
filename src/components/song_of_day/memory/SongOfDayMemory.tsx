import {useState} from "react";
import {Check, Pencil, Trash, X} from "lucide-react";
import "./SongOfDayMemory.css"
import {MAX_MEMORY_LENGTH} from "../../../types/SongOfDay.ts";

export default function SongOfDayMemory({
                                            isEditableByDefault,
                                            memory,
                                            setMemory,
                                            confirmEdit
                                        }: {
    isEditableByDefault: boolean,
    memory: string,
    setMemory?: (memory: string) => void,
    confirmEdit?: (draftMemory: string | null) => Promise<void>,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftMemory, setDraftMemory] = useState(memory ?? "");

    function startEdit() {
        setDraftMemory(memory ?? "");
        setIsEditing(true);
    }

    function cancelEdit() {
        setDraftMemory(memory ?? "");
        setIsEditing(false);
    }

    if (isEditableByDefault) {
        if (!setMemory) return;

        return <><textarea
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            placeholder="Enter a memory..."
            maxLength={MAX_MEMORY_LENGTH}
            className="song-of-day-memory"/>
            <div className="song-of-day-memory-editing-div">
                <div className="song-of-day-memory-chars">
                    {`${memory.length}/${MAX_MEMORY_LENGTH}`}
                </div>
            </div>
        </>
    }

    if (!confirmEdit) {
        return;
    }

    return (
        <>
            <textarea
                maxLength={MAX_MEMORY_LENGTH}
                disabled={!isEditing}
                value={isEditing ? draftMemory : memory}
                onChange={(e) => setDraftMemory(e.target.value)}
                className="song-of-day-memory"/>
            {
                !isEditing &&
                <div className="song-of-day-memory-action-div">
                    <button
                        className="song-of-day-memory-action-btn"
                        onClick={startEdit}>
                        <Pencil size={18}/>
                    </button>
                    {
                        memory && <button className="song-of-day-memory-action-btn" onClick={() => {
                            void confirmEdit(null);
                        }}><Trash size={18}/></button>
                    }
                </div>
            }
            {
                isEditing &&
                <div className="song-of-day-memory-editing-div">
                    <div className="song-of-day-memory-chars">
                        {`${draftMemory.length}/${MAX_MEMORY_LENGTH}`}
                    </div>
                    <div className="song-of-day-memory-edit-btns">
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                void confirmEdit(draftMemory);
                            }}
                            className="song-of-day-memory-action-btn">
                            <Check size={18}/>
                        </button>
                        <button
                            className="song-of-day-memory-action-btn"
                            onClick={cancelEdit}>
                            <X size={18}/>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}