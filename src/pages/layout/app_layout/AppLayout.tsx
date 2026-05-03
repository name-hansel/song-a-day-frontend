import "./AppLayout.css"
import {SongProvider} from "../../../context/SongContext.tsx";
import {Outlet} from "react-router";
import HomeSidebar from "../../../components/home_sidebar/HomeSidebar.tsx";
import {SidebarProvider} from "../../../context/SidebarContext.tsx";

export default function AppLayout() {
    return (
        <SongProvider>
            <SidebarProvider>
                <div className="home-layout">
                    <HomeSidebar/>
                    <div className="home-main">
                        <Outlet/>
                    </div>
                </div>
            </SidebarProvider>
        </SongProvider>
    )
}