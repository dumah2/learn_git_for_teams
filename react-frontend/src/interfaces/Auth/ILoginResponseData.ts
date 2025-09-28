import type { IUser } from "../IUser";

export default interface ILoginResponseData {
    token: string;
    user: IUser;
}
