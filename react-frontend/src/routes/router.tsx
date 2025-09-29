import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Posts from "../views/Post/Posts";
import Porfile from "../views/User/Porfile";
import GuestLayout from "../layouts/GuestLayout";
import Login from "../views/User/Login";
import Register from "../views/User/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "posts",
                element: <Posts />,
            },
            {
                path: "profile",
                element: <Porfile />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
]);
