import expressAsyncHandler from "express-async-handler";
import User from '../../models/userModel.js';

// $-title      Get All Users
// $-path       GET /api/v1/user/all
// $-auth       Private/Admin

const getAllUserAccounts = expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    const count = await User.countDocuments({});

    const roles = req.roles;

    const users = await User.find()
        .sort({ createdAt: -1 })
        .select("-refreshToken")
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .lean();

    res.json({
        success: true,
        count,
        numberOfPages: Math.ceil(count / pageSize),
        users
    })
})

export default getAllUserAccounts;