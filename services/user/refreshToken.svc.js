import { refreshTokenInDb } from "../../db/user/refreshToken.db.js";

export async function refreshTokenSvc(refreshToken) {
    let res = await refreshTokenInDb(refreshToken);

    if (!!res.err) {
        return { err: res.err };
    } else {
        return res.res;
    }
}
