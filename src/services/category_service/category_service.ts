import {Category} from "../../db/models/category";
import CategoryDAO from "../../db/dao/category_dao/category_dao";
import DataModel from "../../db/models/dataModel";
import CategoryContentModel from "../../db/models/categoryContentModel";
import {S3} from "aws-sdk";

import uniqid from "uniqid";
import fs from 'fs';

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
        const contentLinks = [];
        const stringObj = JSON.parse(t[0].content_links);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < stringObj.links.length; i++) {
            console.log(stringObj.links[i])
            contentLinks.push(stringObj.links[i]);
        }
        const subCategories = await this.getSubCategories(category.categoryId);
        return {
            "categoryId": t[0].c_id,
            "categoryName": t[0].categoryName,
            "categoryLearners": t[0].categoryLearners,
            "hasSubCategories": t[0].hasSubCategories === 1,
            "categoryContentLink": contentLinks,
            "subCategories": subCategories
        }
    }

    async getSingleCategory(categoryId: string): Promise<any> {
        const t = await this.categoryDAO.getSingleCategory(categoryId);
        const contentLinks = [];
        const stringObj = JSON.parse(t[0].content_links);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < stringObj.links.length; i++) {
            contentLinks.push(stringObj.links[i]);
        }
        const subCategories = await this.getSubCategories(categoryId);
        return {
            "categoryId": t[0].c_id,
            "categoryName": t[0].categoryName,
            "categoryLearners": t[0].categoryLearners,
            "hasSubCategories": t[0].hasSubCategories === 1,
            "categoryContentLink": contentLinks,
            "subCategories": subCategories
        }
    }

    async getCategories(dataModel: DataModel): Promise<any> {
        const categories = await this.categoryDAO.getAllCategories(dataModel);
        const ca = [];
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < categories.length; index++) {
            const contentLinks = [];
            const stringObj = JSON.parse(categories[index].content_links);
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < stringObj.links.length; i++) {
                contentLinks.push(stringObj.links[i]);
            }
            const subCategories = await this.getSubCategories(categories[index].c_id);
            ca.push({
                "categoryId": categories[index].c_id,
                "categoryName": categories[index].categoryName,
                "categoryLearners": categories[index].categoryLearners,
                "hasSubCategories": categories[index].hasSubCategories === 1,
                "categoryContentLink": contentLinks,
                "subCategories": subCategories
            });
        }
        return {
            "totalItems": categories.length,
            "currentPage": dataModel.page,
            "categories": ca
        }
    }

    async uploadContent(categoryContentModel: CategoryContentModel, file: any,
    ) {
        const accessKeyId = process.env.AWS_ACCESS_KEY;
        const secretAccessKey = process.env.AWS_SECRET_KEY;
        const bucketName = "contents-1";

        const s3 = new S3({
            accessKeyId,
            secretAccessKey
        });
        const fileContent = fs.createReadStream(file.path);
        const params = {
            Bucket: bucketName,
            Key: file.originalname,
            Body: fileContent
        };

        if (file !== undefined) {
            const res = await s3.upload(params).promise();
            if (categoryContentModel.categoryId !== undefined) {
                await this.categoryDAO.updateCategoryLinks(categoryContentModel.categoryId, res.Location);
            } else if (categoryContentModel.subCategory !== undefined) {
                await this.categoryDAO.updateSubCategoryLinks(categoryContentModel.categoryId, res.Location);
            } else if (categoryContentModel.superSubCategory !== undefined) {
                await this.categoryDAO.updateSuperSubCategoryLinks(categoryContentModel.categoryId, res.Location);
            }
            return res;
        }
    }

    async getSubCategories(categoryId: string) {
        const subCategoriesResult = await this.categoryDAO.getSubCategories(categoryId);
        const subCategories = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < subCategoriesResult.length; i++) {
            const contentLinksSub = [];
            const subCategoryLinks = JSON.parse(subCategoriesResult[i].content_links);
            // tslint:disable-next-line:no-shadowed-variable
            for (let i = 0; i < subCategoryLinks.length; i++) {
                contentLinksSub.push(subCategoryLinks.links[i]);
            }
            const superSubCategoriesResult = await this.categoryDAO.getSuperSubCategories(subCategoriesResult[i].s_c_id);
            const superSubCategories = [];
            // tslint:disable-next-line:prefer-for-of no-shadowed-variable
            for (let i = 0; i < superSubCategoriesResult.length; i++) {
                const contentLinksSubs = [];
                const subCategoryLink = JSON.parse(superSubCategoriesResult[i].content_links);
                // tslint:disable-next-line:no-shadowed-variable
                for (let i = 0; i < subCategoryLink.length; i++) {
                    contentLinksSubs.push(subCategoryLink.links[i]);
                }
                superSubCategories.push({
                    "superSubCategoryId": superSubCategoriesResult[i].ss_c_id,
                    "name": superSubCategoriesResult[i].categoryName,
                    "categoryContentLink": contentLinksSubs
                });
            }
            subCategories.push({
                "subCategoryId": subCategoriesResult[i].s_c_id,
                "name": subCategoriesResult[i].categoryName,
                "hasSubCategories": subCategoriesResult[i].hasSubCategories === 1,
                "categoryContentLink": contentLinksSub,
                "subCategories": superSubCategories
            });
        }
        return subCategories;
    }
}