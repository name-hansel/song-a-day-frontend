import {useAuth} from "../../auth/AuthContext.tsx";
import Layout from "../../components/layout/Layout.tsx";
import TodaySongHeader
    from "../../components/TodaySongHeader/TodaySongHeader.tsx";
import SongOfDayContainer
    from "../../components/SongOfDay/SongOfDayContainer/SongOfDayContainer.tsx";

export default function Home() {
    const {appUser, logout} = useAuth();

    if (!appUser) {
        return null;
    }

    return (
        <Layout displayName={appUser.appUserName} onLogout={logout}>
            <TodaySongHeader date={appUser.formattedDateForToday}/>
            <SongOfDayContainer/>
        </Layout>
    );
}