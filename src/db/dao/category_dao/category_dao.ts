import Dao from "../dao";
import {Category} from "../../models/category";
import DataModel from "../../models/dataModel";

const uniqid = require('uniqid');

export default class CategoryDAO extends Dao {
    async addCategory(category: Category): Promise<any> {
        await super.query(`INSERT INTO Categories (c_id, categoryName,content_links,hasSubCategories,categoryLearners) VALUES (
        "${category.categoryId}",
        "${category.categoryName}",
        '{"links":[]}',
        ${category.hasSubCategories},
        ${category.categoryLearners})
        `);
        for (let i = 0; i < category.subCategories.length; i++) {
            category.subCategories[i].subCategoryId = `${uniqid()}`;
            await super.query(`INSERT INTO SubCategories (
        c_id, s_c_id,categoryName,content_links,hasSubCategories) VALUES (
        "${category.categoryId}",
        "${category.subCategories[i].subCategoryId}",
        "${category.subCategories[i].name}",
        '{"links":[]}',
        "${category.subCategories[i].hasSubCategories}")
        `);

            for (let ii = 0; ii < category.subCategories[i].subCategories.length; ii++) {
                {
                    category.subCategories[i].subCategories[ii].superSubCategoryId = `${uniqid()}`;
                    await super.query(`INSERT INTO SuperSubCategories (
                    ss_c_id, s_c_id,categoryName,content_links) VALUES (
                    "${category.subCategories[i].subCategories[ii].superSubCategoryId}",
                    "${category.subCategories[i].subCategoryId}",
                    "${category.subCategories[i].subCategories[ii].name}",
                                   '{"links":[]}')
                    `);
                }
            }
        }
        return super.query(`SELECT * from Categories where c_id="${category.categoryId}" `);
    }

    async getSingleCategory(categoryId: string): Promise<any> {
        return super.query(`SELECT * from Categories where c_id="${categoryId}" `);
    }

    async getAllCategories(dataModel: DataModel): Promise<any> {
        let skip = (dataModel.page-1) * dataModel.limit;
        let limit = skip + ',' + dataModel.limit;
        return super.query(`SELECT * from Categories limit ${limit}`);
    }

    async getSubCategories(categoryId: string): Promise<any> {
        return super.query(`SELECT * from SubCategories where c_id="${categoryId}" `);
    }

    async getSuperSubCategories(categoryId: string): Promise<any> {
        return super.query(`SELECT * from SuperSubCategories where s_c_id="${categoryId}" `);
    }

}