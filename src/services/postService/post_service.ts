import PostDao from "../../dao/post_dao/post_dao";
import {PostDocument} from "../../schemaModels/post.model";
import PostModel from "../../models/postModel";
import DataModel from "../../models/dataModel";
import {QueryHelperResult} from "../../interfaces/query_helper_result";

export default class PostService {
    constructor(
        public postDAO: PostDao
    ) {
    }

    async addPost(post: PostModel): Promise<PostDocument> {
        return this.postDAO.add(post);
    }

    async getPosts(filterData: DataModel,
    ): Promise<QueryHelperResult<any>> {
        return this.postDAO.getAllPosts(filterData);
    }

    async updatePost(id: string, post: PostModel): Promise<PostDocument[]> {
        return this.postDAO.updatePost(id, post);
    }

    async deletePost(id: string): Promise<PostDocument[]> {
        return this.postDAO.deletePost(id);
    }
}