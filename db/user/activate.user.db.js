import { getDbInstance } from "../config/config.db.js";
import { userQueries } from "./query.db.js";

export async function activateUserInDb(userId) {
    let dbObj = getDbInstance();

    try {
        const result = await dbObj.query(userQueries.activateUserById, [userId]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "User Not Found" });
        }

        console.log(result.rows[0]);
        console.log("User activated Successfully");

        return { res: result.rows[0], err: null };
    } catch (error) {
        console.error("Error in activateUSerInDb:", error);
        return { res: null, err: error.message };
    }
}
