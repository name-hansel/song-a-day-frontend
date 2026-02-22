import "./TodaySongHeader.css";

interface TodaySongHeaderProps {
    date?: string
}

export default function TodaySongHeader({date}: TodaySongHeaderProps) {
    return (
        <section className="today-song-header">
            <h2 className="today-song today-song-title">song for day</h2>
            <h2 className="today-song today-song-day">{date?.toLowerCase()}</h2>
        </section>
    );
}