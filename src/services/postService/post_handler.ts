import {Request, Response} from "express";
import Joi = require("joi");
import PostModel from "../../models/postModel";
import ServiceLocator from "../../utill/serviceLocator";
import {errorResponse} from "../../utill/response";
import DataModel from "../../models/dataModel";
import {QueryHelperResult} from "../../interfaces/query_helper_result";

export default class PostHandler {

    public static async addPost(req: Request, res: Response): Promise<void> {
        const schema = Joi.object({
            accelerometerX: Joi.string().required(),
            accelerometerY: Joi.string().required(),
            accelerometerZ: Joi.string().required(),
            proximity: Joi.string(),
        });
        const validation = schema.validate(req.body);
        if (validation.error) {
            res.status(401).send(validation.error);
            return;
        }
        const body: PostModel = validation.value;
        const service = ServiceLocator.addPostService;
        try {
            await service.addPost(body);
            res.status(201).send({success: true});
        } catch (err) {
            const errorRes = errorResponse(err);
            res.status(errorRes.code).send(errorRes.message);
        }
    }

    // public static async getAllPosts(req: Request, res: Response): Promise<QueryHelperResult<any>> {
    //     const schema = Joi.object({
    //         page: Joi.number().default(1),
    //         limit: Joi.number().default(10),
    //     });
    //     const validation = schema.validate(req.query);
    //     if (!validation.error) {
    //         const filterData: DataModel = validation.value;
    //         const service = ServiceLocator.getPostsService;
    //         try {
    //             const result = await service.getPosts(filterData);
    //             res.status(200).send({result});
    //         } catch (err) {
    //             const errorRes = errorResponse(err);
    //             res.status(errorRes.code).send(errorRes.message);
    //         }
    //     } else {
    //         res.status(401).send(validation.error);
    //         return;
    //     }
    // }

    public static async updatePost(req: Request, res: Response): Promise<void> {
        const idSchema = Joi.object({
            id: Joi.string().required(),
        });
        const idValidation = idSchema.validate(req.params);
        if (idValidation.error) {
            res.status(401).send(idValidation.error);
            return;
        }
        const postId = idValidation.value.id;
        const service = ServiceLocator.updatePostService;
        try {
            await service.updatePost(postId, req.body);
            res.status(201).send({success: true});
        } catch (err) {
            const errorRes = errorResponse(err);
            res.status(errorRes.code).send(errorRes.message);
        }
    }

    public static async deletePost(req: Request, res: Response): Promise<void> {
        const id = Joi.object(
            {
                id: Joi.string().required()
            }
        );
        const idValidation = id.validate(req.params);
        if (idValidation.error) {
            res.status(401).send(idValidation.error);
            return;
        }
        const validatedPostId = idValidation.value.id;
        const service = ServiceLocator.updatePostService;
        try {
            await service.deletePost(validatedPostId);
            res.status(201).send({success: true});
        } catch (err) {
            const errorRes = errorResponse(err);
            res.status(errorRes.code).send(errorRes.message);
        }
    }

}