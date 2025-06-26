import { activateUserInDb } from "../../db/user/activate.user.db.js";

export async function activateUserSvc(email, password) {
  const result = await activateUserInDb(email, password);

  if (!!result.err) {
    return { err: result.err };
  } else {
    return { res: result.res };
  }
}
