import "./HomeSidebar.css"
import {useEffect, useState} from "react";
import Spinner from "../../pages/spinner/Spinner.tsx";
import HomeSidebarSong from "./home_sidebar_song/HomeSidebarSong.tsx";
import {getErrorMessage} from "../../api/messages.ts";
import ErrorBanner from "../common/error_banner/ErrorBanner.tsx";
import type {SongOfDay} from "../../types/SongOfDay.ts";
import {getUserSongHistoryForWeek} from "../../api/song.ts";
import {ArrowLeft, ArrowRight} from "lucide-react";

export default function HomeSidebar({songForToday}: {
    songForToday?: SongOfDay
}) {
    const [songHistory, setSongHistory] = useState<SongOfDay[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [collapsed, setCollapsed] = useState(false);

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
        <aside className={`home-sidebar ${collapsed ? "collapsed" : ""}`}>
            {
                collapsed ? <button
                        className="sidebar-expand-btn"
                        onClick={() => setCollapsed(false)}
                        aria-label="Expand sidebar"
                    >
                        <ArrowRight size={16}/>
                    </button> :
                    <>
                        <div className="sidebar-header">
                            <div className="sidebar-title">week so far</div>

                            <button
                                className="sidebar-collapse-btn"
                                onClick={() => setCollapsed(true)}
                                aria-label="Collapse sidebar"
                            >
                                <ArrowLeft size={16}/>
                            </button>
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
                                {
                                    songHistory &&
                                    songHistory.map((song: SongOfDay, index: number) => (
                                        <HomeSidebarSong
                                            song={song}
                                            key={index}
                                            isLatest={index === songHistory.length - 1}
                                        />
                                    ))
                                }
                            </div>
                        }
                    </>
            }
        </aside>
    )
}