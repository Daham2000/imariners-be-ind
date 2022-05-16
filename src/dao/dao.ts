import {Model} from "mongoose";
import DBConnection from "../utill/database";

export default abstract class Dao {
    protected mongoDB = DBConnection.connect();

    protected constructor(protected model: Model<any>) {
    }

    async add(item: any): Promise<any> {
        // eslint-disable-next-line new-cap
        return new this.model(item).save();
    }

    async update(updateParams: any, ref: string): Promise<any> {
        const opts = {
            runValidators: true,
            useFindAndModify: true,
        };
        return this.model.findByIdAndUpdate(ref, updateParams, opts);
    }

    async find(
        page: number,
        limit: number
    ): Promise<any[]> {
        return this.model.find().skip((page-1)*limit).limit(limit);
    }

    async findOne(ref: string): Promise<any> {
        return this.model.findById(ref);
    }

    async delete(ref: string): Promise<any> {
        return this.model.findByIdAndDelete(ref);
    }
}
