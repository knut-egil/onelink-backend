// Import
import { Router } from "express";
import AuthRouter from "./auth";

// Create router
const router = Router();

// Hello, world endpoint
router.get("/", (req, res) => {
  res.end("Hello, world!");
});

// Use our auth router
router.use("/auth", AuthRouter);

export default router;
