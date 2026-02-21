import {Navigate} from "react-router";
import {useAuth} from "../auth/AuthContext.tsx";

export default function Login() {
    const {appUser} = useAuth();

    const login = () => {
        window.location.href = "http://127.0.0.1:8080/oauth2/authorization/spotify";
    };

    return (
        appUser ? <Navigate to="/dashboard" replace/> : <div>
            <h1>song a day</h1>
            <button onClick={login}>Login with Spotify</button>
        </div>
    )
}