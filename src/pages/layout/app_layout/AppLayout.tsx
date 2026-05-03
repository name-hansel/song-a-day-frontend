import "./AppLayout.css"
import {SongProvider} from "../../../context/SongContext.tsx";
import {Outlet} from "react-router";
import HomeSidebar from "../../../components/home_sidebar/HomeSidebar.tsx";

export default function AppLayout() {
    return (
        <SongProvider>
            <div className="home-layout">
                <HomeSidebar/>
                <div className="home-main">
                    <Outlet/>
                </div>
            </div>
        </SongProvider>
    )
}