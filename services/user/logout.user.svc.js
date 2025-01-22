import { logoutUserInDb } from "../../db/user/logout.user.db.js";

export async function logoutUserSvc(userId) {
    const result = await logoutUserInDb(userId);

    if (result.err) {
        return { err: result.err };
    } else {
        return result.res;
    }
}
