const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Full name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        minlength: [10, 'Message must be at least 10 characters']
    },
    source: {
        type: String,
        default: 'website'
    },
    status: {
        type: String,
        enum: ['pending', 'read', 'replied', 'archived'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Add method to get public profile (without sensitive info)
userSchema.methods.getPublicProfile = function() {
    const user = this.toObject();
    delete user.__v;
    return user;
};

module.exports = mongoose.model('User', userSchema);