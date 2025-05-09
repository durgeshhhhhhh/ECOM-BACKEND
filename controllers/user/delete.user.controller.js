import { softDeleteUserSvc } from "../../services/user/delete.user.svc.js";

export async function deleteUserController(req, res) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: "Unauthorized" });
  }

  const response = await softDeleteUserSvc(userId);

  if (response.err) {
    return res.status(400).json({ error: response.err });
  }

  res.json({ message: "User Deleted successfully!!", resp: response.res });
}
