import {Router} from "express";
import postRoute from "../post_routes/post_route";

const generalRouter = Router();

generalRouter.use("/posts", postRoute);

export default generalRouter;