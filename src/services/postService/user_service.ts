import PostDao from "../../db/dao/post_dao/user_dao";
import {PostDocument} from "../../db/schemaModels/post.model";
import PostModel from "../../db/models/postModel";
import UserModel from "../../db/models/userModel";

export default class UserService {
    constructor(
        public postDAO: PostDao
    ) {
    }

    async registerUser(user: UserModel): Promise<PostDocument> {
        return this.postDAO.registerUser(user);
    }
    //
    // async updatePost(id: string, post: PostModel): Promise<PostDocument[]> {
    //     return this.postDAO.updatePost(id, post);
    // }
    //
    // async deletePost(id: string): Promise<PostDocument[]> {
    //     return this.postDAO.deletePost(id);
    // }
}