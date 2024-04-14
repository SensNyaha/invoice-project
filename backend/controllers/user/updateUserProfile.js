import expressAsyncHandler from "express-async-handler";
import User from '../../models/userModel.js';

// $-title      Update User Profile Info
// $-path       PATCH /api/v1/user/profile/
// $-auth       Private

const updateUserProfile = expressAsyncHandler(async (req, res) => {

    const userId = req.user._id;

    const {password, passwordConfirm, email, isEmailVerfied, provider, roles, googleID, username} = req.body;

    const user = await User.findById(userId);

    if (!user) {
        res.status(400).json({status: 400, message:'Пользователь не найден!'});
        throw new Error("User doesnt exist");
    }

    if (password || passwordConfirm) {
        res.status(400).json({status: 400, message:'Данный маршрут не позволяет изменить пароль аккаунта! Воспользуйтесь reset_password'});
        throw new Error("Use RESET_PASSWORD to change account's password");
    }

    if (email || isEmailVerfied || provider || roles || googleID) {
        res.status(400).json({status: 400, message:'У Вас нет полномочий изменять данные поля'});
        throw new Error("You are not allowed to change that field by this route");
    }

    const fieldsToUpdate = req.body;

    const updatedProfile = await User.findByIdAndUpdate(userId, fieldsToUpdate, {new: true, runValidators: true}).select("-refreshToken");

    res.json({
        success: true,
        message: `Аккаунт ${user.firstName} был успешно обновлен`,
        updatedProfile
    })
})

export default updateUserProfile;