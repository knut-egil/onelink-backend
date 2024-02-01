// Import
import express from "express";
import routes from "./routes";

// Set up express app
const app = express();

// Set up middleware
app.use(express.json());

// Use routes!
app.use(routes);

// Define listen port
const PORT = process.env.PORT ?? 3000;

// Listen
app.listen(PORT, () => {
  // Log
  console.log(
    `[${new Date().toISOString()}] Onelink Backend @ http://127.0.0.1:${PORT}/`
  );
});
