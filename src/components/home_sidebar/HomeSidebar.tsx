import "./HomeSidebar.css"
import {getUserSongHistoryForWeek, type SongOfDay} from "../../api/song.ts";
import {useEffect, useState} from "react";
import Spinner from "../../pages/spinner/Spinner.tsx";
import HomeSidebarSong from "./home_sidebar_song/HomeSidebarSong.tsx";

export default function HomeSidebar() {
    const [songHistory, setSongHistory] = useState<SongOfDay[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getSongHistory() {
            try {
                setLoading(true);
                const data = await getUserSongHistoryForWeek();
                setSongHistory(data);
            } catch {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        }

        getSongHistory();
    }, [])

    return (
        <aside className="home-sidebar">
            <div className="sidebar-title">
                week so far
            </div>
            {
                loading && <Spinner/>
            }
            {
                error && <p>Error</p>
            }
            {
                <div className="sidebar-content">
                    {songHistory.map((song: SongOfDay, index: number) => (
                        <HomeSidebarSong song={song}
                                         isLatest={index === songHistory.length - 1}/>
                    ))}
                </div>
            }
        </aside>
    )
}