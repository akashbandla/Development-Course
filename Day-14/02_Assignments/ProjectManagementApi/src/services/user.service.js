import Users from "../models/user.model.js";
import mongoose from "mongoose";
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

    async createUser(user){
        try{
            const createdUser = await Users.create(user);
            return createdUser;
        }catch(err){
            throw err
        }
    }

    async updateUser(userId, deletedBy){
        try{
            if(!mongoose.isValidObjectId(userId)){
                throw new Error("Invalid mongoose Id");
            }
            const updatedUser = await Users.findOneAndUpdate({
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
            if(!updatedUser){
                throw new Error("User not found to update");
            }
            return updatedUser;
        }catch(err){
            throw err;
        }
    }

    async deleteUser(userId, payload){
        try{
            if(!mongoose.isValidObjectId(userId)){
                throw new Error("Invalid mongoose Id");
            }
            const deletedUser = await Users.findOneAndUpdate(
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
            if(!deletedUser){
                throw new Error("User not found to delete");
            }
            return deletedUser;
        }catch(err){
            throw err;
        }
    }
}



export default UserService;