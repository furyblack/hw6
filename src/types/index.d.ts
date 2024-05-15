import {CreateNewUserType} from "./users/inputUsersType";

declare global{
    declare namespace Express{
        export interface Request {
            user: CreateNewUserType | null
        }
    }
}