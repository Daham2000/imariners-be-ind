import {Router} from "express";
import PostHandler from "../../services/userService/user_handler";
import UserHandler from "../../services/userService/user_handler";

const postRoute = Router();

postRoute.route("/register").post(UserHandler.registerUser);
postRoute.route("/login").get(UserHandler.loginUser);
postRoute.route("/update").patch(UserHandler.updateUserSubscription);

export default postRoute;