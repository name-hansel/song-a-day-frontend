import "./HomeSidebar.css"
import {useEffect, useState} from "react";
import Spinner from "../../pages/spinner/Spinner.tsx";
import HomeSidebarSong from "./song_card/HomeSidebarSong.tsx";
import ErrorBanner from "../common/error_banner/ErrorBanner.tsx";
import type {SongOfDay} from "../../types/SongOfDay.ts";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useSidebar} from "../../context/SidebarContext.tsx";

export default function HomeSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const {entries, loading, error, updateSidebar} = useSidebar();

    useEffect(() => {
        void updateSidebar();
    }, [updateSidebar]);

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
                                    entries &&
                                    entries.map((song: SongOfDay, index: number) => (
                                        <HomeSidebarSong
                                            song={song}
                                            key={index}
                                            isLatest={index === entries.length - 1}
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