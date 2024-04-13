import expressAsyncHandler from "express-async-handler";
import User from '../../models/userModel.js';

// $-title      Get User Profile Info
// $-path       GET /api/v1/user/profile/
// $-auth       Private


const getUserProfile = expressAsyncHandler(async (req, res) => {

    const userId = req.user._id;

    const userProfile = await User.findById(userId, {
        refreshToken: 0,
        roles: 0,
        _id: 0
    }).lean();

    if (!userProfile) {
        res.status(404).json({status: 404, message:"Профиль пользователя не найден"});
        throw new Error("User profile not found");
    }

    res.json({
        success: true,
        userProfile,
    })
})

export default getUserProfile;