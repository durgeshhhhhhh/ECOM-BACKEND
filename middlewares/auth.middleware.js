import jwt from "jsonwebtoken";
import { getDbInstance } from "../db/config/config.db.js";

export async function jwtAuthentication(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token)
        return res.status(401).json({ error: "Access denied, token missing" });

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const id = decode.id;
        let dbObj = getDbInstance();

        const result = await dbObj.query("SELECT *FROM users WHERE id = $1", [
            id,
        ]);

        const user = result.rows[0];
        console.log(user.deleted_at);

        if (user.deleted_at) {
            return res.status(401).json({ error: "Account has been deleted" });
        }

        if (
            user.logout_at &&
            new Date(decode.iat * 1000) < new Date(user.logout_at)
        ) {
            return res
                .status(401)
                .json({ "Token is invalid": "User has Logged out" });
        }

        const userData = await dbObj.query(
            "SELECT id, name, email, phone_no, dob FROM PUBLIC.users WHERE id = $1",
            [id]
        );

        req.user = userData.rows[0];

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid Access Token" });
    }
}
