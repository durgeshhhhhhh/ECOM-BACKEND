import { getDbInstance } from "../config/config.db.js";
import { userQueries } from "./query.db.js";

export async function deactivateUserInDb(userId) {
    try {
        let dbObj = getDbInstance();

        const result = await dbObj.query(userQueries.deactivateUserById, [
            userId,
        ]);

        if (result.rows.length === 0) {
            return { res: null, err: "User not found" };
        }

        console.log(result.rows[0]);
        console.log(
            "User Deactivated Successfully at:",
            result.rows[0].deactivated_at
        );

        return { res: result.rows[0], err: null };
    } catch (error) {
        console.error("Error in deactivateUserInDb:", error);
        return { res: null, err: error.message };
    }
}
