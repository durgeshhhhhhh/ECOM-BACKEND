import { createUser } from "../../services/user/register.user.svc.js";

export async function signupController(req, res) {
    let body = req.body;

    const resp = await createUser(body?.email, body?.password);
    res.json({ mssg: "Success", resp: resp });
}
