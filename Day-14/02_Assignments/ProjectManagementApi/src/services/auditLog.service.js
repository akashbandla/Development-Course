import mongoose from "mongoose";
import AuditLogs from "../models/auditLog.model.js";


class AuditLogService {

    async createAuditLog({
        action,
        entity,
        entityId = null,
        performedBy = null,
        changes = null,
        details = null,
        auditContext = {}
    }) {
        const auditLog = await AuditLogs.create({
            action,
            entity,
            entityId,
            performedBy,
            changes,
            details,
            request: {
                ipAddress: auditContext.ipAddress ?? null,
                userAgent: auditContext.userAgent ?? null,
                method: auditContext.method ?? null,
                path: auditContext.path ?? null
            }
        });

        return auditLog;
    }


    async getAuditLogs(queryParams) {
        try {
            const {
                action,
                entity,
                performedBy,
                entityId,
                startDate,
                endDate,
                page = 1,
                limit = 20
            } = queryParams;


            const filter = {};


            if (action) {
                filter.action = action;
            }


            if (entity) {
                filter.entity = entity;
            }


            if (performedBy) {
                if (!mongoose.isValidObjectId(performedBy)) {
                    throw new Error("Invalid performedBy mongoose Id");
                }

                filter.performedBy = performedBy;
            }


            if (entityId) {
                if (!mongoose.isValidObjectId(entityId)) {
                    throw new Error("Invalid entityId mongoose Id");
                }

                filter.entityId = entityId;
            }


            if (startDate || endDate) {
                filter.createdAt = {};

                if (startDate) {
                    filter.createdAt.$gte = new Date(startDate);
                }

                if (endDate) {
                    filter.createdAt.$lte = new Date(endDate);
                }
            }


            const pageNumber = Math.max(Number(page), 1);
            const limitNumber = Math.min(
                Math.max(Number(limit), 1),
                100
            );

            const skip = (pageNumber - 1) * limitNumber;


            const [auditLogs, totalRecords] = await Promise.all([
                AuditLogs.find(filter)
                    .populate("performedBy", "name userId email role")
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limitNumber),

                AuditLogs.countDocuments(filter)
            ]);


            return {
                auditLogs,
                pagination: {
                    currentPage: pageNumber,
                    limit: limitNumber,
                    totalRecords,
                    totalPages: Math.ceil(
                        totalRecords / limitNumber
                    )
                }
            };

        } catch (err) {
            throw err;
        }
    }


    async getAuditLogById(auditLogId) {
        try {
            if (!mongoose.isValidObjectId(auditLogId)) {
                throw new Error("Invalid audit log mongoose Id");
            }


            const auditLog = await AuditLogs.findById(auditLogId)
                .populate(
                    "performedBy",
                    "name userId email role"
                );


            if (!auditLog) {
                throw new Error("Audit log not found");
            }


            return auditLog;

        } catch (err) {
            throw err;
        }
    }


    async getAuditLogsByUser(userId, queryParams) {
        try {
            if (!mongoose.isValidObjectId(userId)) {
                throw new Error("Invalid user mongoose Id");
            }


            return await this.getAuditLogs({
                ...queryParams,
                performedBy: userId
            });

        } catch (err) {
            throw err;
        }
    }


    async getAuditLogsByEntity(entity, entityId, queryParams) {
        try {
            if (!mongoose.isValidObjectId(entityId)) {
                throw new Error("Invalid entity mongoose Id");
            }


            const allowedEntities = [
                "USER",
                "PROJECT",
                "TASK"
            ];


            const normalizedEntity = entity.toUpperCase();


            if (!allowedEntities.includes(normalizedEntity)) {
                throw new Error("Invalid entity type");
            }


            return await this.getAuditLogs({
                ...queryParams,
                entity: normalizedEntity,
                entityId: entityId
            });

        } catch (err) {
            throw err;
        }
    }
}


export default new AuditLogService();