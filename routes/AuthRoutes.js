const express = require("express");
const router = express.Router();

const {signup,login}=require("../controllers/AuthController");
const {auth}=require('../middlewares/Authorization');
const {resetPasswordToken,resetPassword,} = require("../controllers/ResetPassword");

router.post("/login",login);
router.post("/signup",signup);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword)


module.exports=router;