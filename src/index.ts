// Setup env
import dotenv from "dotenv";
dotenv.config({
  path: [".env", process.env.NODE_ENV].filter((v) => v).join("."),
});

// Import
import express from "express";
import cors from "cors";
import database from "./database";
import routes from "./routes";

// Connect to database!
database
  .init()
  .then((isInitialized) => {
    // Check if database successfully initialized
    if (!isInitialized)
      throw new Error("Failed to establish database connection.");

    // Success! Let's start our express app
    console.log(
      `[${new Date().toISOString()}] Onelink Backend @ Connected to database!`
    );
    // Set up express app
    const app = express();

    // Set up middleware
    app.use(cors());
    app.use(express.json());

    // Use routes!
    app.use("/api", routes);

    // Define listen port
    const PORT = process.env.PORT ?? 3000;

    // Listen
    app.listen(PORT, () => {
      // Log
      console.log(
        `[${new Date().toISOString()}] Onelink Backend @ http://127.0.0.1:${PORT}/`
      );
    });
  })
  .catch((err) => {
    // Database connection failed
    console.log(
      `[${new Date().toISOString()}] Onelink Backend @ Failed connecting to database, shutting down...`
    );

    // Exit
    process.exit();
  });
