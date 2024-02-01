// Import
import { Router } from "express";
import AuthRouter from "./auth.router";
import ProfileRouter from "./profile.router";

// Create router
const router = Router();

// Hello, world endpoint
router.get("/", (req, res) => {
  res.end("Hello, world!");
});

// Use our auth router
router.use("/auth", AuthRouter);

// Use our profile router
router.use("/profile", ProfileRouter);

export default router;
