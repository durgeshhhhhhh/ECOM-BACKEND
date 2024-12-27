import { deactivateUser } from "../../services/user/deactivate.user.svc";

export async function deactivateUserController(req, res) {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await deactivateUser(userId);

    if (response.err) {
        return res.status(400).json({ error: response.err });
    }

    returnres.json({ message: "User Deactivated Successfully!!" });
}
