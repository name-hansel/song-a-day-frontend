import {useEffect, useState} from "react";
import {useDebounce} from "../hooks/useDebounce.ts";
import {searchForTracks, type TrackSearch} from "../api/search.ts";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState<TrackSearch[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        const searchQuery = debouncedQuery.trim();
        if (!searchQuery || searchQuery.length < 2) {
            setSearchResult([]);
            return;
        }

        const controller = new AbortController();

        async function search() {
            try {
                setSearchLoading(true);
                setError(null);
                setSearchResult([]);

                const data = await searchForTracks(debouncedQuery);
                setSearchResult(data);
            } catch {
                setError("Search failed.");
            } finally {
                setSearchLoading(false);
            }
        }

        search();
        return () => controller.abort();
    }, [debouncedQuery]);

    return (
        <div>
            <input value={query}
                   onChange={e => {
                       setQuery(e.target.value);
                   }}
                   placeholder="Search for tracks..."/>
            {searchLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <ul>
                {
                    searchResult.map((track: TrackSearch) => (
                        <li key={track.spotifyId}>
                            <div>
                                <h2>{track.trackName}</h2>
                                <h4>{track.albumName}</h4>
                                <h4>{track.artistName}</h4>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}