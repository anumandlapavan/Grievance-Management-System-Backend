// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userDetails");
const Admin = require("../models/admin");
const CategoryIncharge = require("../models/incharge");
const Student = require("../models/student");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Function to register a new user
const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      role,
      rollNo,
      regNo,
      Branch,
      assignedCategories,
    } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required details",
      });
    }

    if (role === "student") {
      var domainPattern = /^[0-9]{6}@student\.nitandhra\.ac\.in$/; 
      if (!domainPattern.test(email)) {
        return res.status(401).json({
          success: false,
          message:
            "Only college email IDs are allowed",
        });
      }
    }

    // const passwordRegex =
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
    //   });
    // }

    // var domain = email.split("@")[1];
    // if (role == "student" && domain !== "student.nitandhra.ac.in") {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Only college email IDs are allowed.",
    //   });
    // }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the User collection
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      // student,
      assignedCategories,
    });

    // Create role-specific record based on the user role
    let roleRecord;
    if (role === "admin") {
      roleRecord = await Admin.create({
        user: newUser._id,
        username,
        email,
        password: hashedPassword,
        role,
      });
    } else if (role === "categoryIncharge") {
      roleRecord = await CategoryIncharge.create({
        user: newUser._id,
        username,
        email,
        password: hashedPassword,
        role,
        assignedCategories,
      });
    } else if (role === "student") {
      roleRecord = await Student.create({
        user: newUser._id,
        username,
        email,
        password: hashedPassword,
        role,
        rollNo,
        regNo,
        Branch,
      });
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
      roleRecord,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

// Function to authenticate and login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }
    console.log("first")

    // Find user by email
    let user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("first")

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    console.log("first")

    // Generate JWT token
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
      assignedCategories: user.assignedCategories,
    };
    // let student = await Student.findOne({email});
    // // if (student) {
    // //   payload.studentId = student._id;
    // // }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Update user with token
    user.token = token;
    await user.save();

    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: `User Login Success`,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { signup, login };
