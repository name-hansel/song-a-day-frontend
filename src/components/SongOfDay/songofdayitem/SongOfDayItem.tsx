import {type SongOfDay} from "../../../api/song.ts";
import "./SongOfDayItem.css";

export default function SongOfDayItem({song, removeSong}: {
    song: SongOfDay, removeSong: () => Promise<void>
}) {
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
                    <button onClick={removeSong}>
                        remove song of day
                    </button>
                </div>
            </div>
        </div>
    );
}