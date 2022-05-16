import AddPostService from "../services/postService/post_service";
import PostDao from "../dao/post_dao/post_dao";

export default class ServiceLocator {

    private static readonly instances: Map<string, any> = new Map<string, any>();

    static get postDao(): PostDao {
        const key = "category_dao";
        if (!this.instances.get(key)) {
            this.instances.set(key, new PostDao());
        }
        return this.instances.get(key);
    }

    static get addPostService(): AddPostService {
        const key = "add_post_service";
        if (!this.instances.get(key)) {
            this.instances.set(
                key,
                new AddPostService(this.postDao)
            );
        }
        return this.instances.get(key);
    }

    static get getPostsService(): AddPostService {
        const key = "get_posts_service";
        if (!this.instances.get(key)) {
            this.instances.set(
                key,
                new AddPostService(this.postDao)
            );
        }
        return this.instances.get(key);
    }

    static get updatePostService(): AddPostService {
        const key = "update_post_service";
        if (!this.instances.get(key)) {
            this.instances.set(
                key,
                new AddPostService(this.postDao)
            );
        }
        return this.instances.get(key);
    }

    static get deletePostService(): AddPostService {
        const key = "delete_post_service";
        if (!this.instances.get(key)) {
            this.instances.set(
                key,
                new AddPostService(this.postDao)
            );
        }
        return this.instances.get(key);
    }


}