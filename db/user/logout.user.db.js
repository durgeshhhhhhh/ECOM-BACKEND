import { getDbInstance } from "../config/config.db.js";
import { userQueries } from "./query.db.js";

export async function logoutUserInDb(userId) {
    try {
        const dbObj = getDbInstance();

        const result = await dbObj.query(userQueries.userLogoutById, [userId]);

        console.log(result.rows[0]);
        console.log("User Logout Successfully at:", result.rows[0].logout_at);

        return { res: result.rows[0], err: null };
    } catch (error) {
        console.error("Error during logout:", error);
        return { res: null, err: error.message };
    }
}
