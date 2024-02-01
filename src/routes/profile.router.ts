// Import
import { Router } from "express";
import { editUserProfile, getUserProfile } from "./../controllers/profile.controller";

// Create router
const router = Router();

// TODO: Create update profile endpoint (user-auth)
router.patch("/edit", /* Add user-auth middleware*/ editUserProfile);

// TODO: Create get profile endpoint (public)
router.get("/:username", getUserProfile);

export default router;
