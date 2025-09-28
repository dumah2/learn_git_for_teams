import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function DefaultLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div>
            <p>Default layout</p>
            <Outlet />
        </div>
    );
}
