import Dao from "../dao";
import {Category} from "../../models/category";
import DataModel from "../../models/dataModel";
import uniqid from 'uniqid';

export default class CategoryDAO extends Dao {
    async addCategory(category: Category): Promise<any> {
        await super.query(`INSERT INTO Categories (c_id, categoryName,content_links,hasSubCategories,categoryLearners) VALUES (
        "${category.categoryId}",
        "${category.categoryName}",
        '{"links":[]}',
        ${category.hasSubCategories},
        ${category.categoryLearners})
        `);
        if (category.hasSubCategories === true) {
            for (const item of category.subCategories) {
                item.subCategoryId = `${uniqid()}`;
                await super.query(`INSERT INTO SubCategories (
        c_id, s_c_id,categoryName,content_links,hasSubCategories) VALUES (
        "${category.categoryId}",
        "${item.subCategoryId}",
        "${item.name}",
        '{"links":[]}',
        "${item.hasSubCategories}")
        `);

                if (item.hasSubCategories === true) {
                    for (const item1 of item.subCategories) {
                        {
                            item1.superSubCategoryId = `${uniqid()}`;
                            await super.query(`INSERT INTO SuperSubCategories (
                    ss_c_id, s_c_id,categoryName,content_links) VALUES (
                    "${item1.superSubCategoryId}",
                    "${item.subCategoryId}",
                    "${item1.name}",
                                   '{"links":[]}')
                    `);
                        }
                    }
                }

            }
        }

        return super.query(`SELECT * from Categories where c_id="${category.categoryId}" `);
    }

    async getSingleCategory(categoryId: string): Promise<any> {
        return super.query(`SELECT * from Categories where c_id="${categoryId}" `);
    }

    async getAllCategories(dataModel: DataModel): Promise<any> {
        const skip = (dataModel.page - 1) * dataModel.limit;
        const limit = skip + ',' + dataModel.limit;
        if (dataModel.query === undefined) {
            return super.query(`SELECT * from Categories limit ${limit}`);
        }
        return super.query(`SELECT * from Categories Where categoryName LIKE "%${dataModel.query}%" limit ${limit}`);
    }

    async getSubCategories(categoryId: string): Promise<any> {
        return super.query(`SELECT * from SubCategories where c_id="${categoryId}" `);
    }

    async getSuperSubCategories(categoryId: string): Promise<any> {
        return super.query(`SELECT * from SuperSubCategories where s_c_id="${categoryId}" `);
    }

    async updateCategoryLinks(categoryId: string, link: string) {
        const r = await super.query(`SELECT content_links from Categories where c_id="${categoryId}" `);
        const stringObj = JSON.parse(r[0].content_links);
        const links = stringObj.links;
        links.push(link);
        const json = JSON.stringify(links);
        await super.query(`Update Categories SET content_links = '{"links":${json}}' `);
    }

    async updateSubCategoryLinks(categoryId: string, link: string) {
        const r = await super.query(`SELECT content_links from SubCategories where s_c_id="${categoryId}" `);
        const stringObj = JSON.parse(r[0].content_links);
        const links = stringObj.links;
        links.push(link);
        const json = JSON.stringify(links);
        await super.query(`Update SubCategories SET content_links = '{"links":${json}}' `);
    }

    async updateSuperSubCategoryLinks(categoryId: string, link: string) {
        const r = await super.query(`SELECT content_links from SuperSubCategories where ss_c_id="${categoryId}" `);
        const stringObj = JSON.parse(r[0].content_links);
        const links = stringObj.links;
        links.push(link);
        const json = JSON.stringify(links);
        await super.query(`Update SuperSubCategories SET content_links = '{"links":${json}}' `);
    }

}