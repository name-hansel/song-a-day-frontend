import {useEffect, useState} from "react";
import {useAuth} from "../../../auth/AuthContext.tsx";
import "./Clock.css";

export default function Clock() {
    const {appUser} = useAuth();
    const timezone = appUser?.timezone;
    const [time, setTime] = useState("");

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat("en-GB", {
            timeZone: timezone,
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

        const updateTime = () => {
            setTime(formatter.format(new Date()));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    return <span className="timestamp">{time}</span>;
}