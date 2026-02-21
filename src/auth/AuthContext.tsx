import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {getAppUser} from "../api/auth.ts";
import type {AppUser} from "../types/AppUser.ts";

interface AuthContextType {
    appUser: AppUser | null;
    setAppUser: (appUser: AppUser | null) => void;
    loading: boolean;
    setLoading: (isLoading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [appUser, setAppUser] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState(true);

    async function loadAppUser() {
        try {
            const response = await getAppUser();
            setAppUser(response.data);
        } catch {
            setAppUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAppUser();
    }, []);

    return <>
        <AuthContext.Provider value={{appUser, setAppUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    </>
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("NO CONTEXT");
    return ctx;
}