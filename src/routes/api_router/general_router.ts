import {Router} from "express";
import postRoute from "../post_routes/user_route";

const generalRouter = Router();

generalRouter.use("/auth", postRoute);

export default generalRouter;