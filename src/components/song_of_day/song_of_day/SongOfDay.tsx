import "./SongOfDay.css"
import * as React from "react";
import {useEffect, useState} from "react";
import {
    deleteSongOfDayForAppUser,
    getSongOfDayForAppUser,
    type SongOfDay as SongOfDayType,
    type SongOfDay
} from "../../../api/song.ts";
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
        <div className="song-card">
            <div className="song-image-wrapper">
                <img
                    src={song.trackInformation.imageUrl}
                    alt="Song cover"
                    className="song-image"
                />
            </div>
            <div className="song-details">
                <div className="track-details">
                    <a target="_blank"
                       className="song-title track-link"
                       href={song.trackInformation.spotifyUrl}><h3
                        className="song-title">{song.trackInformation.trackName}</h3>
                    </a>
                    <p className="song-artist">{song.trackInformation.artistName}</p>
                    <p className="song-album">{song.trackInformation.albumName}</p>
                </div>
                <div className="song-metainfo">
                    <p className="logged-at">
                        logged at: {song.addedAtTime}
                    </p>
                    <button className="remove-button"
                            onClick={removeSongForAppUser}>
                        remove song of day
                    </button>
                </div>
            </div>
        </div>
    )
}