import expressAsyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerificationToken from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";

const domainURL = process.env.DOMAIN;

const {randomBytes} = await import("crypto");

// $-title  Reg User and email verif
// $-path   POST /api/v1/auth/register
// $-auth   Public

const registerUser = expressAsyncHandler(async(req, res) => {
    const {email, username, firstName, lastName, password, passwordConfirm} = req.body;

    if (!email) {
        res.status(400);
        throw new Error("Адрес эл.почты обязателен");
    }
    if (!username) {
        res.status(400);
        throw new Error("Логин обязателен");
    }
    if (!firstName || !lastName) {
        res.status(400);
        throw new Error("Имя и фамилия обязательны");
    }
    if (!password) {
        res.status(400);
        throw new Error("Пароль должен быть передан")
    }
    if (!passwordConfirm) {
        res.status(400);
        throw new Error("Подтверждение пароля обязательно")
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400);
        throw new Error("Адрес эл. почты уже используется")
    }

    const newUser = new User({
        email, username, firstName, lastName, password, passwordConfirm
    })

    const registeredUser = await newUser.save();

    if (!registeredUser) {
        res.status(400);
        throw new Error("Пользователь не может быть зарегистрирован")
    }
    else {
        const verificationToken = randomBytes(32).toString('hex');

        let emailVerifToken = await new VerificationToken({
            _userId: registeredUser._id,
            token: verificationToken,
        }).save();

        const emailLink = `${domainURL}/api/v1/auth/verify/${emailVerifToken.token}/${registeredUser._id}`;

        const payload = {
            name: registeredUser.firstName,
            link: emailLink
        }

        await sendEmail(
            registeredUser.email,
            "Подтверждение аккаунта",
            payload,
            "./template/accountVerif.hbs"
        );

        res.json({
            success: true,
            message: `Новый пользователь ${registeredUser.firstName} был зарегистрирован! Подтверждение эл.почты отправлено!`
        })
    }
})

export default registerUser;