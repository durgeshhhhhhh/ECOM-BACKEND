import jwt from "jsonwebtoken";
import { findRefreshToken } from "../../db/user/refreshToken.user.db.js";

export const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const tokenExists = await findRefreshToken(refreshToken);

    if (!tokenExists.res) {
      return { res: null, error: "Invalid refresh token" };
    }

    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    return { res: { accessToken }, error: null };
  } catch (error) {
    return { res: null, error: error.message };
  }
};
