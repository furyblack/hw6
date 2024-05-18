import {BlogMongoDbType, BlogOutputType} from "../types/blogs/output";
import {ObjectId, WithId} from "mongodb";
import {blogCollection, commentCollection} from "../db/db";
import {BlogMapper} from "./blog-repository";
import {CommentMongoDbType, CommentOutputType} from "../types/comment/output-comment-type";
import {CommentMapper} from "./comment-repository";

export class QueryCommentRepository {

    static async getById(id: string): Promise<CommentOutputType | null> {
        const comment: WithId<CommentMongoDbType> | null = await commentCollection.findOne({_id: new ObjectId(id)})
        if (!comment) {
            return null
        }
        return CommentMapper.toDto(comment)
    }
}