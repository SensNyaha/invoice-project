import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import { systemLogs } from "../../utils/Logger.js";

// $-title      Login User, get access and refresh tokens
// $-path       POST /api/v1/auth/login
// $-auth       Public

const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ status: 400, message: "Пожалуйста, введите почту и пароль!" });
        throw new Error("No email or password!!");
    }

    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
        res.status(404).json({ status: 404, message: "Нет пользователя с такой почтой" });
        systemLogs.error("incorrect email");
        throw new Error("No the same email user");
    }
    if (!(await existingUser.comparePassword(password))) {
        res.status(400).json({ status: 400, message: "Неправильный пароль!" });
        systemLogs.error("incorrect password");
        throw new Error("Wrong password");
    }
    if (!existingUser.isEmailVerified) {
        res.status(400).json({ status: 400, message: "Аккаунт не подтвержден! Выполните верификацию!" });
        systemLogs.error("not verified user");
        throw new Error("Not verified account");
    }
    if (!existingUser.active) {
        res.status(400).json({ status: 400, message: "Ваш аккаунт деактивирован! Логин невозможен!" });
        throw new Error("Account is blocked");
    }
    if (existingUser && existingUser.comparePassword(password)) {
        const accessToken = jwt.sign({
            id: existingUser._id,
            roles: existingUser.roles,
        }, process.env.JWT_ACCESS_SECRET_KEY, {
            expiresIn: "1h"
        });

        const refreshToken = jwt.sign({
            id: existingUser._id,
        }, process.env.JWT_REFRESH_SECRET_KEY, {
            expiresIn: "7d"
        });

        const cookies = req.cookies;

        const newRefreshTokenArray = !cookies?.jwt ? existingUser.refreshToken : existingUser.refreshToken.filter((e) => e !== cookies.jwt);

        if (cookies?.jwt) {
            const refreshToken = cookies.jwt;
            const existingRefreshToken = await User.findOne({ refreshToken });

            if (!existingRefreshToken) {
                newRefreshTokenArray = [];
            }

            const options = {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: "None"
            }

            res.clearCookie("jwt", options);
        }
        existingUser.refreshToken = [...newRefreshTokenArray, refreshToken];
        await existingUser.save();

        const options = {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: "None"
        };

        res.cookie("jwt", refreshToken, options);
        res.json({
            success: true,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            username: existingUser.username,
            provider: existingUser.provider,
            avatar: existingUser.avatar,
            accessToken
        })
    }
    else {
        res.status(401).json({status: 401, message:'Неавторизованный запрос!'});
        systemLogs.error("Unauthorized request! Invalid credits!");
        throw new Error("Unauthorized request! Invalid credits!");
    }
})

export default loginUser;