export function formatToReadableDate(dateString: string): string {
    const date: Date = new Date(dateString);
    const day: string = date.toLocaleDateString("en-US", {day: "2-digit"});
    const month: string = date.toLocaleDateString("en-US", {month: "long"});
    return `${day} ${month}`;
}

export function formatDateForSongOfDay(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}