import Layout from "../../components/layout/Layout.tsx";
import HomeSidebar from "../../components/home_sidebar/HomeSidebar.tsx";
import {Navigate, Outlet} from "react-router";
import {useState} from "react";
import {useAuth} from "../../auth/AuthContext.tsx";
import type {SongOfDay} from "../../types/SongOfDay.ts";

export function SongOfDay() {
    const [song, setSong] = useState<SongOfDay | null>(null);
    const {appUser, logout} = useAuth();

    if (!appUser) {
        return <Navigate to="/login" replace/>;
    }

    return (
        <Layout displayName={appUser.appUserName} onLogout={logout}>
            <div className="home-layout">
                <HomeSidebar/>

                <div className="container">
                    <Outlet context={{song, setSong}}/>
                </div>
            </div>
        </Layout>
    );
}