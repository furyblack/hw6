import { Response, Router} from "express";
import {UsersService} from "../domain/users-service";
import {RequestWithBody} from "../types/common";
import {LoginUserType} from "../types/users/inputUsersType";
import {jwtService} from "../application/jwt-service";

export const authRouter = Router({})

// authRouter.post('/login',  async (req: RequestWithBody<LoginUserType>, res: Response) =>{
//     const checkResult = await UsersService.checkCredentials(req.body.loginOrEmail, req.body.password)
//     if(!checkResult){ return  res.sendStatus(401)}
//     return res.sendStatus(204)
// })
authRouter.post('/login',  async (req: RequestWithBody<LoginUserType>, res: Response) =>{
    const user = await UsersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    if(user){
        const token = await jwtService.createJWT(user)
        res.status(200).send(token)
    }else{
        res.sendStatus(401)
    }
})