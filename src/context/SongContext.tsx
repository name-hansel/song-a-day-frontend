import {createContext, useContext, useState} from "react";
import type {SongOfDay} from "../types/SongOfDay.ts";

type SongContextType = {
    song: SongOfDay | null;
    setSong: React.Dispatch<React.SetStateAction<SongOfDay | null>>;
};

const SongContext = createContext<SongContextType | null>(null);

export function SongProvider({children}: {
    children: React.ReactNode
}) {
    const [song, setSong] = useState<SongOfDay | null>(null);

    return <SongContext.Provider value={{song, setSong}}>
        {children}
    </SongContext.Provider>
}

export function useSong() {
    const ctx = useContext(SongContext);
    if (!ctx) throw new Error("NO CONTEXT");
    return ctx;
}