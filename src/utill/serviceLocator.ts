import PostDao from "../db/dao/user_dao/user_dao";
import UserSubsDao from "../db/dao/user_dao/user_subs_dao";
import UserService from "../services/userService/user_service";
import CategoryService from "../services/category_service/category_service";
import CategoryDAO from "../db/dao/category_dao/category_dao";

export default class ServiceLocator {

    private static readonly instances: Map<string, any> = new Map<string, any>();

    static get postDao(): PostDao {
        const key = "category_dao";
        if (!this.instances.get(key)) {
            this.instances.set(key, new PostDao());
        }
        return this.instances.get(key);
    }

    static get userSubsDao(): UserSubsDao {
        const key = "user_subs_dao";
        if (!this.instances.get(key)) {
            this.instances.set(key, new UserSubsDao());
        }
        return this.instances.get(key);
    }

    static get categoryDoa(): CategoryDAO {
        const key = "category_dao";
        if (!this.instances.get(key)) {
            this.instances.set(key, new CategoryDAO());
        }
        return this.instances.get(key);
    }

    static get userService(): UserService {
        const key = "register_user_service";
        if (!this.instances.get(key)) {
            this.instances.set(
                key,
                new UserService(this.postDao,this.userSubsDao),
            );
        }
        return this.instances.get(key);
    }

    static get categoryService(): CategoryService {
        const key = "category_service";
        if (!this.instances.get(key)) {
            this.instances.set(
                key,
                new CategoryService(this.categoryDoa),
            );
        }
        return this.instances.get(key);
    }

}