import PostDao from "../../db/dao/post_dao/user_dao";
import UserModel from "../../db/models/userModel";

export default class UserService {
    constructor(
        public postDAO: PostDao
    ) {
    }

    async registerUser(user: UserModel): Promise<any> {
        user.uid = "U0002";
        user.loggedIn = false;
        user.deviceId = "none";
        user.subscriptionStatus = "free";
        user.lastLogin = "none";
        try {
            return this.postDAO.registerUser(user);
        } catch (e) {
            console.log(e);
        }
    }

}