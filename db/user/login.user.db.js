import { getDbInstance } from "../config/config.db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { userQueries } from "./query.db.js";

env.config();

export async function verifyUserInDb(user) {
  try {
    let dbObj = getDbInstance();

    const queryResult = await dbObj.query(userQueries.selectUserByEmail, [
      user.email,
    ]);

    if (queryResult.rows.length === 0) {
      return {
        res: null,
        error: "Username does not exist ... Register First!!!!",
      };
    }

    const detail = queryResult.rows[0];

    if (detail.deleted_at) {
      return { res: null, err: "Account has been deleted" };
    }

    if (!detail.is_active) {
      return {
        res: null,
        err: "Account is not active. Please activate your account first.",
        needsActivation: true,
      };
    }

    const password = detail.password;
    const isMatch = await bcrypt.compare(user.password, password);

    if (isMatch) {
      const accessToken = jwt.sign(
        { id: detail.id, email: detail.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
      );

      const refreshToken = jwt.sign(
        { id: detail.id, email: detail.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
      );

      await dbObj.query(userQueries.userRefreshTokenById, [
        refreshToken,
        detail.id,
      ]);

      const res = {
        message: "Login Successful",
        "Access Token": accessToken,
        "Refresh Token": refreshToken,
      };

      console.log(res);
      return { res: res, error: null };
    } else {
      return { res: null, error: "Invalid username or password!!" };
    }
  } catch (error) {
    console.error("Error in verifyUserInDb:", error);
    return { res: null, error: error.message };
  }
}
