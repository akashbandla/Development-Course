import mongoose from "mongoose";
import bcrypt from "bcrypt";

import Users from "../models/user.model.js";
import auditLogService from "./auditLog.service.js";
import { activeFilter } from "../utils/dbFilter.utils.js";

class UserService{

    async getUsers(){
        try{
            const users = await Users.find(activeFilter);
            return users;
        }catch(err){
            throw err
        }
    }


    async getUserById(userId){
        try{
            if(!mongoose.isValidObjectId(userId)){
                throw new Error("Invalid mongoose Id");
            }

            const user = await Users.findOne({
                _id: userId, 
                ...activeFilter
            });

            if(!user){
                throw new Error("User Not found");
            }

            return user;
        }catch(err){
            throw err
        }
    }


    async createUser(user, auditContext){
        try{
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 12);
            }

            const createdUser = await Users.create(user);


            await auditLogService.createAuditLog({
                action: "USER_CREATED",
                entity: "USER",
                entityId: createdUser._id,
                performedBy: auditContext.performedBy,

                details: {
                    userId: createdUser.userId,
                    name: createdUser.name,
                    email: createdUser.email,
                    role: createdUser.role
                },

                auditContext
            });


            return createdUser;
        }catch(err){
            throw err
        }
    }


    async updateUser(userId, payload, auditContext){
        try{
            if(!mongoose.isValidObjectId(userId)){
                throw new Error("Invalid mongoose Id");
            }

            // Get existing user before update
            const existingUser = await Users.findOne({
                _id: userId,
                ...activeFilter
            });

            if(!existingUser){
                throw new Error("User not found to update");
            }

            const changes = {};

            if(payload.name !== undefined &&
                existingUser.name !== payload.name){
                changes.name = {
                    from: existingUser.name,
                    to: payload.name
                };
            }

            if(payload.userId !== undefined &&
                existingUser.userId !== payload.userId){
                changes.userId = {
                    from: existingUser.userId,
                    to: payload.userId
                };
            }

            if(payload.email !== undefined &&
                existingUser.email !== payload.email){
                changes.email = {
                    from: existingUser.email,
                    to: payload.email
                };
            }

            if(payload.role !== undefined &&
                existingUser.role !== payload.role){
                changes.role = {
                    from: existingUser.role,
                    to: payload.role
                };
            }

            if(payload.experience !== undefined &&
                existingUser.experience !== payload.experience){
                changes.experience = {
                    from: existingUser.experience,
                    to: payload.experience
                };
            }

            const updatedUser = await Users.findOneAndUpdate(
                {
                    _id: userId,
                    ...activeFilter
                },
                payload, 
                {
                    new:true, 
                    runValidators:true
                }
            );

            if(!updatedUser){
                throw new Error("User not found to update");
            }

            await auditLogService.createAuditLog({
                action: "USER_UPDATED",
                entity: "USER",
                entityId: updatedUser._id,
                performedBy: auditContext.performedBy,

                changes: changes,

                details: {
                    userId: updatedUser.userId
                },

                auditContext
            });

            return updatedUser;
        }catch(err){
            throw err;
        }
    }

    async deleteUser(userId, deletedBy, auditContext){
        try{
            if(!mongoose.isValidObjectId(userId)){
                throw new Error("Invalid mongoose Id");
            }

            
            const deletedUser = await Users.findOneAndUpdate({
                    _id: userId, 
                    ...activeFilter
                },
                {
                    $set: {
                        isDeleted: true,
                        deletedBy: deletedBy
                    }
                }, 
                {
                    new:true, 
                    runValidators:true
                }
            );

            if(!deletedUser){
                throw new Error("User not found to delete");
            }


            await auditLogService.createAuditLog({
                action: "USER_DELETED",
                entity: "USER",
                entityId: deletedUser._id,
                performedBy: auditContext.performedBy,

                details: {
                    userId: deletedUser.userId,
                    name: deletedUser.name,
                    email: deletedUser.email,
                    role: deletedUser.role
                },

                auditContext
            });


            return deletedUser;
        }catch(err){
            throw err;
        }
    }
}



export default UserService;