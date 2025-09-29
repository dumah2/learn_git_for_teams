import React, { useContext, useState } from "react";
import { Auth, getEndpoint } from "../../utils/apiEndpoints";
import type IApiErrorData from "../../interfaces/General/IApiErrorData";
import { useMutation } from "@tanstack/react-query";
import { SessionContext } from "../../contexts/SessionContextProvider";
import type ILoginResponseData from "../../interfaces/Auth/ILoginResponseData";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const { setIsLoggedIn, setUser, setAccessToken } =
        useContext(SessionContext);

    // Local states for login
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    // Post login request function
    const postLogin = async (email: string, password: string) => {
        const response = await fetch(getEndpoint(Auth.login), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        // Handle error status
        if (!response.ok) {
            const error: IApiErrorData = await response.json();
            error.message = error.message
                ? error.message
                : "Error while loggin in. Please reload and try again later";
            throw new Error(error.message);
        }

        return response.json();
    };
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: () => postLogin(email, password),
        // Log user in
        onSuccess: (data: ILoginResponseData) => {
            setUser(data.user);
            setAccessToken(data.token);
            setIsLoggedIn(true);
            navigate("/profile");
        },
        onError: (error) => {
            setError(error.message);
        },
    });

    // Handle form submition
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent submition
        e.preventDefault();

        // Try login
        mutate();
    };
    return (
        <div>
            <p>{error}</p>
            <form onSubmit={(e) => handleSubmit(e)}>
                {/* Email field */}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password field*/}
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
                <Link to={"/register"}>Register</Link>
            </form>
        </div>
    );
}
