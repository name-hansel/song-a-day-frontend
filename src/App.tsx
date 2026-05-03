import './App.css'
import {AuthProvider} from "./context/AuthContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import Home from "./pages/home/Home.tsx";
import LogSongConfirmation from "./components/log_song_confirmation/LogSongConfirmation.tsx";
import SongOfDay from "./components/song_of_day/SongOfDay.tsx";
import Login from "./pages/login/Login.tsx";
import Settings from "./pages/settings/Settings.tsx";
import {ToastProvider} from "./context/ToastContext.tsx";
import NotFound from "./pages/not_found/NotFound.tsx";
import SongHistory from "./pages/history/SongHistory.tsx";
import RootLayout from "./pages/root_layout/RootLayout.tsx";
import AppLayout from "./pages/app_layout/AppLayout.tsx";

function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>

                        {/* Header wrapper */}
                        <Route element={<RootLayout/>}>
                            {/*  Header + sidebar  */}
                            <Route element={
                                <PrivateRoute>
                                    <AppLayout/>
                                </PrivateRoute>
                            }>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/log/:trackId" element={<LogSongConfirmation/>}/>
                                <Route path="/song-a-day/:date" element={<SongOfDay/>}/>
                                <Route path="history" element={<SongHistory/>}/>
                            </Route>

                            {/* Header only (no sidebar) */}
                            <Route path="/settings" element={
                                <PrivateRoute>
                                    <Settings/>
                                </PrivateRoute>
                            }/>
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ToastProvider>
    )
}

export default App
