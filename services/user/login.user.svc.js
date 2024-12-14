import { getDbInstance } from "../../db/config/config.db.js";
import { verifyUserInDb } from "../../db/user/login.user.db.js";

export async function verifyUser(email, password) {
    let dbInstance = getDbInstance();

    let res = await verifyUserInDb(dbInstance, { email, password });

    if (!!res.err) {
        return { err: res.err };
    } else {
        return res.res;
    }
}
