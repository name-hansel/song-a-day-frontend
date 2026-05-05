import Button from "../../common/button/Button.tsx";
import {useRequiredAuth} from "../../../context/AuthContext.tsx";
import {getTodayForTimezone} from "../../../utils/DateUtils.ts";
import "./LogSongConfirmationFooter.css"
import DateInput from "../../common/date_input/DateInput.tsx";

export default function LogSongConfirmationFooter({onConfirmation, confirmLoading, date, setDate, onCancel}: {
    onConfirmation: () => Promise<void>,
    confirmLoading: boolean,
    date: string,
    setDate: (value: (((prevState: string) => string) | string)) => void,
    onCancel: () => void
}) {
    const {timezone} = useRequiredAuth();

    function handleDateChange(currentValue: string) {
        const today = getTodayForTimezone(timezone);

        if (currentValue > today) {
            setDate(today);
            return;
        }

        setDate(currentValue);
    }

    return <div className="song-of-day-entry-footer">
        <div
            className="log-song-confirmation-entry-footer-confirm">
            <Button className={"log-song-confirmation-confirm-btn"} onClick={onConfirmation}
                    buttonText={"Confirm"} loading={confirmLoading}/>
            <DateInput value={date} max={getTodayForTimezone(timezone)} onChange={handleDateChange}/>
        </div>
        <Button onClick={onCancel}
                buttonText={"Cancel"}/>
    </div>;
}