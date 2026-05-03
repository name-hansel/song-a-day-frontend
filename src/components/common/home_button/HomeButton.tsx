import {Home} from "lucide-react";
import {useNavigate} from "react-router";

export default function HomeButton() {
    const navigate = useNavigate();

    function goHome() {
        navigate("/");
    }

    return <button onClick={goHome} className="home-btn">
        <Home size={18}/>
    </button>;
}