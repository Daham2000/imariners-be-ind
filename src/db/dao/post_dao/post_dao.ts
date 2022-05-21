import Dao from "../dao";
import Post, {PostDocument} from "../../schemaModels/post.model";
import PostModel from "../../models/postModel";

export default class PostDao extends Dao {
    constructor() {
        super(Post);
    }

    public async add(post: PostModel): Promise<PostDocument> {
        return super.add(post);
    }

    public async updatePost(id: string, post: PostModel): Promise<PostDocument[]> {
        return this.model.findByIdAndUpdate(id, post);
    }

    public async deletePost(id: string): Promise<PostDocument[]> {
        return this.model.findByIdAndDelete(id);
    }

}