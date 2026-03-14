import "./MainHeader.css";
import Clock from "./clock/Clock.tsx";
import {Settings} from "lucide-react";
import {Link, useLocation} from "react-router";

export default function MainHeader({displayName, onLogout}: {
    displayName: string,
    onLogout: () => Promise<void>
}) {
    const location = useLocation();
    const isSettingsPage = location.pathname === "/settings";

    return (
        <header className="layout-header">
            <h1 className="layout-title" onClick={() => {
                window.location.href = "/";
            }}>SaD</h1>
            <Clock/>
            <div className="layout-header-right">
                <span className="layout-username">{displayName}</span>
                {
                    !isSettingsPage &&
                    <Link to="/settings" className="settings-btn"><Settings
                        size={18}/></Link>
                }
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