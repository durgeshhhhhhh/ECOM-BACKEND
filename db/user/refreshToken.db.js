```javascript
const dbObj = require("../../dbConfig");
const userQueries = require("../queries/userQueries");

const refreshTokenModel = {
    async getUserByRefreshToken(refreshToken) {
        try {
            const queryResult = await dbObj.query(
                userQueries.selectUserByRefreshToken,
                [refreshToken]
            );

            if (queryResult.rows.length === 0) {
                return { res: null, error: "Invalid Refresh Token" };  // Changed from err to error
            }
            return { res: queryResult.rows[0], error: null };
        } catch (error) {
            console.error("Error during refresh token", error);
            return { res: null, error: "Internal Server Error" };  // Changed from err to error
        }
    },
};

module.exports = refreshTokenModel;
```