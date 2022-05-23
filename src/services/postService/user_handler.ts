import {Request, Response} from "express";
import Joi = require("joi");
import ServiceLocator from "../../utill/serviceLocator";
import {errorResponse} from "../../utill/response";
import UserModel from "../../db/models/userModel";

export default class UserHandler {

    public static async registerUser(req: Request, res: Response): Promise<void> {
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        const validation = schema.validate(req.body);
        if (validation.error) {
            res.status(401).send(validation.error);
            return;
        }
        const body: UserModel = validation.value;
        const service = ServiceLocator.registerUser;
        try {
            await service.registerUser(body);
            res.status(201).send({success: true});
        } catch (err) {
            const errorRes = errorResponse(err);
            res.status(errorRes.code).send(errorRes.message);
        }
    }

}