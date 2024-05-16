import {CreateNewUserType} from "./users/inputUsersType";
import {WithId} from "mongodb";
import {UserMongoDbType} from "./users/inputUsersType";

declare global{
    declare namespace Express{
        export interface Request {
            user: CreateNewUserType | null
            userDto: WithId<UserMongoDbType>
        }
    }
}