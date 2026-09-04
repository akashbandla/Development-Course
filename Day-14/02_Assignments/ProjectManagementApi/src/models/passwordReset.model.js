import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },

        otpHash: {
            type: String,
            required: true
        },

        otpExpiresAt: {
            type: Date,
            required: true
        },

        otpAttempts: {
            type: Number,
            default: 0
        },

        used: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Automatically remove expired reset documents
passwordResetSchema.index(
    { otpExpiresAt: 1 },
    { expireAfterSeconds: 0 }
);

passwordResetSchema.index({
    userId: 1,
    createdAt: -1
});

const PasswordResets = mongoose.model(
    "PasswordResets",
    passwordResetSchema
);

export default PasswordResets;