export async function createuserInDb(dbObj, user) {
    let insertQuery = `INSERT INTO public.user(name, password) VALUES( '${user.name}', '${user.password}') RETURNING *`;

    try {
        const res = await dbObj.query(insertQuery);
        return { res: res.rows, err: null };
    } catch (err) {
        return {res: null, err: err}
    }
}
