import { Response, Router} from "express";
import {UsersService} from "../domain/users-service";
import {RequestWithBody} from "../types/common";
import {LoginUserType, UserMongoDbType} from "../types/users/inputUsersType";
import {jwtService} from "../application/jwt-service";
import {WithId} from "mongodb";

export const authRouter = Router({})

authRouter.post('/login',  async (req: RequestWithBody<LoginUserType>, res: Response) =>{
    const user:WithId<UserMongoDbType> | null = await UsersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    if(!user){
        res.sendStatus(401)
        return
    }
        const token = await jwtService.createJWT(user)
        res.status(200).send(token)
})