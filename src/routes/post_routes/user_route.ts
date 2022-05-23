import {Router} from "express";
import PostHandler from "../../services/postService/user_handler";
import UserHandler from "../../services/postService/user_handler";

const postRoute = Router();

postRoute.route("/register").post(UserHandler.registerUser);
//
// postRoute.route("/").get(PostHandler.getAllPosts);

// postRoute.route("/:id").patch(PostHandler.updatePost);
//
// postRoute.route("/:id").delete(PostHandler.deletePost);

export default postRoute;