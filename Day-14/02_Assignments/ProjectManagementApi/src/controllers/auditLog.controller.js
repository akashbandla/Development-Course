import auditLogService from "../services/auditLog.service.js";


async function getAuditLogs(req, res) {
    try {
        const auditLogs = await auditLogService.getAuditLogs(
            req.query
        );

        res.status(200).json(auditLogs);

    } catch (err) {
        res.status(500).json({
            message: "Failed to retrieve audit logs",
            error: err.message
        });
    }
}


async function getAuditLogById(req, res) {
    try {
        const auditLogId = req.params.id;

        const auditLog = await auditLogService.getAuditLogById(
            auditLogId
        );

        res.status(200).json(auditLog);

    } catch (err) {
        res.status(500).json({
            message: "Failed to retrieve audit log",
            error: err.message
        });
    }
}


async function getAuditLogsByUser(req, res) {
    try {
        const userId = req.params.userId;

        const auditLogs = await auditLogService.getAuditLogsByUser(
            userId,
            req.query
        );

        res.status(200).json(auditLogs);

    } catch (err) {
        res.status(500).json({
            message: "Failed to retrieve user audit logs",
            error: err.message
        });
    }
}


async function getAuditLogsByEntity(req, res) {
    try {
        const { entity, entityId } = req.params;

        const auditLogs = await auditLogService.getAuditLogsByEntity(
            entity,
            entityId,
            req.query
        );

        res.status(200).json(auditLogs);

    } catch (err) {
        res.status(500).json({
            message: "Failed to retrieve entity audit logs",
            error: err.message
        });
    }
}


export {
    getAuditLogs,
    getAuditLogById,
    getAuditLogsByUser,
    getAuditLogsByEntity
};