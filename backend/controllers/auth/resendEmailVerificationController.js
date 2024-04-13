import expressAsyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerificationToken from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";

const domainURL = process.env.DOMAIN;

const { randomBytes } = await import("crypto");

// $-title      Resend Email Verification Token
// $-path       POST /api/v1/auth/resend_email_token
// $-auth       Public

const resendEmailVerificationToken = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ status: 400, message: "Не было передано электронной почты в процессе запроса" });
        throw new Error("No email was provided");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400).json({ status: 400, message: "Не найдено пользователя с аналогичным адресом эл. почты" });
        throw new Error("No user with the same email");
    }

    if (user.isEmailVerified) {
        res.status(400).json({ status: 400, message: "Аккаунт данного пользователя уже был успешно подтвержден" });
        throw new Error("User with this email has alreaady been verified");
    }

    let verificationToken = await VerificationToken.findOne({ _userId: user._id });

    if (verificationToken) {
        await verificationToken.deleteOne();
    }

    const resentToken = randomBytes(32).toString("hex");

    let emailToken = await new VerificationToken({
        _userId: user._id,
        token: resentToken
    }).save();

    const emailLink = `${domainURL}/api/v1/auth/verify/${emailToken.token}/${user._id}`;

    const payload = {
        name: user.firstName,
        link: emailLink
    }

    await sendEmail(user.email, "Подтверждение аккаунта", payload, './template/accountVerif.hbs');

    res.json({
        success: true,
        message: `${user.firstName}, на Вашу эл.почту была отправлена ссылка с подтверждением!`
    })
})

export default resendEmailVerificationToken;