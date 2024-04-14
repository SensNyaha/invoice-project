import expressAsyncHandler from "express-async-handler";
import User from '../../models/userModel.js';

// $-title      Deactivate User Profile
// $-path       PATCH /api/v1/user/:id
// $-auth       Private, Admin

const adminDeactivateUserProfileById = expressAsyncHandler(async (req, res) => {
    const existingUser = await User.findById(req.params.id);

    if (existingUser) {
        existingUser.active = false;

        const updatedUser = await existingUser.save();

        res.json({
            success: true,
            message: `Пользователь ${updatedUser.username} был деактивирован администратором!`
        });
    } else {
        res.status(404).json({
            status: 404,
            message: "Пользователя с таким ID не обнаружено"
        });
        throw new Error("User was not found!");
    }
})

export default adminDeactivateUserProfileById;