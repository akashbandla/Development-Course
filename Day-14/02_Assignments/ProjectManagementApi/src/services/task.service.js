import mongoose from "mongoose";
import Tasks from "../models/task.model.js";
import Projects from "../models/project.model.js";
import Users from "../models/user.model.js";

import { checkIdExists } from "../utils/db.utils.js";
import { getNextSequence } from "../utils/counter.utils.js";
import { activeFilter } from "../utils/dbFilter.utils.js";
import { tasksProjectUserPopulate } from "../utils/populate.utils.js";
import auditLogService from "./auditLog.service.js";


class TaskService {

    async getTasks() {
        try {
            const tasks = await Tasks.find({
                ...activeFilter
            }).populate(tasksProjectUserPopulate);

            return tasks;
        } catch (err) {
            throw err;
        }
    }


    async getTaskById(taskId) {
        try {
            if (!mongoose.isValidObjectId(taskId)) {
                throw new Error("Invalid mongoose Id");
            }

            const task = await Tasks.findOne({
                _id: taskId,
                ...activeFilter
            }).populate(tasksProjectUserPopulate);

            if (!task) {
                throw new Error("Task not found");
            }

            return task;
        } catch (err) {
            throw err;
        }
    }


    async createTask(task, auditContext) {
        try {

            // Check whether project exists
            const projectExists = await checkIdExists(
                Projects,
                task.projectId
            );

            if (!projectExists) {
                throw new Error("Project does not exist");
            }

            // Check whether user exists
            const userExists = await checkIdExists(
                Users,
                task.userId
            );

            if (!userExists) {
                throw new Error("User does not exist");
            }

            // Generate task sequence
            const sequence = await getNextSequence("task");

            task.taskId = String(sequence).padStart(4, "0");

            const createdTask = await Tasks.create(task);


            await auditLogService.createAuditLog({
                action: "TASK_CREATED",
                entity: "TASK",
                entityId: createdTask._id,
                performedBy: auditContext.performedBy,

                details: {
                    taskId: createdTask.taskId,
                    taskName: createdTask.taskName,
                    projectId: createdTask.projectId,
                    userId: createdTask.userId
                },

                auditContext
            });


            return createdTask.populate(tasksProjectUserPopulate);
        } catch (err) {
            throw err;
        }
    }


    async updateTask(taskId, payload, auditContext) {
        try {
            if (!mongoose.isValidObjectId(taskId)) {
                throw new Error("Invalid mongoose Id");
            }

            // If projectId is being changed,
            if (payload.projectId !== undefined) {
                const projectExists = await checkIdExists(
                    Projects,
                    payload.projectId
                );

                if (!projectExists) {
                    throw new Error("Project does not exist");
                }
            }

            // If userId is being changed,
            if (payload.userId !== undefined) {
                const userExists = await checkIdExists(
                    Users,
                    payload.userId
                );

                if (!userExists) {
                    throw new Error("User does not exist");
                }
            }


            // Get existing task before update
            const existingTask = await Tasks.findOne({
                _id: taskId,
                ...activeFilter
            });

            if (!existingTask) {
                throw new Error(
                    "Task not found or task is already deleted"
                );
            }


            const changes = {};

            if (
                payload.taskName !== undefined &&
                existingTask.taskName !== payload.taskName
            ) {
                changes.taskName = {
                    from: existingTask.taskName,
                    to: payload.taskName
                };
            }

            if (
                payload.projectId !== undefined &&
                String(existingTask.projectId) !== String(payload.projectId)
            ) {
                changes.projectId = {
                    from: existingTask.projectId,
                    to: payload.projectId
                };
            }

            if (
                payload.userId !== undefined &&
                String(existingTask.userId) !== String(payload.userId)
            ) {
                changes.userId = {
                    from: existingTask.userId,
                    to: payload.userId
                };
            }


            const updatedTask = await Tasks.findOneAndUpdate(
                {
                    _id: taskId,
                    ...activeFilter
                },
                payload,
                {
                    new: true,
                    runValidators: true
                }
            ).populate(tasksProjectUserPopulate);

            if (!updatedTask) {
                throw new Error(
                    "Task not found or task is already deleted"
                );
            }


            await auditLogService.createAuditLog({
                action: "TASK_UPDATED",
                entity: "TASK",
                entityId: updatedTask._id,
                performedBy: auditContext.performedBy,

                changes: changes,

                details: {
                    taskId: updatedTask.taskId
                },

                auditContext
            });


            return updatedTask;
        } catch (err) {
            throw err;
        }
    }


    async deleteTask(taskId, deletedBy, auditContext) {
        try {
            if (!mongoose.isValidObjectId(taskId)) {
                throw new Error("Invalid mongoose Id");
            }

            // Verify the user performing deletion exists
            const userExists = await checkIdExists(
                Users,
                deletedBy
            );

            if (!userExists) {
                throw new Error("Deleting user does not exist");
            }

            const deletedTask = await Tasks.findOneAndUpdate(
                {
                    _id: taskId,
                    ...activeFilter
                },
                {
                    $set: {
                        isDeleted: true,
                        deletedBy: deletedBy
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            ).populate(tasksProjectUserPopulate);

            if (!deletedTask) {
                throw new Error(
                    "Task not found or task is already deleted"
                );
            }


            await auditLogService.createAuditLog({
                action: "TASK_DELETED",
                entity: "TASK",
                entityId: deletedTask._id,
                performedBy: auditContext.performedBy,

                details: {
                    taskId: deletedTask.taskId,
                    taskName: deletedTask.taskName,
                    deletedBy: deletedTask.deletedBy
                },

                auditContext
            });


            return deletedTask;
        } catch (err) {
            throw err;
        }
    }
}


export default TaskService;