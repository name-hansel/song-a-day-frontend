import HomeSidebar from "../../components/home_sidebar/HomeSidebar.tsx";
import {Navigate, useNavigate, useSearchParams} from "react-router";
import Layout from "../../components/layout/Layout.tsx";
import {useAuth} from "../../auth/AuthContext.tsx";
import {useEffect, useState} from "react";
import {getErrorMessage} from "../../api/messages.ts";
import {getUserSongHistory} from "../../api/song.ts";
import type {SongHistory} from "../../types/SongHistory.ts";
import ErrorBanner from "../../components/common/error_banner/ErrorBanner.tsx";
import Spinner from "../spinner/Spinner.tsx";
import {groupSongHistoryByMonth} from "../../utils/HistoryUtils.ts";
import SongHistoryGroup from "../../components/history/group/SongHistoryGroup.tsx";
import "./SongHistory.css"
import SongHistoryButtonFooter from "../../components/history/button_footer/SongHistoryButtonFooter.tsx";
import {Grid, List} from "lucide-react";

export default function SongHistory() {
    const {appUser, logout} = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [songHistory, setSongHistory] = useState<SongHistory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<"list" | "grid">("list");
    const [entriesNumber, setEntriesNumber] = useState<number>(10);

    useEffect(() => {
        const beforeDate = searchParams.get("before");
        const afterDate = searchParams.get("after");

        async function getHistory(beforeDate: string | null, afterDate: string | null) {
            setLoading(true);
            try {
                const userSongHistory = await getUserSongHistory(beforeDate, afterDate, entriesNumber);
                setSongHistory(userSongHistory);

                const viewParam = searchParams.get("view");
                if (viewParam === "list" || viewParam === "grid") {
                    setView(viewParam);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(getErrorMessage(err.message));
                }
            } finally {
                setLoading(false);
            }
        }

        void getHistory(beforeDate, afterDate);
    }, [entriesNumber, searchParams]);

    if (!appUser) {
        return <Navigate to="/login" replace/>;
    }

    const handleNext = () => {
        if (songHistory?.nextDate) {
            const params = new URLSearchParams(searchParams);
            params.set("before", songHistory.nextDate);
            params.delete("after");
            navigate(`?${params.toString()}`);
        }
    }

    const handlePrevious = () => {
        if (songHistory?.previousDate) {
            const params = new URLSearchParams(searchParams);
            params.set("after", songHistory.previousDate);
            params.delete("before");
            navigate(`?${params.toString()}`);
        }
    }

    const handleViewToggle = () => {
        const params = new URLSearchParams(searchParams);
        params.set("view", view === "list" ? "grid" : "list");
        navigate(`?${params.toString()}`);
    };

    return (<Layout displayName={appUser.appUserName} onLogout={logout}>
        <div className="home-layout">
            <HomeSidebar/>
            <div className="home-main">
                <div className="history-page-header">
                    <h1 className="history-title">Song History</h1>
                    <div className="history-page-header-action-div">
                        <div className="entries-number-div">
                            <label htmlFor="entries-number" className="entries-number-label">Show</label>
                            <select onChange={(e) => setEntriesNumber(Number(e.target.value))} id="entries-number"
                                    className="entries-number-select" defaultValue={10}>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                        <button onClick={handleViewToggle}>
                            {
                                view == "list" ? <Grid size={16}/> : <List size={16}/>
                            }
                        </button>
                    </div>
                </div>
                <div className="container">
                    {
                        error && <ErrorBanner message={error}/>
                    }
                    {
                        !loading && !error && songHistory && songHistory.history &&
                        <div className="song-history-container">
                            <div className={`song-history ${view}`}>
                                {
                                    groupSongHistoryByMonth(songHistory.history).map(group => (
                                        <SongHistoryGroup group={group} view={view}/>
                                    ))
                                }
                            </div>
                            <SongHistoryButtonFooter hasMorePrevious={songHistory.hasMorePrevious}
                                                     hasMoreNext={songHistory.hasMoreNext}
                                                     handleNext={handleNext} handlePrevious={handlePrevious}/>
                        </div>
                    }
                    <div className="page-centered-content">
                        {
                            loading && !error && <Spinner/>
                        }
                        {
                            !loading && !error && !songHistory?.history &&
                            <h1 className="msg">No songs logged yet!</h1>
                        }
                    </div>
                </div>
            </div>
        </div>
    </Layout>);
}