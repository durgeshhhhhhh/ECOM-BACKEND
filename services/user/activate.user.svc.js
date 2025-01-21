import { activateUserInDb } from "../../db/user/activate.user.db.js";

export async function activateUser(userId) {
    const result = await activateUserInDb(userId);

    if (!!result.err) {
        return { err: result.err };
    } else {
        return { res: result.res };
    }
}
