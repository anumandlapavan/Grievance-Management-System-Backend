const Category = require('../models/category');


const createCategory = async (req, res) => {
    try {
        const { categoryName, description ,incharge } = req.body;
        const newCategory = new Category({ categoryName, description ,incharge});
        await newCategory.save();
        res.status(201).json({
            success: true,
            message: 'Category created successfully', 
            category: newCategory 
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
};


const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({ 
            success: true,
            category 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};


const updateCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const { name, description } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name, description }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            category: updatedCategory
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const deleteCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
            category: deletedCategory 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};
