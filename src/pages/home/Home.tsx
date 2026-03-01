import {useAuth} from "../../auth/AuthContext.tsx";
import Layout from "../../components/layout/Layout.tsx";
import TodaySongHeader
    from "../../components/today_song_header/TodaySongHeader.tsx";
import SongOfDayContainer
    from "../../components/song_of_day/song_of_day_container/SongOfDayContainer.tsx";
import {useState} from "react";
import {type SongOfDay} from "../../api/song.ts";
import HomeSidebar from "../../components/home_sidebar/HomeSidebar.tsx";
import "./Home.css"

export default function Home() {
    const [song, setSong] = useState<SongOfDay | null>(null);
    const {appUser, logout} = useAuth();

    if (!appUser) {
        return null;
    }

    return (
        <Layout displayName={appUser.appUserName} onLogout={logout}>
            <div className="home-layout">
                <HomeSidebar/>
                <div className="home-main">
                    <TodaySongHeader song={song} setSong={setSong}/>
                    <SongOfDayContainer song={song} setSong={setSong}/>
                </div>
            </div>
        </Layout>
    );
}