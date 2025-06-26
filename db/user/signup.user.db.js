import bcrypt from "bcrypt";
import { getDbInstance } from "../config/config.db.js";
import { userQueries } from "./query.db.js";

export async function createuserInDb(user) {
  try {
    let dbObj = getDbInstance();
    const checkResult = await dbObj.query(userQueries.selectUserByEmail, [
      user.email,
    ]);

    if (checkResult.rows.length > 0) {
      const existingUser = checkResult.rows[0];

      if (existingUser.deleted_at) {
        return {
          res: null,
          error: "This email was previously registered but the account has been deleted. Please use a different email address.",
        };
      }

      if (!existingUser.is_active) {
        return {
          res: null,
          error: "This account is deactivated. Please use the activation process to reactivate your account.",
        };
      }

      return {
        res: null,
        error: "E-mail address already exists. Please log in instead.",
      };
    } else {
      const saltRounds = 10;

      const hash = await bcrypt.hash(user.password, saltRounds);

      const res = await dbObj.query(userQueries.insertUserInDb, [
        user.name,
        user.phone_no,
        user.dob,
        user.email,
        hash,
      ]);

      const newUser = res.rows[0];

      const updateQuery = await dbObj.query(userQueries.userCreatedAtById, [
        newUser.id,
      ]);

      console.log(res.rows[0]);
      console.log("User created at:", updateQuery.rows[0].created_at);
      return { res: res.rows[0], error: null };
    }
  } catch (error) {
    console.error("Error in createUSerInDb:", error);
    return { res: null, error: error.message };
  }
}
