import UserService from "../services/user.service.js";
import AuthService from "../services/auth.service.js";
import { getAuditContext } from "../utils/audit.utils.js";

const userService = new UserService();
const authService = new AuthService();


async function getUsers(req, res){
    try{
        const users = await userService.getUsers();
        res.status(200).json(users);
    }catch(err){
        res.json({message:"Database Error", error:err.message});
    }
}


async function getUserById(req, res){
    try{
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    }catch(err){
        res.json({message:"Database Error", error:err.message});
    }
}


async function createUser(req, res){
    try{
        const {name, userId, email, role, experience, password} = req.body;

        const newUser = {
            name: name,
            userId: userId,
            email: email,
            role: role,
            experience: experience,
            password: password
        };

        const user = await authService.registerUser(
            newUser,
            getAuditContext(req)
        );

        res.status(200).json(user);
    }catch(err){
        res.json({message:"Database Error", error:err.message});
    }
}


async function updateUser(req, res){
    try{
        let userToUpdate = {};
        const userId = req.params.id;

        if(req.body.name !== undefined) userToUpdate.name = req.body.name;
        if(req.body.userId !== undefined) userToUpdate.userId = req.body.userId;
        if(req.body.email !== undefined) userToUpdate.email = req.body.email;
        if(req.body.role !== undefined) userToUpdate.role = req.body.role;
        if(req.body.experience !== undefined) userToUpdate.experience = req.body.experience;

        const updatedUser = await userService.updateUser(
            userId,
            userToUpdate,
            getAuditContext(req)
        );

        res.status(200).json(updatedUser);
    }catch(err){
        res.json({error: err.message});
    }
}


async function deleteUser(req, res){
    try{
        const userId = req.params.id;

        const deletedUser = await userService.deleteUser(
            userId,
            req.user.sub,
            getAuditContext(req)
        );

        res.status(200).json({
            message:"User Deleted Successfully",
            user: deletedUser
        });
    }catch(err){
        res.json({message:"Database Error", error:err.message});
    }
}


export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};