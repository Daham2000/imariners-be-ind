import {getConnection} from "../../utill/database";

export default abstract class Dao {

    async query(sql: string): Promise<any> {
        const mysqlDB = getConnection();
        let res;
        await new Promise((resolve, reject) => {
            mysqlDB.query(sql, (err, result) => {
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
