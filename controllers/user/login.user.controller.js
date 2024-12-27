import { verifyUser } from "../../services/user/login.user.svc.js";

export async function loginController(req, res) {
    let body = req.body;

    let response = await verifyUser(body?.email, body?.password);

    if(response.err){
        return res.status(400).json({error: response.err});
    }
    res.json({ resp: response });
}
