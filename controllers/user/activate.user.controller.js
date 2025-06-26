import { activateUserSvc } from "../../services/user/activate.user.service.js";

export async function activateUserController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const response = await activateUserSvc(email, password);

  if (response.err) {
    return res.status(400).json({ error: response.err });
  }

  return res.json({
    message: "Account activated successfully!!",
    resp: response.res,
  });
}
