import { getDbInstance } from "../config/config.db.js";

export async function updateUserInDb(userId, updatedData) {
    try {
        let dbObj = getDbInstance();
        
        const { name, email, phone_no, dob } = updatedData;

        const query = `UPDATE users 
        SET 
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        phone_no = COALESCE($3, phone_no),
        dob = COALESCE($4, dob)
        where id = $5
        RETURNING id, name, email, phone_no, dob;
        `;

        const result = await dbObj.query(query, [
            name,
            email,
            phone_no,
            dob,
            userId,
        ]);

        if (result.rows.length === 0) {
            return { res: null, err: "user not found" };
        }

        console.log(result.rows[0]);
        return { res: result.rows[0], err: null };
    } catch (error) {
        return { res: null, err: error.message };
    }
}
