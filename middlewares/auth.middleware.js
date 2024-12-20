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

        const user = await dbObj.query(
            "SELECT id, name, email, phone_no FROM PUBLIC.users WHERE id = $1",
            [id]
        );

        req.user = user.rows[0];
    } catch (error) {
        return res.status(401).json({ error: "Invalid Access Token" });
    }

    next();
}
