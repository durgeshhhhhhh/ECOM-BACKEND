import { deactivateUserInDb } from "../../db/user/deactivate.user.db.js";
import { getDbInstance } from "../../db/config/config.db.js";

export async function deactivateUser(userId) {
    const dbInstance = getDbInstance();

    const result = await deactivateUserInDb(userId, dbInstance);

    if (!!result.err) {
        return { err: result.err };
    } else {
        return {res: result.res};
    }
}
