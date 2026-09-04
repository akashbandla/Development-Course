import bcrypt from "bcrypt";

import Users from "../models/user.model.js";
import auditLogService from "./auditLog.service.js";

import {
    generateAcessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../utils/jwt.utils.js";


class AuthService {

    async registerUser(user, auditContext){
        try{
            const hashedPassword = await bcrypt.hash(user.password, 12);
            user.password = hashedPassword;

            const registeredUser = await Users.create(user);

            await auditLogService.createAuditLog({
                action: "USER_REGISTERED",
                entity: "USER",
                entityId: registeredUser._id,
                performedBy: registeredUser._id,
                details: {
                    userId: registeredUser.userId,
                    name: registeredUser.name,
                    email: registeredUser.email,
                    role: registeredUser.role
                },
                auditContext
            });

            return {
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
            throw err;
        }
    }


    async login(email, password, auditContext){
        try{
            const userDoc = await Users.findOne({
                email: email,
                isDeleted: false
            }).select("+password");


            if(!userDoc){
                await auditLogService.createAuditLog({
                    action: "LOGIN_FAILED",
                    entity: "USER",
                    performedBy: null,
                    details: {
                        email: email,
                        reason: "User not found"
                    },
                    auditContext
                });

                throw new Error("Invalid Credentials");
            }


            const user = userDoc.toObject();


            const isValid = await bcrypt.compare(
                password,
                user.password
            );


            if(!isValid){
                await auditLogService.createAuditLog({
                    action: "LOGIN_FAILED",
                    entity: "USER",
                    entityId: user._id,
                    performedBy: user._id,
                    details: {
                        email: user.email,
                        reason: "Invalid password"
                    },
                    auditContext
                });

                throw new Error("Invalid Credentials");
            }


            const accessToken = generateAcessToken(user);

            const refreshToken = generateRefreshToken(user);


            await auditLogService.createAuditLog({
                action: "USER_LOGIN",
                entity: "USER",
                entityId: user._id,
                performedBy: user._id,
                details: {
                    userId: user.userId,
                    email: user.email
                },
                auditContext
            });


            return {
                user: {
                    _id: user._id,
                    name: user.name,
                    userId: user.userId,
                    email: user.email,
                    role: user.role,
                    experience: user.experience
                },
                accessToken,
                refreshToken
            };

        }catch(err){
            throw err;
        }
    }


    async refreshAccessToken(refreshToken){
        try{
            if(!refreshToken){
                throw new Error("Refresh Token is required");
            }

            const decoded = verifyRefreshToken(refreshToken);

            console.log(decoded);
            console.log(decoded.sub)
            const newAccessToken = generateAcessToken({
                sub: decoded.sub,
                name: decoded.name,
                userId: decoded.userId,
                role: decoded.role,
                experience: decoded.experience
            });

            return newAccessToken;

        }catch(err){
            throw err;
        }
    }
}


export default AuthService;