import {useAuth} from "../../../context/AuthContext.tsx";
import {Outlet} from "react-router";
import Layout from "../../../components/layout/Layout.tsx";

export default function RootLayout() {
    const {appUser, logout} = useAuth();

    if (!appUser) {
        return <Outlet/>;
    }

    return <Layout displayName={appUser.appUserName} onLogout={logout}>
        <Outlet/>
    </Layout>
}