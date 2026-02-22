import {api} from "./auth.ts";

export type TrackSearchResult = {
    spotifyId: string;
    trackName: string;
    artistName: string;
    albumName: string;
    imageUrl: string;
}

export async function searchForTracks(query: string, signal?: AbortSignal) {
    const response = await api.get<TrackSearchResult[]>("/spotify/search-track", {
        params: {
            q: query
        },
        signal
    });

    return response.data;
}