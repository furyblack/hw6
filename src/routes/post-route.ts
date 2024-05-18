import {authMiddleware, authMiddlewareBearer} from "../middlewares/auth/auth-middleware";
import {RequestWithBody, RequestWithParamsAndBody, RequestWithQuery} from "../types/common";
import {Request, Response, Router} from "express";
import {PostOutputType} from "../types/posts/output";
import {CreateNewPostType, postQuerySortData, UpdatePostType} from "../types/posts/input";
import {PostRepository} from "../repositories/post-repository";
import {commentForPostValidation, postValidation} from "../validators/post-validators";
import {QueryPostRepository} from "../repositories/query-post-repository";
import {paginator} from "../types/paginator/pagination";
import {PaginationOutputType} from "../types/blogs/output";
import {CommentOutputType} from "../types/comment/output-comment-type";
import {CreateNewCommentType} from "../types/comment/input-comment-type";
import {PostService} from "../domain/posts-service";
import {CommentService} from "../domain/comment-service";
import {QueryCommentRepository} from "../repositories/query-comment-repository";


export const postRoute = Router({})

postRoute.get('/', async (req: RequestWithQuery<postQuerySortData>, res: Response<PaginationOutputType<PostOutputType[]>> ) =>{
    const paginationData = paginator(req.query)
    const posts=  await QueryPostRepository.getAll(paginationData)
    res.send(posts)
})

postRoute.get('/:id', async (req:Request, res: Response)=>{
    const postId = await QueryPostRepository.getById(req.params.id)
    if(postId){
        res.status(200).send(postId)
    }else {
        res.sendStatus(404)
    }
})

postRoute.post('/', authMiddleware, postValidation(), async (req: RequestWithBody<CreateNewPostType>, res: Response<PostOutputType>) => {
    const  {title, shortDescription, content, blogId}:CreateNewPostType = req.body
    const addResult = await PostRepository.createPost({title, shortDescription, content, blogId })
    if(!addResult){
        res.sendStatus(404)
        return
    }
    res.status(201).send(addResult)
})
postRoute.post("/:postId/comments", authMiddlewareBearer, commentForPostValidation(), async (req: RequestWithParamsAndBody<{
    postId: string
},CreateNewCommentType >, res: Response<CommentOutputType>)=>{

    const postId=req.params.postId;
    const content= req.body.content;
    const userId=req.userDto._id.toString();
    const userLogin=req.userDto.userName;

    const createResult =  await CommentService.createComment({content, postId,userId,userLogin })
    //если поста нет то 404
    if(!createResult) return res.sendStatus(404)

    const createdComment = await QueryCommentRepository.getById(createResult.commentId)

    return  res.status(201).send(createdComment!)
})

postRoute.put('/:id', authMiddleware, postValidation(), async (req:Request, res: Response)=> {
    const postUpdateParams: UpdatePostType= {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content
    }
    const postId = req.params.id

    const isUpdated = await PostRepository.updatePost(postId, postUpdateParams)
    if (isUpdated) {
        return res.sendStatus(204)
    }else{
        return res.sendStatus(404)
    }

})

postRoute.delete('/:id',  authMiddleware, async  (req:Request, res:Response) => {
    const isDeleted = await PostRepository.deletePost(req.params.id)
    if (!isDeleted){
        res.sendStatus(404)
    }else{
        res.sendStatus(204)
    }
})



