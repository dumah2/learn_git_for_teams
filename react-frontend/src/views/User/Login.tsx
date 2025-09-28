import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";

import { Auth, getEndpoint } from "../../utils/apiEndpoints";
import type ApiErrorData from "../../interfaces/General/ApiErrorData";
import { SessionContext } from "../../contexts/SessionContextProvider";
import type ILoginResponseData from "../../interfaces/Auth/ILoginResponseData";

// Custom hook for post login
const usePostLogin = (email: string, password: string) => {
    // Login api call function
    const postLogin = async () => {
        const endpoint = getEndpoint(Auth.login);
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        // Handle HTTP response on failure
        if (!response.ok) {
            const errorData: ApiErrorData = await response.json();
            const errorMessage = errorData.message;
            throw new Error(errorMessage);
        }

        return response.json();
    };

    const { data, isLoading, error } = useQuery<ILoginResponseData>({
        queryKey: ["post-login"],
        queryFn: postLogin,
    });

    return { data, isLoading, error };
};
export default function Login() {
    // Local state for form inputs and Loading/Error status
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // Access session context
    const { setUser, setAccessToken } = useContext(SessionContext);

    // Handle submit function
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent submition
        e.preventDefault();

        // Fetch data
        const { data, isLoading, error } = usePostLogin(email, password);

        if (isLoading) setIsLoading(true);
        // Display error message on failure
        if (error) {
            setError(error.message);
            return;
        }

        // Handle success
        if (data) {
            if (data.token && data.user) {
                setAccessToken(data.token);
                setUser(data.user);
                console.log(data);
                return;
            }
        }

        // If data undefined or required props are missing
        setError("Error while logging in. Please reload and try again later");
    };

    return (
        <div>
            <p>{isLoading ? "Is loading" : <></>}</p>
            <p>{error}</p>
            <form action="post" onSubmit={handleSubmit}>
                {/* Email input*/}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="example@gmail.com"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password input */}
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
