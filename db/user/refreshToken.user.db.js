import { getDbInstance } from "../config/config.db.js";
import { userQueries } from "./query.db.js";

export const findRefreshToken = async (refreshToken) => {
  try {
    const dbObj = getDbInstance();
    const result = await dbObj.query(userQueries.selectUserByRefreshToken, [
      refreshToken,
    ]);

    if (result.rows.length === 0) {
      return { res: null, error: "User not found with this refresh token" };
    }

    return { res: result.rows[0], error: null };
  } catch (error) {
    return { res: null, error: error.message };
  }
};
