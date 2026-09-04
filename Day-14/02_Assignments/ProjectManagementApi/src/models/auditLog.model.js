import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        action: {
            type: String,
            required: true,
            trim: true
        },

        entity: {
            type: String,
            required: true,
            trim: true
        },

        entityId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            default: null
        },

        changes: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        details: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        request: {
            ipAddress: {
                type: String,
                default: null
            },

            userAgent: {
                type: String,
                default: null
            },

            method: {
                type: String,
                default: null
            },

            path: {
                type: String,
                default: null
            }
        }
    },
    {
        timestamps: true
    }
);

// Common audit-log queries
auditLogSchema.index({ performedBy: 1, createdAt: -1 });
auditLogSchema.index({ entity: 1, entityId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ createdAt: -1 });

const AuditLogs = mongoose.model("AuditLogs", auditLogSchema);

export default AuditLogs;