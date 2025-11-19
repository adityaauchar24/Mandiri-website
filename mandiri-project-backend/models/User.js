const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minLength: [2, 'Full name must be at least 2 characters'],
        maxLength: [100, 'Full name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
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
        maxLength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'read', 'replied', 'archived'],
        default: 'pending'
    },
    source: {
        type: String,
        default: 'website'
    }
}, {
    timestamps: true
});

// Create index for better performance
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Add method to get public profile (FIXES THE ERROR IN ROUTES)
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        fullName: this.fullName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        companyName: this.companyName,
        message: this.message,
        status: this.status,
        source: this.source,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

module.exports = mongoose.model('User', userSchema);