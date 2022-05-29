import {Router} from "express";
import postRoute from "../user_routes/user_route";
import categoryRouter from "../category_router/category_router";

const generalRouter = Router();

generalRouter.use("/auth", postRoute);
generalRouter.use("/user", postRoute);
generalRouter.use("/category", categoryRouter);

export default generalRouter;