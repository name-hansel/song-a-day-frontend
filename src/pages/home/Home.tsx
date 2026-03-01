import {useAuth} from "../../auth/AuthContext.tsx";
import Layout from "../../components/layout/Layout.tsx";
import TodaySongHeader
    from "../../components/today_song_header/TodaySongHeader.tsx";
import SongOfDayContainer
    from "../../components/song_of_day/song_of_day_container/SongOfDayContainer.tsx";
import {useEffect, useState} from "react";
import {type SongOfDay} from "../../api/song.ts";
import HomeSidebar from "../../components/home_sidebar/HomeSidebar.tsx";
import "./Home.css"
import type {TrackSearch} from "../../api/search.ts";
import {useNavigate, useParams} from "react-router";

export default function Home() {
    const [song, setSong] = useState<SongOfDay | null>(null);
    const {appUser, logout} = useAuth();
    const [pendingSong, setPendingSong] = useState<TrackSearch | null>(null);

    const navigate = useNavigate();
    const {trackId} = useParams<{ trackId: string }>();

    useEffect(() => {
        if (!pendingSong && trackId) {
            // TODO: Fetch from backend
        }
    }, [trackId, pendingSong, navigate]);

    if (!appUser) {
        return null;
    }

    const handleSelectProposal = (song: TrackSearch) => {
        setPendingSong(song);
        navigate(`/log/${song.spotifyId}`)
    }

    const handleConfirmationCancel = () => {
        setPendingSong(null);
        navigate("/");
    }

    return (
        <Layout displayName={appUser.appUserName} onLogout={logout}>
            <div className="home-layout">
                <HomeSidebar songForToday={song}/>

                <div className="home-main">
                    <TodaySongHeader song={song}
                                     pendingSong={pendingSong}
                                     handleSelectProposal={handleSelectProposal}/>
                    <SongOfDayContainer song={song} setSong={setSong}
                                        pendingSong={pendingSong}
                                        onConfirmationCancel={handleConfirmationCancel}/>
                </div>
            </div>
        </Layout>
    );
}