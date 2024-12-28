import { getDbInstance } from "../../db/config/config.db.js";
import { activateUserInDb } from "../../db/user/activate.user.db.js";

export async function activateUser(userId) {
    const dbInstance = getDbInstance();

    const result = await activateUserInDb(userId, dbInstance);

    if (!!result.err) {
        return { err: result.err };
    } else {
        return { res: result.res };
    }
}
