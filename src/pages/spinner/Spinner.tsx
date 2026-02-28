import {Loader2} from "lucide-react";
import "./Spinner.css";

export default function Spinner() {
    return <div className="spinner-overlay">
        <Loader2 className="spinner-icon"/>
    </div>;
}