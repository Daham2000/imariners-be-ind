import Dao from "../dao";
import UserModel from "../../models/userModel";

export default class UserDao extends Dao {

    async registerUser(user: UserModel): Promise<any> {
        return super.add("INSERT INTO users (name, address) VALUES ('Company Inc', 'Highway 37')");
    }

}