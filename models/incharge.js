const mongoose = require('mongoose');

const categoryInchargeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { type: String, 
        required: true 
    },
    token:{
        type:String
    },
    assignedCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }]
});

module.exports = mongoose.model('CategoryIncharge', categoryInchargeSchema);
