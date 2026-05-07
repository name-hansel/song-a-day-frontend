import Button from "../../common/button/Button.tsx";
import {useNavigate} from "react-router";
import "./SettingsFooter.css"

export default function SettingsFooter({onSave, saveLoading, newUser}: {
    onSave: () => Promise<void>,
    saveLoading: boolean,
    newUser: boolean
}) {
    const navigate = useNavigate();

    return <footer className="settings-actions">
        <Button onClick={onSave} buttonText={"Save"}
                loading={saveLoading}/>
        {
            !newUser && <Button onClick={() => navigate(-1)} buttonText="Cancel"/>
        }
    </footer>
}