import {CommentMongoDbType, CommentOutputType} from "../types/comment/output-comment-type";
import {WithId} from "mongodb";
import {commentCollection} from "../db/db";
import {CreateNewCommentType, UpdateCommentType} from "../types/comment/input-comment-type";
import {QueryPostRepository} from "./query-post-repository";
import * as crypto from "crypto";
import {QueryCommentRepository} from "./query-comment-repository";
import e from "express";



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

    static  async updateComment(commentId: string, updateData:UpdateCommentType):Promise<boolean|null>{
        const post = await QueryCommentRepository.getById(commentId)
        if(!post){
            return null
        }
        const updateResult= await commentCollection.updateOne({id:commentId},{$set:{...updateData}})
        const updatedCount = updateResult.modifiedCount
        if(!updatedCount){
            return false
        }
        return true
    }

    static async deleteComment(id:string):Promise<boolean>{
        try {
            const result = await commentCollection.deleteOne({id:id})
            return result.deletedCount===1;
        }catch (error){
            console.error("Error deleting comment", error)
            return false
        }
    }
}

