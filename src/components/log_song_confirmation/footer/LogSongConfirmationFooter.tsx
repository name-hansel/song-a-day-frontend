import Button from "../../common/button/Button.tsx";
import {useRequiredAuth} from "../../../context/AuthContext.tsx";
import {getTodayForTimezone} from "../../../utils/DateUtils.ts";
import "./LogSongConfirmationFooter.css"

export default function LogSongConfirmationFooter({onConfirmation, confirmLoading, date, setDate, onCancel}: {
    onConfirmation: () => Promise<void>,
    confirmLoading: boolean,
    date: string,
    setDate: (value: (((prevState: string) => string) | string)) => void,
    onCancel: () => void
}) {
    const appUser = useRequiredAuth();

    return <div className="song-of-day-entry-footer">
        <div
            className="log-song-confirmation-entry-footer-confirm">
            <Button className={"log-song-confirmation-confirm-btn"} onClick={onConfirmation}
                    buttonText={"Confirm"} loading={confirmLoading}/>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={getTodayForTimezone(appUser.timezone)}
                className="log-song-confirmation-date-picker"/>
        </div>
        <Button onClick={onCancel}
                buttonText={"Cancel"}/>
    </div>;
}