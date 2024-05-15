import {NextFunction, Response, Request} from 'express';
import {jwtService} from "../../application/jwt-service";


const login1 = 'admin'
const password1 = 'qwerty'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) =>{
    if (req.headers['authorization']!== 'Basic YWRtaW46cXdlcnR5'){
        res.sendStatus(401)
        return
    }

    const  token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    if(userId){
        // req.user = await UsersService.findUsersById(userId)
        next()
        return

    }
    res.send(401)
    return
}

