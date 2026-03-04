import {useAuth} from "../../auth/AuthContext.tsx";
import Layout from "../../components/layout/Layout.tsx";
import TodaySongHeader
    from "../../components/today_song_header/TodaySongHeader.tsx";
import * as React from "react";
import {useState} from "react";
import {type SongOfDay} from "../../api/song.ts";
import HomeSidebar from "../../components/home_sidebar/HomeSidebar.tsx";
import "./Home.css"
import {Outlet, useNavigate} from "react-router";

export type SongOfDayContext = {
    song: SongOfDay | null;
    setSong: React.Dispatch<React.SetStateAction<SongOfDay | null>>;
}

export default function Home() {
    const [song, setSong] = useState<SongOfDay | null>(null);
    const {appUser, logout} = useAuth();
    const navigate = useNavigate();

    if (!appUser) {
        return null;
    }

    const onSelect = (trackId: string) => {
        navigate(`/log/${trackId}`);
    }

    return (
        <Layout displayName={appUser.appUserName} onLogout={logout}>
            <div className="home-layout">
                <HomeSidebar songForToday={song}/>

                <div className="home-main">
                    <TodaySongHeader onSelect={onSelect}/>
                    <div className="container">
                        <Outlet context={{song, setSong}}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
}