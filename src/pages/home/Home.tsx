import {useAuth} from "../../auth/AuthContext.tsx";
import SearchBar from "../../components/SearchBar.tsx";
import Layout from "../../components/layout/Layout.tsx";

export default function Home() {
    const {appUser, logout} = useAuth();

    if (!appUser) {
        return null;
    }

    return (
        <Layout displayName={appUser.appUserName} onLogout={logout}>
            <div>
                <h2>{appUser.timezone}</h2>
                <SearchBar/>
            </div>
        </Layout>
    );
}