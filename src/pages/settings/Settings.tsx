import {useAuth, useRequiredAuth} from "../../context/AuthContext.tsx";
import {useNavigate, useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import "./Settings.css"
import Spinner from "../spinner/Spinner.tsx";
import ErrorBanner from "../../components/common/error_banner/ErrorBanner.tsx";
import {getErrorMessage} from "../../api/messages.ts";
import {getTimezones, saveTimezone} from "../../api/settings.ts";
import type {Timezone} from "../../types/Timezone.ts";
import {useToast} from "../../context/ToastContext.tsx";
import ConfirmModal from "../../components/common/confirm_modal/ConfirmModal.tsx";
import {deleteUserAccount} from "../../api/auth.ts";
import SettingsFooter from "../../components/settings/footer/SettingsFooter.tsx";
import Button from "../../components/common/button/Button.tsx";

export default function Settings() {
    const {timezone} = useRequiredAuth();
    const {setAppUser} = useAuth();
    const {showToast} = useToast();
    const navigate = useNavigate();
    const [currentTimezone, setCurrentTimezone] = useState(timezone);
    const [timezones, setTimezones] = useState<Timezone[]>([]);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
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
        if (!currentTimezone) {
            return;
        }

        try {
            setSaveLoading(true);
            const updatedAppUser = await saveTimezone(currentTimezone);

            setAppUser(updatedAppUser);
            setCurrentTimezone(updatedAppUser.timezone);
            showToast("Settings saved successfully!");

            if (newUser) {
                navigate("/");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getErrorMessage(err.message));
            }
        } finally {
            setSaveLoading(false);
        }
    }

    async function handleDeleteAccount() {
        try {
            setDeleteAccountLoading(true);
            await deleteUserAccount();
            setAppUser(null);
            showToast("Account deleted successfully.");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getErrorMessage(err.message));
            }
        } finally {
            setDeleteAccountLoading(false);
        }
    }

    return (
        <>
            <div className="settings-layout">
                {
                    newUser &&
                    <div className="settings-banner">
                        <ErrorBanner
                            message={"Please confirm your timezone."}/>
                    </div>
                }
                <section className="settings-card">
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
                                    value={currentTimezone}
                                    onChange={(e) => setCurrentTimezone(e.target.value)}
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
                    {
                        !newUser && <div className="settings-danger">
                            <div className="settings-danger-text">
                            <span className="settings-danger-title">
                                Delete account
                            </span>
                                <span className="settings-danger-subtext">
                                This action is permanent and cannot be undone.
                            </span>
                            </div>
                            <Button className="settings-button-danger" onClick={() => setShowDeleteAccountModal(true)}
                                    buttonText="Delete Account" loading={loading}/>
                        </div>
                    }
                    <SettingsFooter onSave={onSave} saveLoading={saveLoading} newUser={newUser}/>
                </section>
            </div>
            {
                showDeleteAccountModal && <ConfirmModal
                    title="Delete account?"
                    message="This will permanently delete your account and all data."
                    confirmButtonText="Delete"
                    cancelButtonText="Cancel"
                    danger
                    onCancel={() => setShowDeleteAccountModal(false)}
                    onConfirm={handleDeleteAccount}
                    confirmLoading={deleteAccountLoading}
                />
            }
        </>
    )
}