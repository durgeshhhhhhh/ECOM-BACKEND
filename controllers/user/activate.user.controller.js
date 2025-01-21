import { activateUserSvc } from "../../services/user/activate.user.svc.js";

export async function activateUserController(req, res) {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await activateUserSvc(userId);

    if (response.err) {
        return res.status(400).json({ error: response.err });
    }

    return res.json({
        message: "User activated successfully!!",
        resp: response.res,
    });
}
