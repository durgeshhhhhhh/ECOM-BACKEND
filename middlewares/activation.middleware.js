import { getDbInstance } from "../db/config/config.db.js";
import { userQueries } from "../db/user/query.db.js";

export async function verifyActivationCode(req, res, next) {
    const verificationCode = req.body.verificationCode;

    if (!verificationCode) {
        return res.status(401).json({ error: "Verification code missing" });
    }

    try {
        const dbObj = getDbInstance();
        const queryResult = await dbObj.query(
            userQueries.selectUserByVerificationCode,
            [verificationCode]
        );

        if (queryResult.rows.length === 0) {
            return res.status(401).json({ error: "Invalid verification code" });
        }

        const user = queryResult.rows[0];

        if (user.deleted_at) {
            return res.status(401).json({ error: "Account has been deleted" });
        }

        if (new Date() > new Date(user.verification_code_expires_at)) {
            return res.status(401).json({ error: "Verification code has expired" });
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone_no: user.phone_no,
            dob: user.dob
        };

        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
} 