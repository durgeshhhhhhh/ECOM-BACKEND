import { getDbInstance } from "../config/config.db.js";
import { userQueries } from "./query.db.js";

export async function authDb(id) {
    const dbObj = getDbInstance();

    const queryResult = await dbObj.query(userQueries.selectUserById, [id]);

    return queryResult.rows[0];
}
