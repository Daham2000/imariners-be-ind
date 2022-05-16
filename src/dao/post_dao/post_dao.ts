import Dao from "../dao";
import Post, {PostDocument} from "../../schemaModels/post.model";
import PostModel from "../../models/postModel";
import DataModel from "../../models/dataModel";
import QueryHelper from "../../utill/QueryHelper";
import {QueryHelperResult} from "../../interfaces/query_helper_result";

export default class PostDao extends Dao {
    constructor() {
        super(Post);
    }

    public async add(post: PostModel): Promise<PostDocument> {
        return super.add(post);
    }

    public async getAllPosts(filterData: DataModel,
    ): Promise<QueryHelperResult<any>> {
        const queryHelper = new QueryHelper(
            [""],
            filterData.page,
            filterData.limit
        );
        return await queryHelper.generate(Post);
    }

    public async updatePost(id: string, post: PostModel): Promise<PostDocument[]> {
        return this.model.findByIdAndUpdate(id, post);
    }

    public async deletePost(id: string): Promise<PostDocument[]> {
        return this.model.findByIdAndDelete(id);
    }

}