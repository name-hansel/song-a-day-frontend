import "./Login.css";

export default function Login() {

    const login = () => {
        window.location.href = "http://127.0.0.1:8080/oauth2/authorization/spotify";
    };

    return (
        <div className="login-container">
            <header className="login-header">
                <h1>song a day</h1>
            </header>
            <main className="login-main">
                <button onClick={login}>Login with Spotify</button>
            </main>
        </div>
    )
}