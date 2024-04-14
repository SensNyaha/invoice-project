import express from "express";
import checkAuth from "../middleware/checkAuthMiddleware.js";
import roleMdlwr from '../middleware/roleMiddleware.js';
import getUserProfile from "../controllers/user/getUserProfile.js";
import updateUserProfile from "../controllers/user/updateUserProfile.js";
import deleteUserProfile from "../controllers/user/deleteUserProfile.js";
import getAllUserAccounts from "../controllers/user/adminGetAllUserAccounts.js";
import adminDeleteUserProfileById from "../controllers/user/adminDeleteUserProfile.js";
import adminDeactivateUserProfileById from "../controllers/user/adminDeactivateUserProfile.js";

const router = express.Router();

router.route("/profile")
    .get(checkAuth, getUserProfile)
    .patch(checkAuth, updateUserProfile)
    .delete(checkAuth, deleteUserProfile);

router.route("/all")
    .get(checkAuth, roleMdlwr.checkRole(roleMdlwr.ROLES.Admin), getAllUserAccounts);

router.route("/:id")
    .delete(checkAuth, roleMdlwr.checkRole(roleMdlwr.ROLES.Admin), adminDeleteUserProfileById)
    .patch(checkAuth, roleMdlwr.checkRole(roleMdlwr.ROLES.Admin), adminDeactivateUserProfileById);

export default router;