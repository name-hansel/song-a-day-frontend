import {ToastProvider} from "../../context/ToastContext.tsx";
import Layout from "../../components/layout/Layout.tsx";
import HomeSidebar from "../../components/home_sidebar/HomeSidebar.tsx";
import {Outlet} from "react-router";
import {useState} from "react";
import {useAuth} from "../../auth/AuthContext.tsx";
import type {SongOfDay} from "../../api/song.ts";

export function SongOfDay() {
    const [song, setSong] = useState<SongOfDay | null>(null);
    const {appUser, logout} = useAuth();

    if (!appUser) {
        return null;
    }

    return (
        <ToastProvider>
            <Layout displayName={appUser.appUserName} onLogout={logout}>
                <div className="home-layout">
                    <HomeSidebar songForToday={song}/>

                    <div className="home-main">
                        <div className="container">
                            <Outlet context={{song, setSong}}/>
                        </div>
                    </div>
                </div>
            </Layout>
        </ToastProvider>
    );
}