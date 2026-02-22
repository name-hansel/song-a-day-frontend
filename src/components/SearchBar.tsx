import {useEffect, useState} from "react";
import {useDebounce} from "../hooks/useDebounce.ts";
import {searchForTracks, type TrackSearchResult} from "../api/search.ts";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState<TrackSearchResult[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
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
                    searchResult.map((track: TrackSearchResult) => (
                        <li key={track.spotifyId}>{track.trackName}</li>
                    ))
                }
            </ul>
        </div>
    )
}