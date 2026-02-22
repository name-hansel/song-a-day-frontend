import './App.css'
import {AuthProvider} from "./auth/AuthContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import Home from "./pages/home/Home.tsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
