import "./SongOfDay.css"
import * as React from "react";
import {useEffect, useState} from "react";
import {
    deleteSongOfDayForAppUser,
    getSongOfDayForAppUser,
    type SongOfDay as SongOfDayType,
    type SongOfDay
} from "../../../api/song.ts";
import SongOfDayItem from "../songofdayitem/SongOfDayItem.tsx";
import Spinner from "../../../pages/spinner/Spinner.tsx";

export default function SongOfDay({song, setSong}: {
    song: SongOfDay | null;
    setSong: React.Dispatch<React.SetStateAction<SongOfDayType | null>>
}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getSongOfDay() {
            try {
                const data = await getSongOfDayForAppUser();
                setSong(data);
            } catch {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        }

        getSongOfDay();
    }, []);

    async function removeSongForAppUser() {
        await deleteSongOfDayForAppUser();
        setSong(null);
    }

    if (loading) {
        return <Spinner/>
    }

    if (error) {
        return <h1 className="msg">{error}</h1>
    }

    if (!song) {
        return (
            <>
                <p className="msg">No song logged yet!</p>
            </>
        )
    }

    return (
        <SongOfDayItem song={song}
                       removeSong={removeSongForAppUser}/>
    )
}