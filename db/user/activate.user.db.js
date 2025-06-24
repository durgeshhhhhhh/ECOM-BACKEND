import { getDbInstance } from "../config/config.db.js";
import { userQueries } from "./query.db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export async function activateUserInDb(email, password) {
  let dbObj = getDbInstance();

  try {
    const userResult = await dbObj.query(userQueries.selectUserByEmail, [
      email,
    ]);

    if (userResult.rows.length === 0) {
      return { res: null, err: "User not found" };
    }

    const user = userResult.rows[0];

    if (user.deleted_at) {
      return {
        res: null,
        err: "Account has been deleted and cannot be reactivated",
      };
    }

    if (user.is_active) {
      return { res: null, err: "Account is already active" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { res: null, err: "Invalid username or password" };
    }

    const result = await dbObj.query(userQueries.activateUserById, [user.id]);
    const activatedUser = result.rows[0];

    const accessToken = jwt.sign(
      { id: activatedUser.id, email: activatedUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { id: activatedUser.id, email: activatedUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    await dbObj.query(userQueries.userRefreshTokenById, [
      refreshToken,
      activatedUser.id,
    ]);

    const res = {
      message: "Account Reactivated Successfully",
      "AccessToken": accessToken,
      "RefreshToken": refreshToken,
    };

    console.log(res);
    console.log(
      "Account Reactivated Successfully at",
      activatedUser.reactivated_at
    );

    const sanitizedUser = {
      id: activatedUser.id,
      email: activatedUser.email,
      name: activatedUser.name,
      phone_no: activatedUser.phone_no,
      is_active: activatedUser.is_active,
      reactivated_at: activatedUser.reactivated_at,
    };

    return {
      res: {
        ...sanitizedUser,
        message: "Account Reactivated Successfully",
        "AccessToken": accessToken,
        "RefreshToken": refreshToken,
      },
      err: null,
    };
  } catch (error) {
    console.error("Error in activateUserInDb:", error);
    return { res: null, err: error.message };
  }
}
