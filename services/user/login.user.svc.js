import { verifyUserInDb } from "../../db/user/login.user.db.js";

export async function verifyUserSvc(email, password) {
  let res = await verifyUserInDb({ email, password });

  if (!!res.err) {
    return { err: res.err };
  } else {
    return res.res;
  }
}
