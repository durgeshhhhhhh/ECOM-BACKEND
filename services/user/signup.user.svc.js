import { getDbInstance } from "../../db/config/config.db.js";
import { createuserInDb } from "../../db/user/user.db.js";

export async function createUser(name, password) {
    let dbInstance = getDbInstance();
    let res = await createuserInDb(dbInstance, { name, password });

    if (!!res.err) {
        console.log(res.err);
    } else {
        console.debug(res.res);
    }

    return { name, password };
}
