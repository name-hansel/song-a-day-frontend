import {useState} from "react";
import {Check, Pencil, X} from "lucide-react";
import "./SongOfDayMemory.css"

export default function SongOfDayMemory({
                                            isEditableByDefault,
                                            memory,
                                            setMemory,
                                            confirmEdit
                                        }: {
    isEditableByDefault: boolean,
    memory: string,
    setMemory: (memory: string) => void,
    confirmEdit?: (draftMemory: string) => Promise<void>
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftMemory, setDraftMemory] = useState(memory ?? "");

    function startEdit() {
        setDraftMemory(memory ?? "")
        setIsEditing(true)
    }

    function cancelEdit() {
        setDraftMemory(memory ?? "")
        setIsEditing(false)
    }

    if (isEditableByDefault) {
        return <textarea
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            placeholder="Enter a memory..."
            maxLength={160}
            className="song-of-day-memory"
        />
    }

    if (!confirmEdit) {
        return;
    }

    return (
        <>
            <textarea
                maxLength={160}
                disabled={!isEditing}
                value={isEditing ? draftMemory : memory}
                onChange={(e) => setDraftMemory(e.target.value)}
                className="song-of-day-memory"/>
            <div
                className="song-of-day-memory-header">
                {
                    !isEditing && <button
                        className="song-of-day-memory-edit"
                        onClick={startEdit}>
                        <Pencil size={18}/>
                    </button>
                }
                {
                    isEditing &&
                    <>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                void confirmEdit(draftMemory);
                            }}
                            className="song-of-day-memory-edit">
                            <Check size={18}/>
                        </button>
                        <button
                            className="song-of-day-memory-edit"
                            onClick={cancelEdit}>
                            <X size={18}/>
                        </button>
                    </>
                }
            </div>
        </>
    )
}