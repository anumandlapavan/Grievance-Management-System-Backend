const express = require("express");
const router = express.Router();
const {
  submitComplaint,
  getComplaintsByStudent,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaintById,
  getComplaintsByCategory,
  getComplaintDetails,
} = require("../controllers/ComplaintController");
const {
  auth,
  isStudent,
  isAdmin,
  isCategoryIncharge,
} = require("../middlewares/Authorization");

router.post("/submitComplaint", submitComplaint);
router.get("/getComplaintsByStudent/:userId", getComplaintsByStudent);
router.get("/getComplaintById/:complaintId", getComplaintById);
router.put("/updateComplaintStatus/:complaintId", updateComplaintStatus);
router.delete("/deleteComplaintById/:complaintId", deleteComplaintById);
router.get("/getComplaintsByCategory/:categoryId", getComplaintsByCategory);
router.post("/getComplaintDetails", getComplaintDetails);
module.exports = router;
