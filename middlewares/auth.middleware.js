import jwt from "jsonwebtoken";
import { authDb } from "../db/user/auth.db.js";

export async function jwtAuthentication(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access denied, token missing" });

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decode.id;

    const user = await authDb(id);

    if (user.deleted_at) {
      return res.status(401).json({ error: "Account has been deleted" });
    }

    if (!user.is_active && !req.path.includes("/activate")) {
      return res.status(403).json({ error: "Account has been deactivated" });
    }

    if (
      user.logout_at &&
      new Date(decode.iat * 1000) < new Date(user.logout_at)
    ) {
      return res
        .status(401)
        .json({ "Token is invalid": "User has Logged out" });
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone_no: user.phone_no,
      dob: user.dob,
    };

    req.user = userData;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Access Token" });
  }
}
