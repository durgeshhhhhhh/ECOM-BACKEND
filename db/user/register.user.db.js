import bcrypt from "bcrypt";
import { getDbInstance } from "../config/config.db.js";
import { userQueries } from "./query.db.js";

export async function createuserInDb(user) {
    try {
        let dbObj = getDbInstance();
        const checkResult = await dbObj.query(userQueries.selectUserByEmail, [
            user.email,
        ]);

        if (checkResult.rows.length > 0) {
            return {
                res: null,
                err: "E-mail address already exist..try to logIn",
            };
        } else {
            const saltRounds = 10;
            const hash = await bcrypt.hash(user.password, saltRounds);
            const res = await dbObj.query(userQueries.insertUserInDb, [
                user.name,
                user.phone_no,
                user.dob,
                user.email,
                hash,
            ]);

            const newUser = res.rows[0];

            const updateQuery = await dbObj.query(userQueries.userCreatedAtById, [
                newUser.id,
            ]);

            console.log(res.rows[0]);
            console.log("User created at:", updateQuery.rows[0].created_at);
            return { res: res.rows[0], err: null };
        }
    } catch (err) {
        console.error("Error in createUSerInDb:", err);
        return { res: null, err: err };
    }
}
