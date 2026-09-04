import mongoose from "mongoose";
import Projects from "../models/project.model.js";
import Users from "../models/user.model.js";

import { checkIdExists } from "../utils/db.utils.js";
import { getNextSequence } from "../utils/counter.utils.js";
import { activeFilter } from "../utils/dbFilter.utils.js";
import { projectUsersPopulate } from "../utils/populate.utils.js";
import auditLogService from "./auditLog.service.js";


class ProjectService {

    async getProjects() {
        try {
            const projects = await Projects.find({
                ...activeFilter
            }).populate(projectUsersPopulate);

            return projects;
        } catch (err) {
            throw err;
        }
    }


    async getProjectById(projectId) {
        try {
            if (!mongoose.isValidObjectId(projectId)) {
                throw new Error("Invalid mongoose Id");
            }

            const project = await Projects.findOne({
                _id: projectId,
                ...activeFilter
            }).populate(projectUsersPopulate);

            if (!project) {
                throw new Error("Project not found");
            }

            return project;
        } catch (err) {
            throw err;
        }
    }


    async createProject(project, auditContext) {
        try {
            const [
                managerExists,
                ownerExists,
                createdByExists,
                updatedByExists
            ] = await Promise.all([
                checkIdExists(Users, project.managerId),
                checkIdExists(Users, project.ownerId),
                checkIdExists(Users, project.createdBy),
                checkIdExists(Users, project.updatedBy)
            ]);

            if (!managerExists) {
                throw new Error("Manager does not exist");
            }

            if (!ownerExists) {
                throw new Error("Owner does not exist");
            }

            if (!createdByExists) {
                throw new Error("CreatedBy user does not exist");
            }

            if (!updatedByExists) {
                throw new Error("UpdatedBy user does not exist");
            }

            // Generate project ID
            const sequence = await getNextSequence("project");

            project.projectId = String(sequence).padStart(4, "0");

            const createdProject = await Projects.create(project);


            await auditLogService.createAuditLog({
                action: "PROJECT_CREATED",
                entity: "PROJECT",
                entityId: createdProject._id,
                performedBy: auditContext.performedBy,

                details: {
                    projectId: createdProject.projectId,
                    projectName: createdProject.projectName,
                    managerId: createdProject.managerId,
                    ownerId: createdProject.ownerId,
                    createdBy: createdProject.createdBy
                },

                auditContext
            });


            return createdProject.populate(projectUsersPopulate);
        } catch (err) {
            throw err;
        }
    }


    async updateProject(projectId, payload, auditContext) {
        try {
            if (!mongoose.isValidObjectId(projectId)) {
                throw new Error("Invalid mongoose Id");
            }

            // Validate manager if being updated
            if (payload.managerId !== undefined) {

                const managerExists =
                    await checkIdExists(
                        Users,
                        payload.managerId
                    );

                if (!managerExists) {
                    throw new Error(
                        "Manager does not exist"
                    );
                }
            }

            // Validate owner if being updated
            if (payload.ownerId !== undefined) {
                const ownerExists =
                    await checkIdExists(
                        Users,
                        payload.ownerId
                    );

                if (!ownerExists) {
                    throw new Error(
                        "Owner does not exist"
                    );
                }
            }

            // Validate updatedBy user
            if (payload.updatedBy !== undefined) {

                const updatedByExists =
                    await checkIdExists(
                        Users,
                        payload.updatedBy
                    );

                if (!updatedByExists) {
                    throw new Error(
                        "UpdatedBy user does not exist"
                    );
                }
            }

            // Get existing project before update
            const existingProject = await Projects.findOne({
                _id: projectId,
                ...activeFilter
            });

            if (!existingProject) {
                throw new Error(
                    "Project not found or already deleted"
                );
            }

            const changes = {};

            if (payload.projectName !== undefined &&
                existingProject.projectName !== payload.projectName) {
                changes.projectName = {
                    from: existingProject.projectName,
                    to: payload.projectName
                };
            }

            if (payload.managerId !== undefined &&
                String(existingProject.managerId) !== String(payload.managerId)) {
                changes.managerId = {
                    from: existingProject.managerId,
                    to: payload.managerId
                };
            }

            if (payload.ownerId !== undefined &&
                String(existingProject.ownerId) !== String(payload.ownerId)) {
                changes.ownerId = {
                    from: existingProject.ownerId,
                    to: payload.ownerId
                };
            }

            if (payload.updatedBy !== undefined &&
                String(existingProject.updatedBy) !== String(payload.updatedBy)) {
                changes.updatedBy = {
                    from: existingProject.updatedBy,
                    to: payload.updatedBy
                };
            }

            const updatedProject =
                await Projects.findOneAndUpdate(
                    {
                        _id: projectId,
                        ...activeFilter
                    },
                    payload,
                    {
                        new: true,
                        runValidators: true
                    }
                ).populate(projectUsersPopulate);

            if (!updatedProject) {
                throw new Error(
                    "Project not found or already deleted"
                );
            }

            await auditLogService.createAuditLog({
                action: "PROJECT_UPDATED",
                entity: "PROJECT",
                entityId: updatedProject._id,
                performedBy: auditContext.performedBy,

                changes: changes,

                details: {
                    projectId: updatedProject.projectId
                },

                auditContext
            });

            return updatedProject;
        } catch (err) {
            throw err;
        }
    }


    async deleteProject(projectId, deletedBy, auditContext) {
        try {

            if (!mongoose.isValidObjectId(projectId)) {
                throw new Error("Invalid mongoose Id");
            }

            // Verify user performing deletion exists
            const userExists =
                await checkIdExists(
                    Users,
                    deletedBy
                );

            if (!userExists) {
                throw new Error(
                    "Deleting user does not exist"
                );
            }

            const deletedProject =
                await Projects.findOneAndUpdate(
                    {
                        _id: projectId,
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
                ).populate(projectUsersPopulate);


            if (!deletedProject) {
                throw new Error(
                    "Project not found or already deleted"
                );
            }


            await auditLogService.createAuditLog({
                action: "PROJECT_DELETED",
                entity: "PROJECT",
                entityId: deletedProject._id,
                performedBy: auditContext.performedBy,

                details: {
                    projectId: deletedProject.projectId,
                    projectName: deletedProject.projectName,
                    deletedBy: deletedProject.deletedBy
                },

                auditContext
            });


            return deletedProject;
        } catch (err) {
            throw err;
        }
    }
}


export default ProjectService;