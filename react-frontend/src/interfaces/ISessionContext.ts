import type { TAccessToken } from "../types/Auth/TAccessToken";
import type { IUser } from "./IUser";

export interface ISessionContext {
    user: IUser;
    setUser: (user: IUser) => void;
    accessToken: TAccessToken;
    setAccessToken: (token: TAccessToken) => void;
}
