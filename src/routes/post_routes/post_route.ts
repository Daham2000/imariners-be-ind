import {Router} from "express";
import PostHandler from "../../services/postService/post_handler";

const postRoute = Router();

// postRoute.route("/").post(PostHandler.addPost);
//
// postRoute.route("/").get(PostHandler.getAllPosts);

postRoute.route("/:id").patch(PostHandler.updatePost);

postRoute.route("/:id").delete(PostHandler.deletePost);

export default postRoute;