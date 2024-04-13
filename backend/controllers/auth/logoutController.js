import expressAsyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

const logoutUser = expressAsyncHandler(async (req, res) => {
    const {cookies} = req;

    if (!cookies?.jwt) {
        res.status(401).json({status: 401, message: "Не принято ни одного JWT токена в куки запроса"});
        throw new Error("No cookie found in request");
    }

    const refreshToken = cookies.jwt;

    const existingUser = await User.findOne({refreshToken});

    if (!existingUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });
        res.status(204);
    }

    existingUser.refreshToken = existingUser.refreshToken.filter(token => token !== refreshToken);

    await existingUser.save();

    res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });
    res.json({
        success: true,
        message: `${existingUser.firstName} разлогинился успешно!`
    })
})

export default logoutUser;