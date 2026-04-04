import {useEffect, useRef, useState} from "react";
import {useDebounce} from "../../hooks/useDebounce.ts";
import {searchForTracks} from "../../api/search.ts";
import "./SearchBar.css";
import TrackProposalItem from "./proposal/TrackProposalItem.tsx";
import {getErrorMessage} from "../../api/messages.ts";
import {Search, X} from "lucide-react";
import type {TrackSearch} from "../../types/TrackSearch.ts";
import {useToast} from "../../context/ToastContext.tsx";
import Spinner from "../../pages/spinner/Spinner.tsx";

export default function SearchBar({onSelect}: {
    onSelect: (trackId: string) => void
}) {
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState<TrackSearch[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showProposals, setShowProposals] = useState(false);
    const debouncedQuery = useDebounce(query, 300);
    const {showToast} = useToast();

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
                setSearchResult([]);

                const data = await searchForTracks(debouncedQuery);
                setSearchResult(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    showToast(getErrorMessage(err.message));
                }
            } finally {
                setSearchLoading(false);
            }
        }

        void search();
        return () => controller.abort();
    }, [debouncedQuery, showToast]);

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
            <div className="search-icons">
                {searchLoading &&
                    <span className="loading-text"><Spinner
                        size={"1rem"} color={"var(--color-text-secondary)"}/></span>}
                {!searchLoading && !query && <Search size={18}/>}
                {query && !searchLoading && (
                    <X
                        size={18}
                        className="cursor-pointer"
                        onClick={() => setQuery("")}
                    />
                )}
            </div>
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