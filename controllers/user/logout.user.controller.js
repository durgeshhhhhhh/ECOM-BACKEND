import { logoutUserSvc } from "../../services/user/logout.user.svc.js";

export async function logoutController(req, res) {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(400).json({ error: "Invalid User" });
    }

    let response = await logoutUserSvc(userId);

    if (response.err) {
        return res.status(400).json({ error: response.err });
    }

    return res.json({ message: "User logged out successfully!! ", resp: response });
}
