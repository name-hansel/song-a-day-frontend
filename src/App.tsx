import './App.css'
import {AuthProvider} from "./auth/AuthContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import Home from "./pages/home/Home.tsx";
import LogSongConfirmation
    from "./components/log_song_confirmation/LogSongConfirmation.tsx";
import SongOfDay from "./components/song_of_day/SongOfDay.tsx";
import Login from "./pages/login/Login.tsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>

                    <Route element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                    }>
                        <Route index element={<SongOfDay/>}/>
                        <Route path="/log/:trackId"
                               element={<LogSongConfirmation/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
