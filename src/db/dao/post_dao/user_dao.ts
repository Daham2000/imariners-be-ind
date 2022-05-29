import Dao from "../dao";
import UserModel from "../../models/userModel";

export default class UserDao extends Dao {

    async registerUser(user: UserModel): Promise<any> {
        const users = await super.query(`SELECT * from Users where email="${user.email}"`);
        if (users.length > 0) {
            throw "Duplicated email";
        } else {
            await super.query(`INSERT INTO Users (uid, email,loggedIn,deviceId,subscriptionStatus,username,lastLogin,password) VALUES (
        "${user.uid}",
        "${user.email}",
        "${user.loggedIn}",
        "${user.deviceId}",
        "${user.subscriptionStatus}",
        "${user.username}",
        "${user.lastLogin}",
        "${user.password}")
        `);
            return super.query(`SELECT * from Users where uid="${user.uid}"`);
        }

    }

    async loginUser(user: UserModel): Promise<any> {
        await super.query(`SELECT * from Users where email="${user.email}" AND password="${user.password}"`);
        await super.query(`UPDATE Users SET lastLogin = "${user.lastLogin}", deviceId = "${user.deviceId}",
                    loggedIn = true
                    where email="${user.email}" AND password="${user.password}" `);
        return super.query(`SELECT * from Users where email="${user.email}" AND password="${user.password}" `);
    }

}