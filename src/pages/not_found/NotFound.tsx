import Layout from "../../components/layout/Layout";
import {useAuth} from "../../auth/AuthContext.tsx";
import Spinner from "../spinner/Spinner.tsx";
import {Link, useNavigate} from "react-router";
import "./NotFound.css"
import {ArrowRight} from "lucide-react";

export default function NotFound() {
    const {appUser, logout, loading} = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <Spinner/>;
    }

    if (!appUser) {
        navigate("/login");
        return;
    }

    return (
        <Layout displayName={appUser.appUserName} onLogout={logout}>
            <div className="not-found">
                <h1>404</h1>
                <p>Page not found</p>
                <Link to={"/"}>Back to home <ArrowRight size={18}/></Link>
            </div>
        </Layout>
    );
}