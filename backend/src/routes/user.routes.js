
import express from "express";

import {
    registerUser,
    getAllUsers,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";

const router = express.Router();

// Create a new user
router.post("/", registerUser);

// Get all users
router.get("/", getAllUsers);

// Update a user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

export default router;
