import {Router} from "express";
import postRoute from "../user_routes/user_route";

const generalRouter = Router();

generalRouter.use("/auth", postRoute);
generalRouter.use("/user", postRoute);

export default generalRouter;