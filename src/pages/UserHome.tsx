import {useAuth} from "../auth/AuthContext.tsx";

export default function UserHome() {
    const {appUser} = useAuth();

    if (!appUser) {
        return null;
    }

    return (
        <div>
            <h2>{appUser.appUserName}</h2>
            <h2>{appUser.timezone}</h2>
        </div>
    );
}