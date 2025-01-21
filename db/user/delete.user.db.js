import { getDbInstance } from "../config/config.db.js";
import { userQueries } from "./query.db.js";

export async function softDeleteUserInDb(userId) {
    try {
        let dbObj = getDbInstance();

        const result = await dbObj.query(userQueries.userDeletedAtById, [
            userId,
        ]);

        if (result.rows.length === 0) {
            return { res: null, err: "User Not Found" };
        }

        console.log(result.rows[0]);
        console.log("User Deleted Successfully at:", result.rows[0].deleted_at);

        return { res: result.rows[0], err: null };
    } catch (error) {
        console.error("Error in softDeleteUserInDb:", error);
        return { res: null, error: error.message };
    }
}
