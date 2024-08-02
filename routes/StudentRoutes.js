const express = require('express');
const router = express.Router();
const {getStudentById,updateStudentById,deleteStudentById,getStudentComplaints, getStudentDetails} = require('../controllers/StudentController');

// Route to retrieve student details by ID
router.get('/getStudentById/:studentId',getStudentById);

// Route to update student details by ID
router.put('/updateStudentById/:studentId',updateStudentById);

// Route to delete student by ID
router.delete('/deleteStudentById',deleteStudentById);

// Route to retrieve complaints submitted by a specific student
router.get('/getStudentComplaints',getStudentComplaints);


router.get('/getStudentDetails',getStudentDetails)

module.exports = router;
