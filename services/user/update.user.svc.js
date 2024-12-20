import { getDbInstance } from "../../db/config/config.db.js";
import { updateUserInDb } from "../../db/user/update.user.db.js";

export async function updateUser(userId, updatedData) {
    let dbInstance = getDbInstance();

    const result = await updateUserInDb(userId, updatedData, dbInstance);

    if (result.err) {
        return { err: result.err };
    } else {
        return result.res;
    }
}
