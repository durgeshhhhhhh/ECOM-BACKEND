import jwt from "jsonwebtoken";
import { getDbInstance } from "../../db/config/config.db";

export async function refreshTokenController(req, res) {
    const dbObj = getDbInstance();

    const refreshToken = req.body.refeshToken;

    try {
        const queryResult = await dbObj.query(
            "SELECT *FROM PUBLIC.users WHERE refresh_token = $1",
            [refreshToken]
        );

        if (queryResult.rows.length === 0) {
            return res.status(401).json({ error: "Invalid Refresh Token" });
        }

        jwt.verify()
    } catch (error) {}
}
