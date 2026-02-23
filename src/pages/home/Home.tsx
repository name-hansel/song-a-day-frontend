import {useAuth} from "../../auth/AuthContext.tsx";
import Layout from "../../components/layout/Layout.tsx";
import TodaySongHeader
    from "../../components/todaysongheader/TodaySongHeader.tsx";
import SongOfDayContainer
    from "../../components/SongOfDay/songofdaycontainer/SongOfDayContainer.tsx";

export default function Home() {
    const {appUser, logout} = useAuth();

    if (!appUser) {
        return null;
    }

    return (
        <Layout displayName={appUser.appUserName} onLogout={logout}>
            <TodaySongHeader/>
            <SongOfDayContainer/>
        </Layout>
    );
}