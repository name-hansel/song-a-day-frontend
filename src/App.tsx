import './App.css'
import {AuthProvider} from "./context/AuthContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import LogSongConfirmation from "./components/log_song_confirmation/LogSongConfirmation.tsx";
import Login from "./pages/login/Login.tsx";
import Settings from "./pages/settings/Settings.tsx";
import {ToastProvider} from "./context/ToastContext.tsx";
import NotFound from "./pages/not_found/NotFound.tsx";
import SongHistory from "./pages/history/SongHistory.tsx";
import RootLayout from "./pages/layout/root_layout/RootLayout.tsx";
import AppLayout from "./pages/layout/app_layout/AppLayout.tsx";
import SongOfDayLayout from "./pages/layout/song_of_day_layout/SongOfDayLayout.tsx";
import SongOfDay from "./components/song_of_day/SongOfDay.tsx";

function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>

                        {/* Header wrapper */}
                        <Route element={<PrivateRoute><RootLayout/></PrivateRoute>}>
                            {/*  Header + sidebar  */}
                            <Route element={
                                <AppLayout/>
                            }>
                                <Route element={<SongOfDayLayout/>}>
                                    <Route index element={<SongOfDay/>}/>
                                    <Route path="/song-a-day/:date" element={<SongOfDay/>}/>
                                </Route>
                                <Route path="/log/:trackId" element={<LogSongConfirmation/>}/>
                                <Route path="history" element={<SongHistory/>}/>
                            </Route>

                            {/* Header only (no sidebar) */}
                            <Route path="/settings" element={
                                <PrivateRoute>
                                    <Settings/>
                                </PrivateRoute>
                            }/>
                        </Route>

                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ToastProvider>
    )
}

export default App
