import bcrypt from "bcrypt";
import crypto from "crypto";

import Users from "../models/user.model.js";
import auditLogService from "./auditLog.service.js";
import PasswordResets from "../models/passwordReset.model.js";
import emailService from "./email.service.js";

import { generateOtp } from "../utils/otp.utils.js";

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

    async forgotPassword(email, auditContext) {
        try {

            const user = await Users.findOne({
                email: email,
                isDeleted: false
            });

            if (!user) {
                await auditLogService.createAuditLog({
                    action: "PASSWORD_RESET_REQUESTED",
                    entity: "USER",
                    performedBy: null,
                    details: {
                        email: email,
                        userFound: false
                    },
                    auditContext
                });

                return;
            }

            await PasswordResets.updateMany(
                {
                    userId: user._id,
                    used: false
                },
                {
                    $set: {
                        used: true
                    }
                }
            );

            const otp = generateOtp();

            const otpHash = await bcrypt.hash(otp, 10);

            const otpExpiresAt = new Date(
                Date.now() + 10 * 60 * 1000
            );

            await PasswordResets.create({
                userId: user._id,
                otpHash: otpHash,
                otpExpiresAt: otpExpiresAt
            });

            await emailService.sendPasswordResetOtp(
                user.email,
                otp
            );

            await auditLogService.createAuditLog({
                action: "PASSWORD_RESET_REQUESTED",
                entity: "USER",
                entityId: user._id,
                performedBy: null,
                details: {
                    email: user.email
                },
                auditContext
            });

        } catch (err) {
            throw err;
        }
    }

    async resetPassword(email, otp, newPassword, auditContext) {
        try {
            const user = await Users.findOne({
                email: email,
                isDeleted: false
            });

            if (!user) {
                throw new Error("Invalid password reset request");
            }

            const resetRequest = await PasswordResets.findOne({
                userId: user._id,
                used: false
            }).sort({
                createdAt: -1
            });

            if (!resetRequest) {
                throw new Error(
                    "Invalid or expired password reset OTP"
                );
            }

            if (resetRequest.otpExpiresAt < new Date()) {

                resetRequest.used = true;

                await resetRequest.save();

                throw new Error(
                    "Password reset OTP has expired"
                );
            }

            
            if (resetRequest.otpAttempts >= 5) {

                resetRequest.used = true;
                await resetRequest.save();

                throw new Error(
                    "Too many invalid OTP attempts"
                );
            }

            
            const isValidOtp = await bcrypt.compare(
                otp,
                resetRequest.otpHash
            );

            if (!isValidOtp) {

                resetRequest.otpAttempts += 1;

                if (resetRequest.otpAttempts >= 5) {
                    resetRequest.used = true;
                }

                await resetRequest.save();

                throw new Error(
                    "Invalid password reset OTP"
                );
            }

            
            const hashedPassword = await bcrypt.hash(
                newPassword,
                12
            );

        
            user.password = hashedPassword;
            await user.save();

        
            resetRequest.used = true;
            await resetRequest.save();

           
            await auditLogService.createAuditLog({
                action: "PASSWORD_RESET_SUCCESS",
                entity: "USER",
                entityId: user._id,
                performedBy: user._id,
                details: {
                    email: user.email
                },
                auditContext
            });

            return {
                message: "Password reset successfully"
            };

        } catch (err) {
            throw err;
        }
    }
}


export default AuthService;