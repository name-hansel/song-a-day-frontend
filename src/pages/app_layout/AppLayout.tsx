import HomeSidebar from "../../components/home_sidebar/HomeSidebar.tsx";
import {Outlet} from "react-router";
import "./AppLayout.css"

export default function AppLayout() {
    return <div className="home-layout">
        <HomeSidebar/>
        <div className="home-main">
            <Outlet/>
        </div>
    </div>
}