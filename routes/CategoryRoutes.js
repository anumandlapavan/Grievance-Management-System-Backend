const express = require('express');
const router = express.Router();
const {createCategory,getCategories,getCategoryById,updateCategoryById,deleteCategoryById} = require('../controllers/CategoryController');


// Route to create a new complaint category
router.post('/createCategory',createCategory);

// Route to retrieve all complaint categories
router.get('/getCategories', getCategories);

// Route to retrieve a category by ID
router.get('/getCategoryById/:categoryId',getCategoryById);

// Route to update a category by ID
router.put('/updateCategoryById/:categoryId',updateCategoryById);

// Route to delete a category by ID
router.delete('/deleteCategoryById/:categoryId',deleteCategoryById);

module.exports = router;
