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
                "INSERT INTO users (email, password) VALUES($1, $2) RETURNING * ",
                [user.email, hash]
            );
            return { res: res.rows, err: null };
        }
    } catch (err) {
        return { res: null, err: err };
    }
}
