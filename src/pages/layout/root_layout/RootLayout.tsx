import {useAuth, useRequiredAuth} from "../../../context/AuthContext.tsx";
import {Outlet} from "react-router";
import Layout from "../../../components/layout/Layout.tsx";

export default function RootLayout() {
    const {logout} = useAuth();
    const {appUserName} = useRequiredAuth();

    return <Layout displayName={appUserName} onLogout={logout}>
        <Outlet/>
    </Layout>
}