export async function deactivateUserInDb(userId, dbObj) {
    try {
        const query = `
        UPDATE users
        SET is_active = false,
        deactivated_at = NOW()
        where id = $1
        RETURNING id, name, email, phone_no, dob, deactivated_at;
        `;

        const result = await dbObj.query(query, [userId]);

        if (result.rows.length === 0) {
            return { res: null, err: "User not found" };
        }

        console.log(result.rows[0]);
        console.log(
            "User Deactivated Successfully at:",
            result.rows[0].deactivated_at
        );

        return { res: result.rows[0], err: null };
    } catch (error) {
        console.error("Error in deactivateUserInDb:", error);
        return { res: null, err: error.message };
    }
}
