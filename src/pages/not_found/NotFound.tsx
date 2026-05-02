import {useAuth} from "../../auth/AuthContext.tsx";
import Spinner from "../spinner/Spinner.tsx";
import {Link, useNavigate} from "react-router";
import "./NotFound.css"
import {ArrowRight} from "lucide-react";

export default function NotFound() {
    const {appUser, loading} = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <Spinner/>;
    }

    if (!appUser) {
        navigate("/login");
        return;
    }

    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Page not found</p>
            <Link to={"/"}>Back to home <ArrowRight size={18}/></Link>
        </div>
    );
}