import "./SongOfDay.css"
import {useEffect, useState} from "react";
import {
    deleteSongOfDayForAppUser,
    getSongOfDayForAppUser,
    type SongOfDay
} from "../../../api/song.ts";
import SongOfDayItem from "../songofdayitem/SongOfDayItem.tsx";

export default function SongOfDay() {
    const [songOfDay, setSongOfDay] = useState<SongOfDay | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getSongOfDay() {
            try {
                const data = await getSongOfDayForAppUser();
                setSongOfDay(data);
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
        setSongOfDay(null);
    }

    if (loading) {
        return <h1 className="msg">Loading...</h1>
    }

    if (error) {
        return <h1 className="msg">{error}</h1>
    }

    if (!songOfDay) {
        return (
            <>
                <p className="msg">No song logged yet!</p>
            </>
        )
    }

    return (
        <SongOfDayItem song={songOfDay}
                       removeSong={removeSongForAppUser}/>
    )
}