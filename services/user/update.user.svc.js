import { updateUserInDb } from "../../db/user/update.user.db.js";

export async function updateUserSvc(userId, updatedData) {
  const result = await updateUserInDb(userId, updatedData);

  if (result.err) {
    return { err: result.err };
  } else {
    return result.res;
  }
}
