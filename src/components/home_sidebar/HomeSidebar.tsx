import "./HomeSidebar.css"
import {getUserSongHistoryForWeek, type SongOfDay} from "../../api/song.ts";
import {useEffect, useState} from "react";
import Spinner from "../../pages/spinner/Spinner.tsx";
import HomeSidebarSong from "./home_sidebar_song/HomeSidebarSong.tsx";
import {getErrorMessage} from "../../api/messages.ts";
import ErrorBanner from "../error_banner/ErrorBanner.tsx";

export default function HomeSidebar({songForToday}: {
    songForToday?: SongOfDay
}) {
    const [songHistory, setSongHistory] = useState<SongOfDay[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getSongHistory() {
            try {
                setLoading(true);
                const data = await getUserSongHistoryForWeek();
                setSongHistory(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(getErrorMessage(err.message));
                }
            } finally {
                setLoading(false);
            }
        }

        void getSongHistory();
    }, [songForToday])

    return (
        <aside className="home-sidebar">
            <div className="sidebar-title">
                week so far
            </div>
            {
                loading && <Spinner/>
            }
            {
                error && <ErrorBanner message={error}/>
            }
            {
                !error &&
                <div className="sidebar-content">
                    {songHistory && songHistory.map((song: SongOfDay, index: number) => (
                        <HomeSidebarSong song={song}
                                         key={index}
                                         isLatest={index === songHistory.length - 1}/>
                    ))}
                </div>
            }
        </aside>
    )
}