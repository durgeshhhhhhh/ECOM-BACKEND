import { refreshAccessToken } from "../../services/user/refreshToken.user.service.js";

export const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies || req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    const result = await refreshAccessToken(refreshToken);

    if (result.error) {
      return res.status(401).json({
        success: false,
        message: result.error,
      });
    }

    res.cookie("accessToken", result.res.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: result.res.accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
