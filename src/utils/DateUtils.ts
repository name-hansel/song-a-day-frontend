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

export function getTodayForTimezone(timezone: string | undefined): string {
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    return formatter.format(new Date());
}