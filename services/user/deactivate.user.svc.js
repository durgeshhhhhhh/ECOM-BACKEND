import { deactivateUserInDb } from "../../db/user/deactivate.user.db";
import { getDbInstance } from "../../db/config/config.db";

export async function deactivateUser(userId) {
    const dbInstance = getDbInstance();

    const result = await deactivateUserInDb(userId, dbInstance);

    if (!!result.err) {
        return { err: result.err };
    } else {
        return result.res;
    }
}
