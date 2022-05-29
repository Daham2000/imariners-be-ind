import {Router} from "express";
import CategoryHandler from "../../services/category_service/category_handler";

const categoryRouter = Router();

categoryRouter.route("/").post(CategoryHandler.addCategory);
categoryRouter.route("/").get(CategoryHandler.getAllCategories);

export default categoryRouter;