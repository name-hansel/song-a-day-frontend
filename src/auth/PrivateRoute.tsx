import {useAuth} from "./AuthContext.tsx";
import type {ReactElement} from "react";
import Login from "../pages/login/Login.tsx";
import Spinner from "../pages/spinner/Spinner.tsx";

export default function PrivateRoute({children}: { children: ReactElement }) {
    const {appUser, loading} = useAuth();

    if (loading) {
        return <Spinner/>;
    }

    if (!appUser) {
        return <Login/>
    }

    return children;
}