import {useState} from "react";
import "./Image.css"

export default function Image({src, alt, className}: {
    src: string,
    alt: string,
    className: string
}) {
    const [loaded, setLoaded] = useState(false);

    return <img src={src} alt={alt} loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`${className} img ${loaded ? "loaded" : ""}`}/>;
}