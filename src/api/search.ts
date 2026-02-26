import {api} from "./common.ts";

export type TrackSearch = {
    spotifyId: string;
    trackName: string;
    artistName: string;
    albumName: string;
    imageUrl: string;
    spotifyUrl: string;
}

export async function searchForTracks(query: string, signal?: AbortSignal) {
    const response = await api.get<TrackSearch[]>("/spotify/search-track", {
        params: {
            q: query
        },
        signal
    });

    return response.data;
}