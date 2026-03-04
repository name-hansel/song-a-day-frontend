import {useEffect, useRef, useState} from "react";
import {useDebounce} from "../../hooks/useDebounce.ts";
import {searchForTracks, type TrackSearch} from "../../api/search.ts";
import "./SearchBar.css";
import TrackProposalItem from "./proposal/TrackProposalItem.tsx";
import {getErrorMessage} from "../../api/messages.ts";

export default function SearchBar({onSelect}: {
    onSelect: (trackId: string) => void
}) {
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState<TrackSearch[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showProposals, setShowProposals] = useState(false);
    const debouncedQuery = useDebounce(query, 300);

    const containerRef = useRef<HTMLDivElement>(null);

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
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(getErrorMessage(err.message));
                }
            } finally {
                setSearchLoading(false);
            }
        }

        void search();
        return () => controller.abort();
    }, [debouncedQuery]);
    useEffect(() => {
        function handleFocusLost(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowProposals(false);
            }
        }

        document.addEventListener("mousedown", handleFocusLost);

        return () => {
            document.removeEventListener("mousedown", handleFocusLost);
        };
    }, []);

    return (
        <div className="search-wrapper" ref={containerRef}>
            <input value={query}
                   onChange={e => {
                       setQuery(e.target.value);
                   }}
                   placeholder="Search for tracks..."
                   className="search-input"
                   onFocus={() => setShowProposals(true)}/>
            {/*TODO: Change to icon for both loading and search */}
            <span
                className="search-icon">{searchLoading ? "loading..." : "search"}</span>
            {error && <p>{error}</p>}
            {
                !searchLoading && showProposals && searchResult.length > 0 && (
                    <div className="search-results">
                        {
                            searchResult.map((track: TrackSearch) => (
                                <TrackProposalItem key={track.spotifyId}
                                                   track={track}
                                                   hideProposals={() => setShowProposals(false)}
                                                   onSelect={() => {
                                                       setQuery("");
                                                       onSelect(track.spotifyId);
                                                   }}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}