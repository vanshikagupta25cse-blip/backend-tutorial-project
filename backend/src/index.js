import express from "express";
import "dotenv/config";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.routes.js";

// Create an Express application
const app = express();
// Middleware to read JSON data
app.use(express.json());

// User routes
app.use("/api/users", userRoutes);

// Define the port number
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Create our first route
app.get("/", (req, res) => {
    res.send("Backend server is running successfully!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
