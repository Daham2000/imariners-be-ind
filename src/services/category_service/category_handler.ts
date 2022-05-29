import {Request, Response} from "express";
import Joi = require("joi");
import ServiceLocator from "../../utill/serviceLocator";
import {errorResponse} from "../../utill/response";
import {Category} from "../../db/models/category";
import DataModel from "../../db/models/dataModel";

export default class CategoryHandler {
    public static async addCategory(req: Request, res: Response): Promise<void> {
        let superSubCategory = Joi.object().keys({
            name: Joi.string().required()
        })
        let subCategory = Joi.object().keys({
            name: Joi.string().required(),
            hasSubCategories: Joi.boolean().required(),
            subCategories: Joi.array().items(superSubCategory),
        })
        const schema = Joi.object({
            categoryName: Joi.string().required(),
            hasSubCategories: Joi.boolean().required(),
            subCategories: Joi.array().items(
                subCategory
            )
        });
        const validation = schema.validate(req.body);
        if (validation.error) {
            res.status(401).send(validation.error);
            return;
        }
        const body: Category = validation.value;
        const service = ServiceLocator.categoryService;
        try {
            const resp = await service.addCategory(body);
            res.status(201).send(resp);
        } catch (err) {
            console.log(err)
            const errorRes = errorResponse(err);
            res.status(errorRes.code).send(errorRes);
        }
    }

    public static async getAllCategories(req: Request, res: Response): Promise<void> {
        let schema = Joi.object().keys({
            page: Joi.number().required(),
            limit: Joi.number().required(),
            query: Joi.string()
        })
        const validation = schema.validate(req.query);
        if (validation.error) {
            res.status(401).send(validation.error);
            return;
        }
        const dataModel: DataModel = validation.value;
        const service = ServiceLocator.categoryService;
        try {
            const resp = await service.getCategories(dataModel);
            res.status(200).send(resp);
        } catch (err) {
            console.log(err)
            const errorRes = errorResponse(err);
            res.status(errorRes.code).send(errorRes);
        }
    }
}