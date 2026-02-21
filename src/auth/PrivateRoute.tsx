import {useAuth} from "./AuthContext.tsx";
import {Navigate} from 'react-router';
import type {ReactElement} from "react";

export default function PrivateRoute({children}: { children: ReactElement }) {
    const {appUser, loading} = useAuth();

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (!appUser) {
        return <Navigate to="/" replace/>
    }

    return children;
}