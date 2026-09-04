export function getAuditContext(req) {
    return {
        performedBy: req.user?.sub?? null,
        ipAddress: req.ip ?? null,
        userAgent: req.get("user-agent") ?? null,
        method: req.method ?? null,
        path: req.originalUrl ?? null
    };
}