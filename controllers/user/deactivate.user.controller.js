import { deactivateUserSvc } from "../../services/user/deactivate.user.svc.js";

export async function deactivateUserController(req, res) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const response = await deactivateUserSvc(userId);

  if (response.err) {
    return res.status(400).json({ error: response.err });
  }

  return res.json({
    message: "User Deactivated Successfully!!",
    resp: response.res,
  });
}
