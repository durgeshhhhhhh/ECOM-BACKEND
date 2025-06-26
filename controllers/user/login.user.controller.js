import { verifyUserSvc } from "../../services/user/login.user.service.js";

export async function loginController(req, res) {
  let body = req.body;

  let response = await verifyUserSvc(body?.email, body?.password);

  if (response.err) {
    return res.status(400).json({ error: response.err });
  }

  res.json({ resp: response });
}
