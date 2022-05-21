import PostDao from "../../db/dao/post_dao/post_dao";
import {PostDocument} from "../../db/schemaModels/post.model";
import PostModel from "../../db/models/postModel";

export default class PostService {
    constructor(
        public postDAO: PostDao
    ) {
    }

    async addPost(post: PostModel): Promise<PostDocument> {
        return this.postDAO.add(post);
    }

    async updatePost(id: string, post: PostModel): Promise<PostDocument[]> {
        return this.postDAO.updatePost(id, post);
    }

    async deletePost(id: string): Promise<PostDocument[]> {
        return this.postDAO.deletePost(id);
    }
}