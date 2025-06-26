import jwt from "jsonwebtoken";

export function verifyRefreshToken(req, res, next) {
    const token = req.cookies.refreshToken || req.body.refreshToken;

    if (!token) {
        return res.status(401).json({ error: "Refreshment token missing" });
    }

    try {
        const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid Refreshment Token!!" });
    }
}