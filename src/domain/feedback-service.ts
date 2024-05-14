import {CreateNewPostType} from "../types/posts/input";
import {PostOutputType} from "../types/posts/output";
import {PostMapper, PostRepository} from "../repositories/post-repository";
import {blogSortData, PaginationOutputType} from "../types/blogs/output";
import {postCollection} from "../db/db";
import {SortDirection} from "mongodb";

export class FeedbackService {


    static async sendFeedback(data: CreateNewPostType) {
        const {title, shortDescription, content, blogId} = data
        // Создаем новый пост для конкретного блога
        const newPost: PostOutputType | null = await PostRepository.createPost({
            title,
            shortDescription,
            content,
            blogId,
        });
        return newPost
    }
    static async allFeedbacks(blogId: string,sortData: blogSortData): Promise<PaginationOutputType<PostOutputType[]>> {
        const {pageSize, pageNumber, sortBy, sortDirection, searchNameTerm} = sortData
        const search = {blogId: blogId}
        const blog = await postCollection
            .find(search)
            .sort(sortBy, sortDirection as SortDirection) //был вариант(sortBy as keyof BlogOutputType, sortDirection as SortDirection))
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()


        // подсчёт элементов (может быть вынесено во вспомогательный метод)
        const totalCount = await postCollection.countDocuments(search)

        return {

            pagesCount: Math.ceil(totalCount / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            items: blog.map(b => PostMapper.toDto(b))
        }

    }

}