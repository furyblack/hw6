import {BlogMongoDbType, BlogOutputType} from "../types/blogs/output";
import {ObjectId, WithId} from "mongodb";
import {blogCollection} from "../db/db";
import {BlogMapper} from "./blog-repository";

export class QueryCommentRepository {

    static async getById(id: string): Promise<BlogOutputType | null> {
        const blog: WithId<BlogMongoDbType> | null = await blogCollection.findOne({_id: new ObjectId(id)})
        if (!blog) {
            return null
        }
        return BlogMapper.toDto(blog)
    }
}