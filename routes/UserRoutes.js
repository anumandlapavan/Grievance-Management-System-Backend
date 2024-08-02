const express = require("express");
const router = express.Router();

const {
  getUserById,
  updateUserById,
  deleteUserById,
  getUserType,
  getUserData,
} = require("../controllers/UserController");

router.get("/getuserType", getUserType);

router.get("/getuserData", getUserData);

router.get("/getuserbyID/:userId", getUserById);

router.put("/updateuserbyID/:userId", updateUserById);

router.delete("/deleteuserbyID/:userId", deleteUserById);

module.exports = router;
