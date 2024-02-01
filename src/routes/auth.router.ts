// Import
import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

// Create router
const router = Router();

// TODO: Create register endpoint
router.post("/register", register);

// TODO: Create login endpoint
router.post("/login", login);

export default router;
