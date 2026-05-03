import type {SongOfDay} from "../types/SongOfDay.ts";
import {createContext, useCallback, useContext, useState} from "react";
import {getUserSongHistoryForWeek} from "../api/song.ts";
import {getErrorMessage} from "../api/messages.ts";

interface SidebarContextType {
    entries: SongOfDay[];
    loading: boolean;
    error: string;
    updateSidebar: () => Promise<void>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({children}: { children: React.ReactNode }) {
    const [entries, setEntries] = useState<SongOfDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const updateSidebar = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getUserSongHistoryForWeek();
            setEntries(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(getErrorMessage(err.message));
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return <>
        <SidebarContext.Provider value={{entries, loading, error, updateSidebar}}>
            {children}
        </SidebarContext.Provider>
    </>
}

export function useSidebar() {
    const ctx = useContext(SidebarContext);
    if (!ctx) throw new Error("NO CONTEXT");
    return ctx;
}