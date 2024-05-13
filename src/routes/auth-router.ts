import { Response, Router} from "express";
import {UsersService} from "../domain/users-service";
import {RequestWithBody} from "../types/common";
import {LoginUserType} from "../types/users/inputUsersType";

export const authRouter = Router({})

authRouter.post('/login',  async (req: RequestWithBody<LoginUserType>, res: Response) =>{
    const checkResult = await UsersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    if(!checkResult){ return  res.sendStatus(401)}
    return res.sendStatus(204)
})