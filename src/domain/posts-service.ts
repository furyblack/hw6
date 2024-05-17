import {CreateNewPostType, UpdatePostType} from "../types/posts/input";
import {PostOutputType, PostMongoDbType} from "../types/posts/output";
import {PostRepository} from "../repositories/post-repository";
import {CreateNewCommentType} from "../types/comment/input-comment-type";
import {CommentOutputType} from "../types/comment/output-comment-type";
import {CommentRepository} from "../repositories/comment-repository";


export class PostMapper{
    static toDto(post:PostMongoDbType):PostOutputType{
        return {
            id: post._id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt.toISOString()
        }
    }
}

export class PostService{
    //TODO вынести мапинг в квери репу
    static async createPost(postParams: CreateNewPostType): Promise<PostOutputType | null>{
     return await PostRepository.createPost(postParams)
    }


    static async  updatePost(postId: string,  updateData:UpdatePostType): Promise<boolean | null>{
       return  await PostRepository.updatePost(postId, updateData)
    }

    static async deletePost(id: string): Promise<boolean>{
       return await PostRepository.deletePost(id)

    }

    static async createComment(data: CreateNewCommentType){
        const {content, postId} =data

        const newComment:CommentOutputType|null =await CommentRepository.createComment({
            content,
            commentatorInfo,
            postId,

            "id": "string",
            "content": "string",
            "commentatorInfo": {
                "userId": "string",
                "userLogin": "string"
            },
            "createdAt": "2024-05-17T12:49:14.985Z"
        }
        });
    }

}
