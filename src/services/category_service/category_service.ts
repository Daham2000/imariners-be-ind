import {Category} from "../../db/models/category";
import CategoryDAO from "../../db/dao/category_dao/category_dao";
import DataModel from "../../db/models/dataModel";

const uniqid = require('uniqid');

export default class CategoryService {

    constructor(
        public categoryDAO: CategoryDAO,
    ) {
    }

    async addCategory(category: Category): Promise<any> {
        category.categoryId = `${uniqid()}`;
        category.categoryContentLink = [""];
        category.categoryLearners = 0;
        const t = await this.categoryDAO.addCategory(category);
        let content_links = [];
        let stringObj = JSON.parse(t[0].content_links);
        for (let i = 0; i < stringObj.links.length; i++) {
            console.log(stringObj.links[i])
            content_links.push(stringObj.links[i]);
        }
        let subCategories = await this.getSubCategories(category.categoryId);
        return {
            "categoryId": t[0].c_id,
            "categoryName": t[0].categoryName,
            "categoryLearners": t[0].categoryLearners,
            "hasSubCategories": t[0].hasSubCategories == 1,
            "categoryContentLink": content_links,
            "subCategories": subCategories
        }
    }

    async getCategories(dataModel: DataModel): Promise<any> {
        const categories = await this.categoryDAO.getAllCategories(dataModel);
        let ca = [];
        for (let index = 0; index < categories.length; index++) {
            let content_links = [];
            let stringObj = JSON.parse(categories[index].content_links);
            for (let i = 0; i < stringObj.links.length; i++) {
                content_links.push(stringObj.links[i]);
            }
            let subCategories = await this.getSubCategories(categories[index].c_id);
            ca.push({
                "categoryId": categories[index].c_id,
                "categoryName": categories[index].categoryName,
                "categoryLearners": categories[index].categoryLearners,
                "hasSubCategories": categories[index].hasSubCategories == 1,
                "categoryContentLink": content_links,
                "subCategories": subCategories
            });
        }
        return {
            "totalItems": categories.length,
            "currentPage": dataModel.page,
            "categories": ca
        }
    }

    async uploadContent() {

    }

    async getSubCategories(categoryId: string) {
        const subCategoriesResult = await this.categoryDAO.getSubCategories(categoryId);
        let subCategories = [];
        for (let i = 0; i < subCategoriesResult.length; i++) {
            let content_links_sub = [];
            let subCategoryLinks = JSON.parse(subCategoriesResult[i].content_links);
            for (let i = 0; i < subCategoryLinks.length; i++) {
                content_links_sub.push(subCategoryLinks.links[i]);
            }
            const superSubCategoriesResult = await this.categoryDAO.getSuperSubCategories(subCategoriesResult[i].s_c_id);
            let superSubCategories = [];
            for (let i = 0; i < superSubCategoriesResult.length; i++) {
                let content_links_sub = [];
                let subCategoryLinks = JSON.parse(superSubCategoriesResult[i].content_links);
                for (let i = 0; i < subCategoryLinks.length; i++) {
                    content_links_sub.push(subCategoryLinks.links[i]);
                }
                superSubCategories.push({
                    "superSubCategoryId": superSubCategoriesResult[i].ss_c_id,
                    "name": superSubCategoriesResult[i].categoryName,
                    "categoryContentLink": content_links_sub
                });
            }
            subCategories.push({
                "subCategoryId": subCategoriesResult[i].s_c_id,
                "name": subCategoriesResult[i].categoryName,
                "hasSubCategories": subCategoriesResult[i].hasSubCategories == 1,
                "categoryContentLink": content_links_sub,
                "subCategories": superSubCategories
            });
        }
        return subCategories;
    }
}