import Spinner from "../../../pages/spinner/Spinner.tsx";
import "./Button.css"

export default function Button({
                                   buttonText,
                                   className,
                                   onClick,
                                   loading = false
                               }: {
    buttonText: string;
    className: string;
    onClick: () => void | Promise<void>;
    loading?: boolean;
}) {
    return <button className={`${className} common-button`} onClick={onClick} disabled={loading}>
        {
            loading ? <Spinner/> : <span className="common-button-text">{buttonText}</span>
        }
    </button>
}