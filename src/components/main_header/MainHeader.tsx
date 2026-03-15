import "./MainHeader.css";
import Clock from "./clock/Clock.tsx";
import {LogOutIcon, Settings} from "lucide-react";
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
                    <Link title="Settings" to="/settings"
                          className="settings-btn"><Settings
                        size={18}/></Link>
                }
                <button
                    title="Logout"
                    className="layout-logout-button settings-btn"
                    onClick={onLogout}
                >
                    <LogOutIcon size={18}/>
                </button>
            </div>
        </header>
    );
}