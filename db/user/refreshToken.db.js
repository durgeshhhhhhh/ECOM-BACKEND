import { userQueries } from "./query.db.js";
import { getDbInstance } from "../config/config.db.js";
import jwt from "jsonwebtoken";

export async function refreshTokenInDb(refreshToken) {
    const dbObj = getDbInstance();

    try {
        const queryResult = await dbObj.query(
            userQueries.selectUserByRefreshToken,
            [refreshToken]
        );

        if (queryResult.rows.length === 0) {
            return { res: null, err: "Invalid Refresh Tokren" };
        }

        if (queryResult.rows[0].deleted_at) {
            return { res: null, err: "Account has been deleted" };
        }

        if (!queryResult.rows[0].is_active) {
            return { res: null, err: "Account has been deactivated" };
        }

        try {
            const user = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );

            const accessToken = jwt.sign(
                { id: user.id, email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
            );

            const res = {
                message: "Token Refreshed",
                "Access Token": accessToken,
            };

            console.log(res);
            return { res: res, err: null };
        } catch (error) {
            console.error("Error during refresh token", error);
            return { res: null, err: "Invalid Refresh Token" };
        }
    } catch (error) {
        console.error("Error during refresh token", error);
        return { res: null, err: "Internal Server Error" };
    }
}
