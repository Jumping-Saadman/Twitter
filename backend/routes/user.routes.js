import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import {
    followUnfollowUser,
    getAllUsers,
    getSuggestedUsers,
    getUserProfile,
    updateUser
} from "../controllers/user.controller.js";

const router = express.Router()

router.get("/all", protectRoute, getAllUsers)
router.get("/profile/:userName", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUser);

export default router;