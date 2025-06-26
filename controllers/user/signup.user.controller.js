import { createUserSvc } from "../../services/user/signup.user.service.js";

export async function signupController(req, res) {
  let body = req.body;

  const resp = await createUserSvc(
    body?.name,
    body?.phone_no,
    body?.dob,
    body?.email,
    body?.password
  );

  if (!!resp.error) {
    return res.status(400).json({ error: resp.err });
  } else {
    res.json({ mssg: "Successfully Registered", resp: resp });
  }
}
