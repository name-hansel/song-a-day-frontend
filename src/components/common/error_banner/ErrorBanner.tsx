import "./ErrorBanner.css";

export default function ErrorBanner({message, onClose}: {
    message: string;
    onClose?: () => void;
}) {
    return (
        <div className="error-banner" role="alert">
            <span className="error-banner__text">{message}</span>

            {onClose && (
                <button
                    className="error-banner__close"
                    onClick={onClose}
                    aria-label="Dismiss error"
                >
                    ×
                </button>
            )}
        </div>
    );
}