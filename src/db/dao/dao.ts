import DBConnection from "../../utill/database";

export default abstract class Dao {

    async query(sql: string): Promise<any> {
        const mysqlDB = await DBConnection.connect();
        let res;
        await new Promise((resolve, reject) => {
            mysqlDB.query(sql, function (err, result) {
                if (err) {
                    if (err) return reject(err);
                } else {
                    res = result;
                    resolve(result);
                }
            });
        });
        return res;
    }

}
