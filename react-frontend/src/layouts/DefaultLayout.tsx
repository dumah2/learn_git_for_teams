import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContextProvider";

export default function DefaultLayout() {
    // Get current path
    const location = useLocation();
    const currentPath = location.pathname;

    const { isLoggedIn } = useContext(SessionContext);
    if (!isLoggedIn && currentPath != "/register") {
        return <Navigate to={"/login"} />;
    }

    return (
        <div>
            <p>Default layout</p>
            <Outlet />
        </div>
    );
}
