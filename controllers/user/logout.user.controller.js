import { getDbInstance } from "../../db/config/config.db.js";
import { userQueries } from "../../db/user/query.db.js";

export async function logoutController(req, res) {
    const userId = req.user?.id;

    const dbObj = getDbInstance();

    if (!userId) {
        return res.status(400).json({ error: "Invalid User" });
    }

    try {
        const result = await dbObj.query(
            userQueries.userLogoutById,
            [userId]
        );

        console.log(result.rows[0]);
        console.log("User Logout Successfully at:", result.rows[0].logout_at);
        res.json({ message: "User Logout Succcessfull", res: result.rows[0] });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
