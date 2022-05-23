import DBConnection from "../../utill/database";

export default abstract class Dao {

    async add(sql: string): Promise<any> {
        const mysqlDB = await DBConnection.connect();
        mysqlDB.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    }

    async update(updateParams: any, ref: string): Promise<any> {

    }

    async find(
        page: number,
        limit: number
    ): Promise<any[]> {
        return [];
    }

    async findOne(ref: string): Promise<any> {

    }

    async delete(ref: string): Promise<any> {

    }
}
