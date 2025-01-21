import { getDbInstance } from "../config/config.db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { userQueries } from "./query.db.js";

env.config();

export async function verifyUserInDb(user) {
    try {
        let dbObj = getDbInstance();

        const queryResult = await dbObj.query(userQueries.selectUserByEmail, [
            user.email,
        ]);

        if (queryResult.rows[0].deleted_at) {
            return { res: null, err: "Account has been deleted" };
        }

        if (queryResult.rows[0].deactivated_at) {
            return { res: null, err: "Account has been deactivated" };
        }

        if (queryResult.rows.length > 0) {
            const detail = queryResult.rows[0];
            const password = detail.password;

            const isMatch = await bcrypt.compare(user.password, password);
            if (isMatch) {
                const accessToken = jwt.sign(
                    { id: detail.id, email: detail.email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
                );

                const refreshToken = jwt.sign(
                    { id: detail.id, email: detail.email },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
                );

                await dbObj.query(userQueries.userRefreshTokenById, [
                    refreshToken,
                    detail.id,
                ]);

                const res = {
                    message: "Login Succesfull",
                    "Access Token": accessToken,
                    "Refresh Token": refreshToken,
                };

                console.log(res);
                return { res: res, err: null };
            } else {
                const err = "Invalid username or password!!";
                return { res: null, err: err };
            }
        } else {
            const err = "Username does not exist ... Register First!!!!";
            return { res: null, err: err };
        }
    } catch (error) {
        console.error("Error in verifyUserInDb:", error);
        return { res: null, err: error.message };
    }
}
