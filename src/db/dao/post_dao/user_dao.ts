import Dao from "../dao";
import UserModel from "../../models/userModel";

export default class UserDao extends Dao {

    async registerUser(user: UserModel): Promise<any> {
        return super.add(`INSERT INTO Users (uid, email,loggedIn,deviceId,subscriptionStatus,username,lastLogin,password) VALUES (
        "${user.uid}",
        "${user.email}",
        "${user.loggedIn}",
        "${user.deviceId}",
        "${user.subscriptionStatus}",
        "${user.username}",
        "${user.lastLogin}",
        "${user.password}")
        `);
    }

}