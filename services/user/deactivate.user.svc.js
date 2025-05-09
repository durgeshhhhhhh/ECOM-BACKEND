import { deactivateUserInDb } from "../../db/user/deactivate.user.db.js";

export async function deactivateUserSvc(userId) {
  const result = await deactivateUserInDb(userId);

  if (!!result.err) {
    return { err: result.err };
  } else {
    return { res: result.res };
  }
}
