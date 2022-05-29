export interface Category {
    categoryId:          string;
    categoryName:        string;
    categoryLearners:    number;
    hasSubCategories:    boolean;
    categoryContentLink: string[];
    subCategories:       SubCategory[];
}

export interface SubCategory {
    subCategoryId:       string;
    name:                string;
    hasSubCategories:    boolean;
    categoryContentLink: any[];
    subCategories:       SuperSubCategory[];
}

export interface SuperSubCategory {
    superSubCategoryId:  string;
    categoryContentLink: string[];
    name:                string;
}
