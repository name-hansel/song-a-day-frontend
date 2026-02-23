import "./MainHeader.css";
import {useAuth} from "../../auth/AuthContext.tsx";

export default function MainHeader({displayName, onLogout}: {
    displayName: string,
    onLogout: () => Promise<void>
}) {
    const {appUser} = useAuth();

    return (
        <header className="layout-header">
            <h1 className="layout-title">SaD: {appUser?.formattedDateForToday}</h1>
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