import { useState } from "react";
import { Auth, getEndpoint } from "../../utils/apiEndpoints";
import type IApiErrorData from "../../interfaces/General/IApiErrorData";
import { useMutation } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    /**
     * Resquests user registration
     * @return
     */

    const postRegiserUser = async (
        email: string,
        password: string,
        name: string
    ) => {
        const response = await fetch(getEndpoint(Auth.register), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        // Handle error
        if (!response.ok) {
            const error: IApiErrorData = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    };

    // Mutation
    const { mutate } = useMutation({
        mutationFn: () => postRegiserUser(email, password, name),
        onSuccess: (data: { message: string }) => {
            // Redirect user to home page
            console.log(data.message);

            // return <Navigate to={"/login"} />;
        },
        onError: (error) => {
            setError(error.message);
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Request registration
        mutate();
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>{error}</p>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>

            <label>
                Email
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <button type="submit">Register</button>
        </form>
    );
}
