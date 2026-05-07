import Spinner from "../../../pages/spinner/Spinner.tsx";
import "./Button.css"
import * as React from "react";

export default function Button({
                                   buttonText,
                                   className,
                                   onClick,
                                   loading = false,
                                   icon,
                                   disabled
                               }: {
    buttonText?: string,
    className?: string,
    onClick: () => void | Promise<void>,
    loading?: boolean,
    icon?: React.JSX.Element,
    disabled?: boolean
}) {
    return <button className={`${className} common-button`} onClick={onClick} disabled={disabled || loading}>
        {
            loading ? <Spinner/> : <span className="common-button-text">{icon ?? buttonText}</span>
        }
    </button>
}