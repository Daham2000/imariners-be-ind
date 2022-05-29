import {Router} from "express";
import PostHandler from "../../services/postService/user_handler";
import UserHandler from "../../services/postService/user_handler";

const postRoute = Router();

postRoute.route("/register").post(UserHandler.registerUser);
postRoute.route("/login").get(UserHandler.loginUser);

export default postRoute;