import {useAuth} from "../../context/AuthContext.tsx";
import Spinner from "../spinner/Spinner.tsx";
import {Link, Navigate} from "react-router";
import "./NotFound.css"
import {ArrowRight} from "lucide-react";

export default function NotFound() {
    const {appUser, loading} = useAuth();

    if (loading) {
        return <Spinner/>;
    }

    if (!appUser) {
        return <Navigate to="/login" replace/>;
    }

    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Page not found</p>
            <Link to={"/"}>Back to home <ArrowRight size={18}/></Link>
        </div>
    );
}