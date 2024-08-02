const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userDetails");
dotenv.config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.body.token ||
                    req.cookies.token ||
                    (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
        console.log("Extracted token:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
           
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: "Something Went Wrong While Validating the Token"
        });
    }
};


exports.isStudent = async (req,res,next)=>{
    try{
        if(req.user.role!="student"){
            return res.status(403).json({
                success: false,
                message:"This is a Protected Route for Students",
            });
        }
        next();
    }
    catch (error){
        return res.status(500).json({
            success:false,
            message:"User Role Can't be Verified"
        });
    }
};

exports.isAdmin = async (req,res,next)=>{
    try{
        if(req.user.role!="admin"){
            return res.status(403).json({
                success: false,
                message:"This is a Protected Route for Admin",
            });
        }
        next();
    }
    catch (error){
        return res.status(500).json({
            success:false,
            message:"User Role Can't be Verified"
        });
    }
};

exports.isCategoryIncharge = async (req,res,next)=>{
    try{
        if(req.user.role!="categoryIncharge"){
            return res.status(403).json({
                success: false,
                message:"This is a Protected Route for CategoryIncharges",
            });
        }
        next();
    }
    catch (error){
        return res.status(500).json({
            success:false,
            message:"User Role Can't be Verified"
        });
    }
};