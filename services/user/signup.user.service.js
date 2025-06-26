import { createuserInDb } from "../../db/user/signup.user.db.js";

export async function createUserSvc(name, phone_no, dob, email, password) {
  let res = await createuserInDb({
    name,
    phone_no,
    dob,
    email,
    password,
  });

  if (!!res.err) {
    return { err: res.err };
  } else {
    return res.res;
  }
}
