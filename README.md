# Song A Day

## Overview
React (TypeScript) frontend for an application where you can log your song of the day. Provides a responsive user interface for managing song entries, integrating with the backend API for authentication and data persistence.

## Tech Stack
Frontend: React (TypeScript)
Styling: CSS
HTTP Client: Axios
State Management: React Hooks
Authentication: JWT (HTTP-only cookies)

## Features
- Spotify-based authentication (via backend OAuth flow)
- Create, view, and delete daily song entries
- Display track metadata (title, artist, album)
- Responsive and minimal UI design

## Authentication Flow
- Authentication handled via backend (Spotify OAuth)
- Access and refresh tokens stored in HTTP-only cookies
- Axios interceptor:
  - Automatically retries failed requests on 401 (token expiry)
  - Calls refresh endpoint to obtain new access token
  - Logs out user if refresh token is expired

## Future improvements
- Deployment!
- Sidebar enhancements
- Add logo
- Smoother interface (with animations?)
- Add more functionality (in tandem with the backend)
