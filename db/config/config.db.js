import pg from "pg";
import env from "dotenv";

env.config();

var dbObj = null;

export async function dbSetup() {
    if (dbObj == null) {
        const db = new pg.Pool({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
            port: process.env.PG_PORT,
        });

        try {
            await db.connect();
            const res = await db.query("SELECT NOW()");
            console.log(res.rows); 
            dbObj = db;
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDbInstance(){
    if(dbObj == null){
        throw new Error("DB Setup is Pending");
    }else{
        return dbObj;
    }
}
