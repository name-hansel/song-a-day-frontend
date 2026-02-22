import type {ReactNode} from "react";
import "./Layout.css";

export default function Layout({children, displayName, onLogout}: {
    children: ReactNode, displayName: string, onLogout: () => Promise<void>
}) {
    return (
        <div className="layout">
            <header className="layout-header">
                <h1 className="layout-title">song a day</h1>
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
            <main className="layout-main">
                {children}
            </main>
        </div>
    )
}