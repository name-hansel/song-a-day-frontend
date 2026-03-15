import {Loader2} from "lucide-react";
import "./Spinner.css";

export default function Spinner({size = "2rem"}: {
    size?: string
}) {
    return <div className="spinner-overlay" style={{fontSize: size}}>
        <Loader2 className="spinner-icon"/>
    </div>;
}