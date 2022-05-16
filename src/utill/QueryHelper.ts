import {Model} from "mongoose";
import {QueryHelperResult} from "../interfaces/query_helper_result";

export default class QueryHelper<T extends Document> {
    constructor(
        private populate: string[],
        private page: number,
        private limit: number
    ) {
    }

    public async generate(model: Model<any>): Promise<QueryHelperResult<T>> {
        const total = await model
            .countDocuments()
            .exec();
        const page = this.page;
        let data: any;

        data = model
            .find()
            .skip((this.page - 1) * this.limit)
            .limit(this.limit);

        this.populate.forEach((p) => data.populate(p));
        const items = await data.exec();
        return {
            total,
            page,
            items
        };
    }
}
