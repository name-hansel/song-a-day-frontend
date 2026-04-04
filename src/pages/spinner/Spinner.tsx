import {Loader2} from "lucide-react";
import "./Spinner.css";

export default function Spinner({size = "2rem", color = "var(--color-border)"}: {
    size?: string,
    color?: string
}) {
    return <div className="spinner-overlay" style={{fontSize: size, color}}>
        <Loader2 className="spinner-icon"/>
    </div>;
}