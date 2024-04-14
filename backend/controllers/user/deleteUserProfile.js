import expressAsyncHandler from "express-async-handler";
import User from '../../models/userModel.js';

// $-title      Delete User Profile
// $-path       DELETE /api/v1/user/profile/
// $-auth       Private

const deleteUserProfile = expressAsyncHandler(async (req, res) => {
    const userId = req.user._id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
        res.status(404).json({status: 404, message: "Не найден пользователь для удаления"});
        throw new Error("Not found user to delete one");
    }

    res.json({
        success: true,
        message: `Профиль ${deletedUser.username} был удален успешно!`
    })
})

export default deleteUserProfile;