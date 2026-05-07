import {useState} from "react";
import {Check, Pencil, Trash, X} from "lucide-react";
import "./SongOfDayMemory.css"
import {MAX_MEMORY_LENGTH} from "../../../types/SongOfDay.ts";
import Button from "../../common/button/Button.tsx";

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
                    <Button className="song-of-day-memory-action-btn" onClick={startEdit} icon={<Pencil size={18}/>}/>
                    {
                        memory &&
                        <Button onClick={() => confirmEdit(null)} className="song-of-day-memory-action-btn"
                                icon={<Trash size={18}/>}/>
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
                        <Button onClick={() => {
                            setIsEditing(false);
                            void confirmEdit(draftMemory);
                        }} className="song-of-day-memory-action-btn" icon={<Check size={18}/>}/>
                        <Button className="song-of-day-memory-action-btn" onClick={cancelEdit} icon={<X size={18}/>}/>
                    </div>
                </div>
            }
        </>
    )
}