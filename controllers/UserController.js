const { jwtDecode } = require("jwt-decode");
const User = require("../models/userDetails");
const Student = require("../models/student");
const jwt = require("jsonwebtoken");

const getUserType = async (req, res) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Generated Token:", token);
      const userId = decode.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        role: user.role,
      });
    } catch (error) {
      console.error("Token decoding error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to decode token",
      });
    }
  } catch (error) {
    console.error("Token extraction error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get user type",
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Generated Token:", token);
      const userId = decode.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      res.status(200).json({
        success: true,
        userId: user.id,
      });
    } catch (error) {
      console.error("Token decoding error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to decode token",
      });
    }
  } catch (error) {
    console.error("Token extraction error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get user type",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getUserById,
  updateUserById,
  deleteUserById,
  getUserType,
  getUserData,
};
