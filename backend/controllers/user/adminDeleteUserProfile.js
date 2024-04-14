import expressAsyncHandler from "express-async-handler";
import User from '../../models/userModel.js';

// $-title      Delete User Profile
// $-path       DELETE /api/v1/user/:id
// $-auth       Private, Admin

const adminDeleteUserProfileById = expressAsyncHandler(async (req, res) => {
    const existingUser = await User.findByIdAndDelete(req.params.id);

    if (existingUser) {
        res.json({
            success: true,
            message: `Пользователь ${existingUser.username} был удален администратором!`
        });
    } else {
        res.status(404).json({
            status: 404,
            message: "Пользователя с таким ID не обнаружено"
        });
        throw new Error("User was not found!");
    }
})

export default adminDeleteUserProfileById;