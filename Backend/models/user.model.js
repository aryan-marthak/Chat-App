import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        // Not required to maintain backward compatibility
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
    confirmPassword: {
        type: String,
    },
}, { timestamps: true }); // createdAt & updatedAt

// Add a virtual getter for displayName that returns either fullname or name
userSchema.virtual('displayName').get(function() {
    return this.fullname || this.name;
});

// Ensure virtuals are included when converting to JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = mongoose.model("User", userSchema);
export default User;