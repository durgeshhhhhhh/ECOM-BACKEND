export async function verifyUserInDb(dbObj, user) {
    try {
        const result = await dbObj.query(
            "SELECT *FROM USERS WHERE email = $1",
            [user.email]
        );

        if (result.rows.length > 0) {
            const detail = result.rows[0];
            const password = detail.password;

            if (password === user.password) {
                const res = "CONGRATULATIONS!! you have logedIn successfully";
                return { res: res, err: null };
            } else {
                const err = "Username and Password are not valid!!";
                return { res: null, err: err };
            }
        } else {
            const err = "Username does not exist ... Register First!!!!";
            return { res: null, err: err };
        }
    } catch (error) {
        console.error("Error in verifyUserInDb:", error);
        return { res: null, err: error.message };
    }
}