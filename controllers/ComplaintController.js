const Complaint = require("../models/complaint");
const User = require("../models/userDetails");
const Student = require("../models/student");
const Category = require("../models/category");

const submitComplaint = async (req, res) => {
  try {
    const { userId, category, title, description } = req.body;

    const student = await Student.findOne({ user: userId });
    console.log("student", student);
    const newComplaint = new Complaint({
      student: student._id,
      category,
      title,
      description,
    });

    await newComplaint.save();

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint: newComplaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getComplaintsByStudent = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User Id Not Found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const student = await Student.findOne({ user: userId });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not Found",
      });
    }

    let complaints;

    console.log("role", user.role);
    if (user.role === "student") {
      complaints = await Complaint.find({ student: student._id.toString() });
    } else if (user.role === "categoryIncharge") {
      complaints = await Complaint.find({ category: user.assignedCategories });
    } else {
      complaints = await Complaint.find();
    }

    res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }
    res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getComplaintsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryName = await Category.findById({ _id: categoryId });

    if (!categoryName) {
      return res.status(404).json({ message: "Notfound" });
    }

    const complaints = await Complaint.find({ category: categoryId });

    if (!complaints || complaints.length === 0) {
      return res
        .status(404)
        .json({ message: "No complaints found for this category" });
    }

    res.status(200).json({ complaints, categoryName });
  } catch (error) {
    console.error("Error fetching complaints by categoryId:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    const { status } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );
    if (!updatedComplaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteComplaintById = async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);
    if (!deletedComplaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
      complaint: deletedComplaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getComplaintDetails = async (req, res) => {
  try {
    const { complaintId } = req.body;
    if (!complaintId) {
      return res.status(404).json({
        success: false,
        message: "ID not found",
      });
    }

    const data = await Complaint.findById(complaintId)
      .populate("student")
      .exec();

    if (!data) {
      return res.status(401).json({
        success: false,
        message: "Data Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: data,
      });
    }
  } catch (err) {
    console.log("Error in getting details of the complaint");
    res.status(500).json({
      success: false,
      message: err.toString(),
    });
  }
};

module.exports = {
  submitComplaint,
  getComplaintsByStudent,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaintById,
  getComplaintsByCategory,
  getComplaintDetails,
};
