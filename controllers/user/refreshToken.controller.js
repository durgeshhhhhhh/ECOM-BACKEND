import jwt from "jsonwebtoken";
import { getDbInstance } from "../../db/config/config.db.js";

export async function refreshTokenController(req, res) {
    const dbObj = getDbInstance();

    const refreshToken = req.body.refreshToken;

    try {
        const queryResult = await dbObj.query(
            "SELECT *FROM PUBLIC.users WHERE refresh_token = $1",
            [refreshToken]
        );

        if (queryResult.rows.length === 0) {
            return res.status(401).json({ error: "Invalid Refresh Token" });
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

            res.json({ accessToken });
        } catch (error) {
            returnres.status(401).json({ error: "Invalid Refresh Token" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
