export default function LogSongConfirmation({onConfirmationCancel}: {
    onConfirmationCancel: () => void;
}) {
    return <div>
        <h1>Need confirmation</h1>
        <button onClick={() => onConfirmationCancel()}>Cancel</button>
    </div>
}