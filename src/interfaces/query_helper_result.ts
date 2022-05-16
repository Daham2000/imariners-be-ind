export interface QueryHelperResult<T> {
    total: number;
    page: number;
    items: T[];
}