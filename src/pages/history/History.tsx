import HomeSidebar from "../../components/home_sidebar/HomeSidebar.tsx";
import {Navigate} from "react-router";
import Layout from "../../components/layout/Layout.tsx";
import {useAuth} from "../../auth/AuthContext.tsx";
import {useEffect, useState} from "react";
import {getErrorMessage} from "../../api/messages.ts";
import {getUserSongHistory} from "../../api/song.ts";
import type {SongHistory} from "../../types/SongHistory.ts";
import ErrorBanner from "../../components/common/error_banner/ErrorBanner.tsx";
import Spinner from "../spinner/Spinner.tsx";

export default function History() {
    const {appUser, logout} = useAuth();
    const [songHistory, setSongHistory] = useState<SongHistory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getHistory() {
            try {
                const userSongHistory = await getUserSongHistory();
                setSongHistory(userSongHistory);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(getErrorMessage(err.message));
                }
            } finally {
                setLoading(false);
            }
        }

        void getHistory();
    }, []);

    if (!appUser) {
        return <Navigate to="/login" replace/>;
    }

    return (<Layout displayName={appUser.appUserName} onLogout={logout}>
        <div className="home-layout">
            <HomeSidebar/>

            <div className="container">
                {
                    error && <ErrorBanner message={error}/>
                }
                <div className="page-centered-content">
                    {
                        loading && <Spinner/>
                    }
                    {
                        !loading && !songHistory?.history &&
                        <h1 className="msg">No songs logged yet!</h1>
                    }
                    {
                        !loading && songHistory?.history && <h1>Hello</h1>
                    }
                </div>
            </div>
        </div>
    </Layout>);
}