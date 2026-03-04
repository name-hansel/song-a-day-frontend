import {useAuth} from "./AuthContext.tsx";
import type {ReactElement} from "react";
import Spinner from "../pages/spinner/Spinner.tsx";
import {Navigate} from "react-router";

export default function PrivateRoute({children}: { children: ReactElement }) {
    const {appUser, loading} = useAuth();

    if (loading) {
        return <Spinner/>;
    }

    if (!appUser) {
        return <Navigate to="/login" replace/>;
    }

    return children;
}