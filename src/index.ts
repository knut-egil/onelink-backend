// Import
import express from "express";

// Set up express app
const app = express();

// Set up middleware
app.use(express.json());

// Define listen port
const PORT = process.env.PORT ?? 3000;

// Listen
app.listen(PORT, () => {
  // Log
  console.log(
    `[${new Date().toISOString()}] Onelink Backend @ http://127.0.0.1:${PORT}/`
  );
});
