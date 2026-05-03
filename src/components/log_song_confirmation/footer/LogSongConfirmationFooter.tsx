import Button from "../../common/button/Button.tsx";
import {useRequiredAuth} from "../../../context/AuthContext.tsx";
import {getTodayForTimezone} from "../../../utils/DateUtils.ts";
import "./LogSongConfirmationFooter.css"
import type {ChangeEvent} from "react";

export default function LogSongConfirmationFooter({onConfirmation, confirmLoading, date, setDate, onCancel}: {
    onConfirmation: () => Promise<void>,
    confirmLoading: boolean,
    date: string,
    setDate: (value: (((prevState: string) => string) | string)) => void,
    onCancel: () => void
}) {
    const {timezone} = useRequiredAuth();

    function handleDateChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        const value = e.target.value;
        const today = getTodayForTimezone(timezone);

        if (value > today) {
            e.target.value = today;
            return;
        }

        setDate(value);
    }

    return <div className="song-of-day-entry-footer">
        <div
            className="log-song-confirmation-entry-footer-confirm">
            <Button className={"log-song-confirmation-confirm-btn"} onClick={onConfirmation}
                    buttonText={"Confirm"} loading={confirmLoading}/>
            <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(e)}
                max={getTodayForTimezone(timezone)}
                className="log-song-confirmation-date-picker"/>
        </div>
        <Button onClick={onCancel}
                buttonText={"Cancel"}/>
    </div>;
}