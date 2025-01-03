import bcrypt from "bcrypt";
export async function createuserInDb(dbObj, user) {
    try {
        const checkResult = await dbObj.query(
            "SELECT *FROM users WHERE email = $1",
            [user.email]
        );

        if (checkResult.rows.length > 0) {
            return {
                res: null,
                err: "E-mail address already exist..try to logIn",
            };
        } else {
            const saltRounds = 10;
            const hash = await bcrypt.hash(user.password, saltRounds);
            const res = await dbObj.query(
                "INSERT INTO users (name, phone_no, dob, email, password) VALUES($1, $2, $3, $4, $5) RETURNING id, name, phone_no, dob, email;",
                [user.name, user.phone_no, user.dob, user.email, hash]
            );

            const newUser = res.rows[0];

            const updateQuery = await dbObj.query(
                "UPDATE users SET created_at = NOW() WHERE id = $1 RETURNING *",
                [newUser.id]
            );

            console.log(res.rows[0]);
            console.log("User created at:",updateQuery.rows[0].created_at);
            return { res: res.rows[0], err: null };
        }
    } catch (err) {
        console.error("Error in createUSerInDb:", err);
        return { res: null, err: err };
    }
}
