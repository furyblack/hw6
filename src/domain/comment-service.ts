import {CreateNewCommentType} from "../types/comment/input-comment-type";
import {CommentMongoDbType, CommentOutputType} from "../types/comment/output-comment-type";
import {WithId} from "mongodb";
import {CommentRepository} from "../repositories/comment-repository";
import {UserMongoDbType} from "../types/users/inputUsersType";


export class CommentService{
    static async createComment(data: CreateNewCommentType & {user: WithId<UserMongoDbType>}){
        const {content, user} = data

        const newComment:CommentMongoDbType={
            postId,
            content: content,
            commentatorInfo: {
                userId: user._id.toString(),
                userLogin: user.userName
            },
            createdAt: new Date()
        }

        const createdComment:CommentOutputType = await CommentRepository.createComment(newComment)
        return createdComment
    }
}