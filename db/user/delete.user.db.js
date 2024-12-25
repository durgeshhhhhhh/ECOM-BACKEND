export async function softDeleteUserInDb(userId, dbObj) {
    try {
        const query = ` 
            UPDATE users 
            SET deleted_at = NOW()
            WHERE id = $1
            returning id, name, email, phone_no, dob, deleted_at;
            `;

        const result = await dbObj.query(query, [userId]);

        if (result.rows.length === 0) {
            return { res: null, err: "User Not Found" };
        }

        return { res: result.rows[0], err: null };
    } catch (error) {
        console.error("Error in softDeleteUserInDb:", error)
        return { res: null, error: error.message };
    }
}
