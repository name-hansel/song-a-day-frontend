import './App.css'
import {AuthProvider} from "./auth/AuthContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import Home from "./pages/home/Home.tsx";
import LogSongConfirmation
    from "./components/log_song_confirmation/LogSongConfirmation.tsx";
import SongOfDay from "./components/song_of_day/SongOfDay.tsx";
import {SongOfDay as SongOfDayPage} from "./pages/song_of_day/SongOfDay.tsx";
import Login from "./pages/login/Login.tsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>

                    {/* Home */}
                    <Route element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                    }>
                        <Route index element={<SongOfDay/>}/>
                        <Route path="/log/:trackId"
                               element={<LogSongConfirmation/>}/>
                    </Route>
                    {/* Song of a particular day */}
                    <Route
                        element={
                            <PrivateRoute>
                                <SongOfDayPage/>
                            </PrivateRoute>
                        }
                        path="/song-a-day/:date">
                        <Route index element={<SongOfDay/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
