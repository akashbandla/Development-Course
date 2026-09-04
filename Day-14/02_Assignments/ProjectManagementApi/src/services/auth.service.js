import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Users from "../models/user.model.js";
import { generateAcessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.utils.js";

class AuthService{
    async registerUser(user){
        try{
            const hashedPassword = await bcrypt.hash(user.password, 12);
            user.password = hashedPassword;
            const registeredUser = await Users.create(user);
            return  {
                    _id: registeredUser._id,
                    name: registeredUser.name,
                    userId: registeredUser.userId,
                    email: registeredUser.email,
                    role: registeredUser.role,
                    experience: registeredUser.experience,
                    createdAt: registeredUser.createdAt,
                    updatedAt: registeredUser.updatedAt
                };
        }catch(err){
            throw err
        }
    }

    async login(email, password){
        try{
            const userDoc = await Users.findOne({
                email:email
            }).select("+password");

            // Convert the complex Mongoose document to a plain JS object
            const user = userDoc.toObject();
            console.log(user);

            if(!user){
                throw new Error('Invalid Credentials');
            }
            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid){
                throw new Error("Invalid Credentials");
            }

            const accessToken = generateAcessToken(user);
            const refreshToken = generateRefreshToken(user);

            return {
                user:{
                    _id : user._id,
                    name: user.name,
                    userId: user.userId,
                    email: user.email,
                    role: user.role,
                    experience: user.experience
                },
                accessToken,
                refreshToken
            }

        }catch(err){
            throw err
        }
    }

    async refreshAccessToken(refreshToken){
        try{
            if(!refreshToken){
                throw new Error("Refresh Token is required");
            }

            const decoded = verifyRefreshToken(refreshToken);

            const newAccessToken = generateAcessToken({
                sub: decoded.sub,
                name: decoded.name,
                userId: decoded.userId,
                role: decoded.role,
                experience: decoded.experience
            })

            return newAccessToken;
        }catch(err){
            throw err
        } 
    }
}

export default AuthService;