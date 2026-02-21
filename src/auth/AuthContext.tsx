import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {getAppUser, logoutAppUser} from "../api/auth.ts";
import type {AppUser} from "../types/AppUser.ts";

interface AuthContextType {
    appUser: AppUser | null;
    setAppUser: (appUser: AppUser | null) => void;
    loading: boolean;
    setLoading: (isLoading: boolean) => void;
    logout: () => Promise<void>;
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

    async function logout() {
        try {
            await logoutAppUser();
        } finally {
            setAppUser(null);
        }
    }

    useEffect(() => {
        loadAppUser();
    }, []);

    return <>
        <AuthContext.Provider value={{appUser, setAppUser, loading, setLoading, logout}}>
            {children}
        </AuthContext.Provider>
    </>
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("NO CONTEXT");
    return ctx;
}