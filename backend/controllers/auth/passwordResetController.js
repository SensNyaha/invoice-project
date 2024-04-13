import expressAsyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerificationToken from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";

const domainURL = process.env.DOMAIN;

const { randomBytes } = await import("crypto");

// $-title      Send password reset email link
// $-path       POST /api/v1/auth/reset_password_request
// $-auth       Public

const resetPasswordLinkCreate = expressAsyncHandler(async (req, res) => {
    const {email} = req.body;

    if (!email) {
        res.status(400).json({status: 400, message: "Не передан адрес эл.почты для сброса пароля"});
        throw new Error("No email to reset password");
    }

    const existingUser = await User.findOne({email}).select("-passwordConfirm");

    if (!existingUser) {
        res.status(400).json({status: 400, message: "Пользователь с таким адресом эл.почты не был зарегистирован ранее"});
        throw new Error("No user with this email was registered");
    }

    let verificationToken = await VerificationToken.findOne({_userId: existingUser._id});

    if (verificationToken) {
        await verificationToken.deleteOne();
    }

    const resetToken = randomBytes(32).toString("hex");

    let newVericationToken = await new VerificationToken({
        _userId: existingUser._id,
        token: resetToken,
        createdAt: Date.now()
    }).save();

    if (existingUser && existingUser.isEmailVerified) {
        const emailLink = `${domainURL}/api/v1/auth/reset_password?emailToken=${newVericationToken.token}&userId=${existingUser._id}`;

        const payload = {
            name: existingUser.firstName,
            link: emailLink,
        }

        await sendEmail(
            existingUser.email,
            "Сброс пароля - запрос",
            payload,
            "./template/reqResPassword.hbs"
        )

        res.status(200).json({
            success: true,
            message: "На вашу почту было выслано эл.письмо со ссылкой на сброс пароля от Вашей учетной записи!"
        })
    }
})

// $-title      Reset user password
// $-path       POST /api/v1/auth/reset_password
// $-auth       Public

const resetPassword = expressAsyncHandler(async (req, res) => {
    const {password, passwordConfirm, userId, emailToken} = req.body;

    if (!password) {
        res.status(400).json({status: 400, message: "Не передан новый пароль для сброшенного аккаунта"});
        throw new Error("No password for reseting accounts password");
    }

    if (passwordConfirm !== password || !passwordConfirm) {
        res.status(400).json({status: 400, message: "Подтверждение пароля не совпадает со значением пароля"});
        throw new Error("Password confirm doesnt equal password value");
    }

    if (password.length < 8) {
        res.status(400).json({status: 400, message: "Пароль должен быть длиннее восьми символов!"});
        throw new Error("Password must be 9 chars length at least");
    }

    const passwordResetToken = await VerificationToken.findOne({_userId: userId, token: emailToken});

    if (!passwordResetToken) {
        res.status(400).json({status: 400, message: "Ваш токен не валиден, либо истек по сроку"});
        throw new Error("Your token is invalid or expired");
    }

    const existingUser = await User.findById(passwordResetToken._userId).select("-passwordConfirm");

    if (existingUser) {
        existingUser.password = password;
        await existingUser.save();

        const payload = {
            name: existingUser.firstName,
        }

        await passwordResetToken.deleteOne();

        await sendEmail(
            existingUser.email,
            "Успешный сброс пароля!",
            payload,
            "./template/resetPassword.hbs"
        );

        res.json({
            success: true,
            message: `Для аккаунта ${existingUser.firstName} пароль успешно сброшен и изменен!`
        })
    }
})

export {resetPasswordLinkCreate, resetPassword};