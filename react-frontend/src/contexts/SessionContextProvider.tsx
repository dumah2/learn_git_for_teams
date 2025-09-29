import { createContext, useState } from "react";
import { type IReactNodeChildren } from "../interfaces/IReactChildren";
import type { ISessionContext } from "../interfaces/ISessionContext";
import type { IUser } from "../interfaces/IUser";
import { type TAccessToken } from "../types/Auth/TAccessToken";

// Initial SessionContext value
const initUser: IUser = {
    id: 0,
    name: "",
    email: "",
};
const initContext: ISessionContext = {
    user: initUser,
    setUser: () => void {},
    accessToken: "",
    setAccessToken: () => void {},
    isLoggedIn: false,
    setIsLoggedIn: () => void {},
};

// Declare context
export const SessionContext = createContext<typeof initContext>(initContext);

export const SessionContextProvider = ({ children }: IReactNodeChildren) => {
    // User instance
    const [user, setUser] = useState<typeof initUser>(initUser);

    // Token instance
    const storageToken = localStorage.getItem("ACCESS_TOKEN");
    const [token, _setToken] = useState<TAccessToken>(
        storageToken && storageToken.length > 0 ? storageToken : ""
    );

    // Logged in state
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // Declare public setToken
    const setToken = (token: TAccessToken): void => {
        _setToken(token);

        if (!token) localStorage.removeItem("ACCESS_TOKEN");
        else localStorage.setItem("ACCESS_TOKEN", token.toString());
    };

    const contextValue: ISessionContext = {
        user: user,
        setUser: setUser,
        accessToken: token,
        setAccessToken: setToken,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
    };

    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
};
