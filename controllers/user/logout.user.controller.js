import { getDbInstance } from "../../db/config/config.db.js";

export async function logoutController(req, res) {
    const userId = req.user?.id;

    const dbObj = getDbInstance();

    if (!userId) {
        return res.status(400).json({ error: "Invalid User" });
    }

    try {
        await dbObj.query(
            "UPDATE USERS SET refresh_token = null, logout_at = NOW() WHERE id = $1",
            [userId]
        );

        const logoutTime = await dbObj.query(
            "SELECT logout_at FROM users WHERE id = $1",
            [userId]
        );

        console.log("User Logout Successfully at:", logoutTime.rows[0].logout_at);
        res.json({ message: "Logout Successfull" });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
