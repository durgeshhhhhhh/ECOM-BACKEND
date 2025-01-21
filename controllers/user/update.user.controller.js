import { updateUserSvc } from "../../services/user/update.user.svc.js";

export async function updateUserController(req, res) {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, email, phone_no, dob } = req.body;

    const response = await updateUserSvc(userId, { name, email, phone_no, dob });

    if (response.err) {
        return res.status(400).json({ error: response.err });
    }

    return res.json({ message: "user updated sucessfully!!", data: response });
}
