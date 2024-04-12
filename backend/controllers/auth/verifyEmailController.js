import expressAsyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerificationModel from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";

const domainURL = process.env.DOMAIN;

// $-title  User email verif
// $-path   GET /api/v1/auth/verify/:emailToken/:userId
// $-auth   Public

const verifyUserEmail = expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.params.userId}).select("-passwordConfirm");
    if (!user) {
        res.status(400);
        throw new Error("Не обнаружен пользователь с таким токеном")
    }
    if (user.isEmailVerified) {
        res.status(400).send("Эл. почта уже была подтверждена. Войдите!")
    }

    const userToken = await VerificationModel.findOne({
        _userId: user.id,
        token: req.params.emailToken
    })

    if (!userToken) {
        res.status(400);
        throw new Error("Токен некорректный!")
    }

    user.isEmailVerified = true;
    await user.save();

    if (user.isEmailVerified) {
        const emailLink = `${domainURL}/login`;

        const payload = {
            name: user.firstName,
            link: emailLink
        }

        await sendEmail(user.email, "Добро пожаловать - аккаунт подтвержден!", payload, "./template/welcome.hbs")

        res.redirect("/auth/verify");
    }
})

export default verifyUserEmail;