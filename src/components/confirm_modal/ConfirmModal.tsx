import "./ConfirmModal.css"

export default function ConfirmModal({
                                         title,
                                         message,
                                         confirmButtonText = "Confirm",
                                         cancelButtonText = "Cancel",
                                         onConfirm,
                                         onCancel, danger = false
                                     }: {
    title: string,
    message: string,
    confirmButtonText?: string,
    cancelButtonText?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    danger?: boolean
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
                    <button
                        className={`modal-btn-primary ${
                            danger ? "modal-btn-danger" : ""
                        }`}
                        onClick={onConfirm}
                    >
                        {confirmButtonText}
                    </button>
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