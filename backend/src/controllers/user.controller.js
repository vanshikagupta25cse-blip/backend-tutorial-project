import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            age
        });

        await newUser.save();

        const userResponse = newUser.toObject();
delete userResponse.password;

res.status(201).json({
    message: "User registered successfully!",
    user: userResponse
});

    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
};
// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            message: "Users fetched successfully!",
            users
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};
// Update user
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully!",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
};
// Delete user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
};