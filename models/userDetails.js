const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    enum: ["admin", "categoryIncharge", "student"],
    required: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  assignedCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
