import './App.css'
import {AuthProvider} from "./auth/AuthContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./pages/Login.tsx";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import UserHome from "./pages/UserHome.tsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <UserHome/>
                        </PrivateRoute>
                    }/>
                    <Route path="/" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
