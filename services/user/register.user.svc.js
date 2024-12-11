import { getDbInstance } from "../../db/config/config.db.js";
import { createuserInDb } from "../../db/user/user.db.js";

export async function createUser(name, phone_no, email, password) {
    let dbInstance = getDbInstance();
    let res = await createuserInDb(dbInstance, { name, phone_no, email, password });

    if (!!res.err) {
        return { err: res.err };
    } else {
        return(res.res);
    }
}
