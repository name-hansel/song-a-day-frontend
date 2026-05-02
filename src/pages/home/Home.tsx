import {useAuth} from "../../auth/AuthContext.tsx";
import SongOfDayPageHeader from "../../components/song_of_day_page_header/SongOfDayPageHeader.tsx";
import * as React from "react";
import {useState} from "react";
import "./Home.css"
import {Outlet, useNavigate} from "react-router";
import type {SongOfDay} from "../../types/SongOfDay.ts";

export type SongOfDayContext = {
    song: SongOfDay | null;
    setSong: React.Dispatch<React.SetStateAction<SongOfDay | null>>;
}

export default function Home() {
    const [song, setSong] = useState<SongOfDay>();
    const {appUser} = useAuth();
    const navigate = useNavigate();

    if (!appUser) {
        return null;
    }

    const onSelect = (trackId: string) => {
        navigate(`/log/${trackId}`);
    }

    return (
        <>
            <SongOfDayPageHeader currentDate={song?.songDate} onSelect={onSelect}/>
            <div className="container">
                <Outlet context={{song, setSong}}/>
            </div>
        </>
    );
}