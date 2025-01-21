import { softDeleteUserInDb } from "../../db/user/delete.user.db.js";

export async function softDeleteUser(userId) {
    const result = await softDeleteUserInDb(userId);

    if (result.err) {
        return { err: result.err };
    } else {
        return { res: result.res };
    }
}
