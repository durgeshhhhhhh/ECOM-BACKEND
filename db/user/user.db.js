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
            const res = await dbObj.query(
                "INSERT INTO users (email, password) VALUES($1, $2) RETURNING * ",
                [user.email, user.password]
            );
            return { res: res.rows, err: null };
        }
    } catch (err) {
        return { res: null, err: err };
    }
}
