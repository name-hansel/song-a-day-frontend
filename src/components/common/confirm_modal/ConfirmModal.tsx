import "./ConfirmModal.css"
import Button from "../button/Button.tsx";

export default function ConfirmModal({
                                         title,
                                         message,
                                         confirmButtonText = "Confirm",
                                         cancelButtonText = "Cancel",
                                         onConfirm,
                                         onCancel, danger = false,
                                         confirmLoading = false,
                                     }: {
    title: string,
    message: string,
    confirmButtonText?: string,
    cancelButtonText?: string,
    onConfirm: () => void,
    onCancel: () => void,
    danger?: boolean,
    confirmLoading: boolean
}) {
    return (
        <div className="modal-backdrop" onClick={onCancel}>
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="modal-title">{title}</h2>
                <p className="modal-text">{message}</p>
                <div className="modal-actions">
                    <Button className={`modal-btn-primary ${
                        danger ? "modal-btn-danger" : ""
                    }`} onClick={onConfirm} buttonText={confirmButtonText} loading={confirmLoading}/>
                    <button
                        className="modal-btn-secondary"
                        onClick={onCancel}
                    >
                        {cancelButtonText}
                    </button>
                </div>
            </div>
        </div>
    )
}