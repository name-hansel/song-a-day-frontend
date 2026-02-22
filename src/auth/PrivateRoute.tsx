import {useAuth} from "./AuthContext.tsx";
import type {ReactElement} from "react";
import Login from "../pages/login/Login.tsx";

export default function PrivateRoute({children}: { children: ReactElement }) {
    const {appUser, loading} = useAuth();

    // TODO: Spinner here
    if (loading) {
        return <h2>Loading...</h2>
    }

    if (!appUser) {
        return <Login/>
    }

    return children;
}