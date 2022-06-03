import {Connection} from "mysql";
import mysql from 'mysql';
let db: Connection;
export function init(): void {
    if(!db){
        db = mysql.createConnection({
            host: "database-1.cxyzvpyv6wa8.us-west-2.rds.amazonaws.com",
            port: 3306,
            user: "admin",
            password: "1234$#!qwerQ",
            database: "my_db12"
        });
    }
}

export function getConnection(): Connection{
    if(!db) {
        throw new Error('The db pool has not been initialized, call init({}) prior to get().');
    }
    return db;
}

