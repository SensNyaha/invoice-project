import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

// $-title      Get new access token from refresh token
// $-path       GET /api/v1/auth/new_access_token
// $-auth       Public
// we're rotating refresh tokens, deleting the old ones, creating new ones, detecting token reuse

const newAccessToken = expressAsyncHandler(async (req, res) => {
    const {cookies} = req;

    if (!cookies?.jwt) return res.status(401).json({status: 401, message: "Не принято ни одного JWT токена в куки запроса"});

    const refreshToken = cookies.jwt;
    const options = {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None"
    };
    
    res.clearCookie("jwt", options);

    const existingUser = await User.findOne({refreshToken});

    if (!existingUser) {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, async (err, decoded) => {
            if (err) return res.status(403).json({status: 403, message: "Ошибка при верификации пользователя"});

            const hackedUser = await User.findById(decoded.id);
            hackedUser.refreshToken = [];
            await hackedUser.save();
        });
        return res.status(403).json({status: 403, message: "Кажется, имела место попытка взлома!"})
    }

    const newRefreshTokenArray = existingUser.refreshToken.filter(e => e !== refreshToken);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, async (err, decoded) => {
        if (!err) {
            existingUser.refreshToken = [...newRefreshTokenArray];
            await existingUser.save();
        }

        if (err || existingUser._id.toString() !== decoded.id) {
            return res.status(403).json({status: 403, message: "Неконсистентные данные"});
        }

        const accessToken = jwt.sign({
            id: existingUser._id,
            roles: existingUser.roles
        }, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: "1h"});

        const newRefreshToken = jwt.sign({
            id: existingUser._id,
            roles: existingUser.roles
        }, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: "7d"});

        existingUser.refreshToken = [
            ...newRefreshTokenArray, newRefreshToken
        ];

        await existingUser.save();

        res.cookie("jwt", newRefreshToken, options);
        
        res.json({
            success: true, 
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            username: existingUser.username,
            provider: existingUser.provider,
            avatar: existingUser.avatar,
            accessToken
        })
    });
})

export default newAccessToken;