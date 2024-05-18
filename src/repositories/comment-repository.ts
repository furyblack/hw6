import {CommentMongoDbType, CommentOutputType} from "../types/comment/output-comment-type";
import {WithId} from "mongodb";
import {commentCollection} from "../db/db";
import {CreateNewCommentType} from "../types/comment/input-comment-type";
import {QueryPostRepository} from "./query-post-repository";
import * as crypto from "crypto";



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
    static async createComment(commentParams:CommentMongoDbType):Promise<{commentId: string}>{

        const cteatedCommentData  = await commentCollection.insertOne(commentParams)
        return {
            commentId: cteatedCommentData.insertedId.toString(),
        }
    }
}

