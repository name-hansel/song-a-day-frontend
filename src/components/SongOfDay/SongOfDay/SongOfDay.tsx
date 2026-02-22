import "./SongOfDay.css"
import {useEffect, useState} from "react";
import {getSongOfDayForAppUser, type SongOfDay} from "../../../api/song.ts";
import SongOfDayItem from "../SongOfDayItem/SongOfDayItem.tsx";

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

    if (loading) {
        return <h1 className="msg">Loading...</h1>
    }

    if (error) {
        return <h1 className="msg">{error}</h1>
    }

    if (!songOfDay) {
        return <h1 className="msg">No song yet!</h1>
    }

    return (
        <SongOfDayItem song={songOfDay}/>
    )
}