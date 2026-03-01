import "./MainHeader.css";
import Clock from "./clock/Clock.tsx";

export default function MainHeader({displayName, onLogout}: {
    displayName: string,
    onLogout: () => Promise<void>
}) {
    return (
        <header className="layout-header">
            <h1 className="layout-title">SaD</h1>
            <Clock/>
            <div className="layout-header-right">
                <span className="layout-username">{displayName}</span>
                <button
                    className="layout-logout-button"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}