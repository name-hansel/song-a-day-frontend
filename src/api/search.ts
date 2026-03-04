import {api, handleError} from "./common.ts";

export type TrackSearch = {
    spotifyId: string;
    trackName: string;
    artistName: string;
    albumName: string;
    imageUrl: string;
    spotifyUrl: string;
}

export async function searchForTracks(query: string, signal?: AbortSignal) {
    try {
        const response = await api.get<TrackSearch[]>("/spotify/search-tracks", {
            params: {
                q: query
            },
            signal
        });
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}

export async function searchForTrack(trackId: string) {
    try {
        const response = await api.get(`/spotify/search-track/${trackId}`);
        return response.data;
    } catch (err: unknown) {
        handleError(err);
    }
}