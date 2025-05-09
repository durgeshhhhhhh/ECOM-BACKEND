export async function createUserTable(dbObj) {
    let createUserTableQuery = `CREATE TABLE IF NOT EXISTS "users"(
        id SERIAL PRIMARY KEY,
        name varchar(100) NOT NULL,
        phone_no varchar(15) UNIQUE,
        dob DATE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        refresh_token TEXT,
        created_at TIMESTAMP WITH TIME ZONE,
        logout_at TIMESTAMP WITH TIME ZONE,
        is_active BOOLEAN DEFAULT TRUE,
        deactivated_at TIMESTAMP WITH TIME ZONE,
        reactivated_at TIMESTAMP WITH TIME ZONE,
        deleted_at TIMESTAMP WITH TIME ZONE
    )`;

    let res = await dbObj.query(createUserTableQuery);
}
