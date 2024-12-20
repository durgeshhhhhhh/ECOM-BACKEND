import { getDbInstance } from "../../db/config/config.db.js";
import { createuserInDb } from "../../db/user/register.user.db.js";

export async function createUser(name, phone_no, dob, email, password) {
    let dbInstance = getDbInstance();
    let res = await createuserInDb(dbInstance, {
        name,
        phone_no,
        dob,
        email,
        password,
    });

    if (!!res.err) {
        return { err: res.err };
    } else {
        return res.res;
    }
}
