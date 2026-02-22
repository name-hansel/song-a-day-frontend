import type {SongOfDay} from "../../../api/song.ts";
import "./SongOfDayItem.css";

export default function SongOfDayItem({song}: { song: SongOfDay }) {
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
                    <h3 className="song-title">{song.trackInformation.trackName}</h3>
                    <p className="song-artist">{song.trackInformation.artistName}</p>
                    <p className="song-album">{song.trackInformation.albumName}</p>
                </div>
                <div className="song-metainfo">
                    <p className="logged-at">
                        logged at: {song.addedAtTime}
                    </p>
                </div>
            </div>
        </div>
    );
}