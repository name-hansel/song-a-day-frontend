import {useAuth} from "../../auth/AuthContext.tsx";
import {Navigate, useNavigate, useSearchParams} from "react-router";
import Layout from "../../components/layout/Layout.tsx";
import {useEffect, useState} from "react";
import "./Settings.css"
import Spinner from "../spinner/Spinner.tsx";
import ErrorBanner from "../../components/error_banner/ErrorBanner.tsx";
import {getErrorMessage} from "../../api/messages.ts";
import {getTimezones, saveTimezone} from "../../api/settings.ts";
import type {Timezone} from "../../types/Timezone.ts";

export default function Settings() {
    const {appUser, logout} = useAuth();
    const navigate = useNavigate();
    const [timezone, setTimezone] = useState(appUser?.timezone);
    const [timezones, setTimezones] = useState<Timezone[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [params] = useSearchParams();
    const newUser = params.get("newUser") === "true";

    useEffect(() => {
        async function loadTimezones() {
            try {
                const data = await getTimezones();
                setTimezones(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(getErrorMessage(err.message));
                }
            } finally {
                setLoading(false);
            }
        }

        void loadTimezones();
    }, []);

    async function onSave() {
        if (!timezone) {
            return;
        }

        try {
            const savedTimezone = await saveTimezone(timezone);
            setTimezone(savedTimezone.value);
            // TODO: Show toast and update clock on main header
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getErrorMessage(err.message));
            }
        }
    }

    if (!appUser) {
        return <Navigate to="/login" replace/>;
    }

    return (
        <Layout displayName={appUser.appUserName} onLogout={logout}>
            <div className="home-layout">
                <section className="settings-card">
                    {
                        newUser &&
                        <div className="settings-banner">
                            <ErrorBanner
                                message={"Please confirm your timezone."}/>
                        </div>
                    }
                    <h1 className="settings-title">Settings</h1>

                    <div className="settings-content">
                        {
                            error && <ErrorBanner message={error}/>
                        }
                        {
                            loading && <Spinner/>
                        }
                        {
                            !loading && !error &&
                            <label className="settings-field">
                                <span className="settings-label">Select your timezone</span>

                                <select
                                    className="settings-select"
                                    value={timezone}
                                    onChange={(e) => setTimezone(e.target.value)}
                                >
                                    {
                                        timezones.map(tz => (
                                            <option key={tz.value}
                                                    value={tz.value}>
                                                {tz.label}
                                            </option>
                                        ))
                                    }
                                </select>
                            </label>
                        }
                    </div>

                    <footer className="settings-actions">
                        <button className="settings-button-primary"
                                onClick={onSave}
                        >
                            Save
                        </button>
                        <button className="settings-button-secondary"
                                onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                    </footer>
                </section>
            </div>
        </Layout>
    )
}