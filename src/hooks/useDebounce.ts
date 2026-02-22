import {useEffect, useState} from "react";

export function useDebounce(value: string, delay: number) {
    const [debounce, setDebounce] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounce(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounce;
}