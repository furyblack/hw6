import {Response, Router} from "express";
import {authMiddleware, authMiddlewareBearer} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validators";
import {RequestWithBody} from "../types/common";
import {CreateNewPostType} from "../types/posts/input";
import {PostOutputType} from "../types/posts/output";
import {PostRepository} from "../repositories/post-repository";
import {postRoute} from "./post-route";
import {CreateNewCommentType} from "../types/comment/input-comment-type";
import {CommentOutputType} from "../types/comment/output-comment-type";
import {CommentRepository} from "../repositories/comment-repository";
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
        res.status(201).send(addResult)
        })
commentRouter.get('/', async (req, res)=>{


})
