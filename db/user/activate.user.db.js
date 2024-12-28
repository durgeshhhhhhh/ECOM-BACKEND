export async function activateUserInDb(userId, dbObj) {
    const query = `
    UPDATE users
    SET is_active = true,
    deactivated_at = null
    WHERE id = $1
    RETURNING id, name, email, phone_no, dob, deactivated_at;
    `;

    try {
        const result = await dbObj.query(query, [userId]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "User Not Found" });
        }

        console.log(result.rows[0]);
        console.log("User activated Successfully");

        return { res: result.rows[0], err: null };
    } catch (error) {
        console.error("Error in activateUSerInDb:", error);
        return { res: null, err: error.message };
    }
}
