const Student = require("../models/student");
const Complaint = require("../models/complaint");
const User = require("../models/userDetails");
const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");

const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudentById = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { username, email, rollNo, regNo, deptName } = req.body;

    // Update student by ID
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { username, email, rollNo, regNo, deptName },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a student by ID
const deleteStudentById = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    // Delete student by ID
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStudentComplaints = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    // Find complaints submitted by the student
    const complaints = await Complaint.find({ user: studentId });
    res.status(200).json({
      success: true,
      message: "Retrieved complaints",
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStudentDetails = async (req, res) => {
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
      const studentid = decode.studentId;
      console.log(studentid);
      const studentData = await Student.findById(studentid);
      if (!studentData) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }
      res.status(200).json({
        success: true,
        studentDetails: studentData,
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

module.exports = {
  getStudentById,
  updateStudentById,
  deleteStudentById,
  getStudentComplaints,
  getStudentDetails,
};
