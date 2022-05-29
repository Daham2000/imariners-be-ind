import mysql = require("mysql");
import {Connection} from "mysql";

export default class DBConnection {

    static async connect(): Promise<Connection> {
        const db = mysql.createConnection({
            host: "database-1.cxyzvpyv6wa8.us-west-2.rds.amazonaws.com",
            port: 3306,
            user: "admin",
            password: "1234$#!qwerQ",
            database: "my_db12"
        });
        db.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
        });
        return db;
    }

}