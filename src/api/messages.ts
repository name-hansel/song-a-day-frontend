const errorMessages: Record<string, string> = {
    SPOTIFY_TRACK_NOT_FOUND: "Track not found on Spotify.",
    USER_NOT_LOGGED_IN: "Please login again.",
    REFRESH_TOKEN_EXPIRED: "Please login again.",
    INVALID_REFRESH_TOKEN: "Please login again.",
    ACCESS_TOKEN_EXPIRED: "Please login again.",
    USER_NOT_FOUND: "User not found.",
    SONG_OF_DAY_NOT_FOUND: "Song of the day not found. Please try again.",
    INVALID_DATE: "Invalid date entered.",
    INVALID_DATA_MEMORY: "Please enter less than 160 characters.",
    ACTION_NOT_ALLOWED: "Action not allowed.",
    DEFAULT: "Something went wrong. Please try again."
}

export function getErrorMessage(message: string) {
    return errorMessages[message] || errorMessages.DEFAULT;
}