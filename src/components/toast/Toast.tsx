import "./Toast.css";

export default function Toast({message, onClose}: {
    message: string;
    onClose: () => void;
}) {
    return (
        <div className="toast">
            <span className="toast-message">{message}</span>

            <button
                className="toast-close"
                onClick={onClose}
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    );
};