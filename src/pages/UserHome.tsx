import {useAuth} from "../auth/AuthContext.tsx";

export default function UserHome() {
    const {appUser, logout} = useAuth();

    if (!appUser) {
        return null;
    }


    return (
        <div>
            <h2>{appUser.appUserName}</h2>
            <h2>{appUser.timezone}</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
}