import { softDeleteUserInDb } from "../../db/user/delete.user.db.js";
import { getDbInstance } from "../../db/config/config.db.js";

export async function softDeleteUser(userId) {
    const dbInstance = getDbInstance();

    const result = await softDeleteUserInDb(userId, dbInstance);

    if (result.err) {
        return { err: result.err };
    } else {
        return result.res;
    }
}
