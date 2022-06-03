import {Router} from "express";
import CategoryHandler from "../../services/category_service/category_handler";
import multer from "multer";

const uploader = multer({ dest: 'uploads/' })




const categoryRouter = Router();

categoryRouter.route("/").post(CategoryHandler.addCategory);
categoryRouter.route("/").get(CategoryHandler.getAllCategories);
categoryRouter.route("/content").post(uploader.single("file"), CategoryHandler.uploadContent);
categoryRouter.route("/single/:id").get(CategoryHandler.getSingleCategory);

export default categoryRouter;