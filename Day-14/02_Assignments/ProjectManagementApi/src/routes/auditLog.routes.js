import express from "express";

import {
    getAuditLogs,
    getAuditLogById,
    getAuditLogsByUser,
    getAuditLogsByEntity
} from "../controllers/auditLog.controller.js";


const router = express.Router();


router.get("/", getAuditLogs);

router.get("/:id", getAuditLogById);

router.get("/user/:userId", getAuditLogsByUser);

router.get("/entity/:entity/:entityId", getAuditLogsByEntity);



export default router;