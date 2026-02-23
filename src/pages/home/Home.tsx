import {useAuth} from "../../auth/AuthContext.tsx";
import Layout from "../../components/layout/Layout.tsx";
import TodaySongHeader
    from "../../components/todaysongheader/TodaySongHeader.tsx";
import SongOfDayContainer
    from "../../components/SongOfDay/songofdaycontainer/SongOfDayContainer.tsx";
import {useState} from "react";
import {type SongOfDay} from "../../api/song.ts";

export default function Home() {
    const [song, setSong] = useState<SongOfDay | null>(null);
    const {appUser, logout} = useAuth();

    if (!appUser) {
        return null;
    }

    return (
        <Layout displayName={appUser.appUserName} onLogout={logout}>
            <TodaySongHeader song={song} setSong={setSong}/>
            <SongOfDayContainer song={song} setSong={setSong}/>
        </Layout>
    );
}