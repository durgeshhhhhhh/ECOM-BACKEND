const insertUserInDb = `INSERT INTO 
                        users (name, phone_no, dob, email, password) 
                        VALUES($1, $2, $3, $4, $5) 
                        RETURNING id, name, phone_no, dob, email, password;`;

const selectUserByEmail = "SELECT * FROM users WHERE email = $1";

const userCreatedAtById = `UPDATE users SET created_at = NOW() WHERE id = $1 RETURNING *`;

const userRefreshTokenById = `UPDATE users SET refresh_token = $1 where id = $2`;

const userDeletedAtById = ` UPDATE users 
                            SET deleted_at = NOW(),
                            is_active = false
                            WHERE id = $1
                            returning id, name, email, phone_no, dob, deleted_at;`;

const deactivateUserById = ` UPDATE users
                             SET is_active = false,
                             deactivated_at = NOW()
                             where id = $1
                             RETURNING id, name, email, phone_no, dob, deactivated_at;`;

const activateUserById = ` UPDATE users
                           SET is_active = true,
                           deactivated_at = null,
                           logout_at = null,
                           reactivated_at = NOW()
                           WHERE id = $1
                           RETURNING id, name, email, phone_no, dob, reactivated_at;`;

const updateUserById = `UPDATE users 
                         SET 
                         name = COALESCE($1, name),
                         email = COALESCE($2, email),
                         phone_no = COALESCE($3, phone_no),
                         dob = COALESCE($4, dob)
                         where id = $5
                         RETURNING id, name, email, phone_no, dob;`;

const selectUserById = `SELECT *FROM users WHERE id = $1`;

const selectUserDataById = `SELECT id, name, email, phone_no, dob FROM PUBLIC.users WHERE id = $1`;

const selectUserByRefreshToken = `SELECT *FROM PUBLIC.users WHERE refresh_token = $1`;

const selectUserByVerificationCode = `SELECT *FROM PUBLIC.users WHERE verification_code = $1`;

const userLogoutById = `UPDATE USERS 
                        SET refresh_token = null, logout_at = NOW() 
                        WHERE id = $1 
                        RETURNING id, name, email, phone_no, dob, logout_at;`;

const userQueries = {
  insertUserInDb,
  selectUserByEmail,
  userCreatedAtById,
  userRefreshTokenById,
  userDeletedAtById,
  deactivateUserById,
  activateUserById,
  updateUserById,
  selectUserById,
  selectUserDataById,
  selectUserByRefreshToken,
  selectUserByVerificationCode,
  userLogoutById,
};

export { userQueries };
