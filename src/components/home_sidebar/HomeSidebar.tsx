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
                <div className="sidebar-timeline">
                    {songHistory.map((song: SongOfDay, index: number) => (
                        <div key={index} className="timeline-item">
                            <div
                                className="timeline-dot"
                                data-first={index === 0 ? "true" : undefined}
                                data-last={index === songHistory.length - 1 ? "true" : undefined}
                            />
                            <HomeSidebarSong song={song}/>
                        </div>
                    ))}
                </div>
            }
        </aside>
    )
}