import {Response, Router} from "express";
import {authMiddlewareBearer} from "../middlewares/auth/auth-middleware";
import {RequestWithBody} from "../types/common";
import {CreateNewCommentType} from "../types/comment/input-comment-type";
import {CommentOutputType} from "../types/comment/output-comment-type";
import {CommentService} from "../domain/comment-service";


export const commentRouter= Router({})

commentRouter.post('/', authMiddlewareBearer, async (req: RequestWithBody<CreateNewCommentType>, res:Response<CommentOutputType>) =>{
        const {content}:CreateNewCommentType = req.body
        const user = req.userDto
        const addResult = await CommentService.createComment({content, user})
        if(!addResult){
                res.sendStatus(404)
                return
        }
        res.status(200).send(addResult)
        })
commentRouter.get('/', async (req, res)=>{

})
