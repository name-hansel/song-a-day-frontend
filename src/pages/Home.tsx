import {useAuth} from "../auth/AuthContext.tsx";
import SearchBar from "../components/SearchBar.tsx";

export default function Home() {
    const {appUser, logout} = useAuth();

    if (!appUser) {
        return null;
    }

    return (
        <div>
            <h2>{appUser.appUserName}</h2>
            <h2>{appUser.timezone}</h2>
            <SearchBar/>
            <button onClick={logout}>Logout</button>
        </div>
    );
}