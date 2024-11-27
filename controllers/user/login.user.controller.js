import { verifyUser } from "../../services/user/login.user.svc.js";

export async function loginController(req, res) {
    let body = req.body;

    let response = await verifyUser(body?.email, body?.password);
    res.json({ resp: response });
}