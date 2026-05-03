import {useAuth, useRequiredAuth} from "../../../context/AuthContext.tsx";
import {Outlet} from "react-router";
import Layout from "../../../components/layout/Layout.tsx";

export default function RootLayout() {
    const {logout} = useAuth();
    const appUser = useRequiredAuth();

    return <Layout displayName={appUser.appUserName} onLogout={logout}>
        <Outlet/>
    </Layout>
}