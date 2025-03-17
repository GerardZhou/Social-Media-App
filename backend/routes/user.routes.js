import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  followUnfollowUser,
  getUserProfile,
  getSuggestUsers,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);
// router.post("/update", protectRoute, updateUserProfile);

export default router;
