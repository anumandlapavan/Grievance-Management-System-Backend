const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student"],
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
  },
  Branch: {
    type: String,
    required: true,
  },
  // token: {
  //   type: String,
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
