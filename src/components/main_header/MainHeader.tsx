import "./MainHeader.css";
import Clock from "./clock/Clock.tsx";
import {History, LogOutIcon, Settings} from "lucide-react";
import {Link, useLocation} from "react-router";
import Button from "../common/button/Button.tsx";

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
                <Link title="SongHistory" to="/history" className="main-header-btn">
                    <History size={18}/>
                </Link>
                {
                    !isSettingsPage &&
                    <Link title="Settings" to="/settings"
                          className="main-header-btn"><Settings
                        size={18}/></Link>
                }
                <Button buttonText="Logout" onClick={onLogout} className="main-header-btn"
                        icon={<LogOutIcon size={18}/>}/>
            </div>
        </header>
    );
}