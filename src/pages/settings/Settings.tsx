import {ToastProvider} from "../../context/ToastContext.tsx";
import {useAuth} from "../../auth/AuthContext.tsx";
import {Navigate, useNavigate} from "react-router";
import Layout from "../../components/layout/Layout.tsx";
import {useState} from "react";
import "./Settings.css"

export default function Settings() {
    const {appUser, logout} = useAuth();
    const navigate = useNavigate();
    const [timezone, setTimezone] = useState(appUser?.timezone);

    if (!appUser) {
        return <Navigate to="/login" replace/>;
    }

    return (
        <ToastProvider>
            <Layout displayName={appUser.appUserName} onLogout={logout}>
                <div className="home-layout">
                    <section className="settings-card">
                        <h1 className="settings-title">Settings</h1>

                        <div className="settings-content">
                            <label className="settings-field">
                                <span className="settings-label">Select your timezone</span>

                                <select
                                    className="settings-select"
                                    value={timezone}
                                    onChange={(e) => setTimezone(e.target.value)}
                                >
                                    <option value="UTC">UTC</option>
                                    <option value="Asia/Kolkata">Asia/Kolkata
                                    </option>
                                    <option
                                        value="Europe/London">Europe/London
                                    </option>
                                    <option
                                        value="America/New_York">America/New_York
                                    </option>
                                </select>
                            </label>
                        </div>

                        <footer className="settings-actions">
                            <button className="settings-button-primary"
                                // onClick={handleSave}
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
        </ToastProvider>
    )
}