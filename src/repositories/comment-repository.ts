import {CreateNewCommentType} from "../types/comment/input-comment-type";
import {CommentMongoDbType, CommentOutputType} from "../types/comment/output-comment-type";
import {WithId} from "mongodb";
import {commentCollection} from "../db/db";



export class CommentMapper {
    static toDto(comment: WithId<CommentMongoDbType>): CommentOutputType {
        return {
            id: comment._id.toString(),
            createdAt: comment.createdAt.toISOString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo
        }
    }
}

export class CommentRepository {
    static async createComment(comment:CommentMongoDbType):Promise<CommentOutputType>{
        const result = await commentCollection.insertOne(comment)
        return {
            ...comment,
            id: result.insertedId.toString(),
            createdAt: comment.createdAt.toISOString()
        }
    }
}

