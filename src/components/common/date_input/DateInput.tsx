import "./DateInput.css"

export default function DateInput({value, max, onChange}: {
    value: string,
    max?: string,
    onChange: (currentValue: string) => void
}) {
    return <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        max={max}
        className="date-input"/>
}