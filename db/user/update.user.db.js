import { getDbInstance } from "../config/config.db.js";
import { userQueries } from "./query.db.js";

export async function updateUserInDb(userId, updatedData) {
  try {
    let dbObj = getDbInstance();

    const { name, email, phone_no, dob } = updatedData;

    const result = await dbObj.query(userQueries.updateUserById, [
      name,
      email,
      phone_no,
      dob,
      userId,
    ]);

    if (result.rows.length === 0) {
      return { res: null, error: "user not found" };
    }

    console.log(result.rows[0]);
    return { res: result.rows[0], error: null };
  } catch (error) {
    return { res: null, error: error.message };
  }
}
