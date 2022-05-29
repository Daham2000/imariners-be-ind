import PostDao from "../../db/dao/post_dao/user_dao";
import UserModel from "../../db/models/userModel";
const uniqid = require('uniqid');

export default class UserService {
    constructor(
        public postDAO: PostDao
    ) {
    }

    async registerUser(user: UserModel): Promise<any> {
        user.uid = `${uniqid()}`;
        user.loggedIn = false;
        user.deviceId = "none";
        user.subscriptionStatus = "free";
        user.lastLogin = "none";
        const t = await this.postDAO.registerUser(user);
        if(t!="Duplicated email"){
            return {
                "uid":t[0].uid,
                "email":t[0].email,
                "loggedIn":t[0].loggedIn,
                "deviceId":t[0].deviceId,
                "subscriptionStatus":t[0].subscriptionStatus,
                "username":t[0].username,
                "lastLogin":t[0].lastLogin
            }
        }

    }

    async loginUser(user: UserModel): Promise<any> {
        const t = await this.postDAO.loginUser(user);
        return {
            "uid":t[0].uid,
            "email":t[0].email,
            "loggedIn":t[0].loggedIn,
            "deviceId":t[0].deviceId,
            "subscriptionStatus":t[0].subscriptionStatus,
            "username":t[0].username,
            "lastLogin":t[0].lastLogin
        }
    }

}