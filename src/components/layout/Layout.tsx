import type {ReactNode} from "react";
import "./Layout.css";
import MainHeader from "../MainHeader/MainHeader.tsx";

export default function Layout({children, displayName, onLogout}: {
    children: ReactNode, displayName: string, onLogout: () => Promise<void>
}) {
    return (
        <div className="layout">
            <MainHeader displayName={displayName} onLogout={onLogout}/>
            <main className="layout-main">
                {children}
            </main>
        </div>
    )
}