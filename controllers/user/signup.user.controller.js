import { createUser } from "../../services/user/signup.user.svc.js";

export async function signupController(req, res) {
    let body = req.body;

    const resp = await createUser(body?.name, body?.password);
    res.json({mssg: "Success", resp:resp});
}