import AuthService from "../services/auth.service.js";
import { getAuditContext } from "../utils/audit.utils.js";

const authService = new AuthService();


async function registerUser(req, res){
    try{
        const {name, userId, email, role, experience, password } = req.body;

        if(!name || !email || !password){
            throw new Error(
                "Name, email and password are required to register a user.."
            );
        }

        const newUser = {
            name,
            userId,
            email,
            role,
            experience,
            password
        };

        const registeredUser = await authService.registerUser(
            newUser,
            getAuditContext(req)
        );

        res.status(201).json({
            message: "User Registered Successfully",
            user: registeredUser
        });
    }catch(err){
        res.json(err.message);
    }
}


async function login(req, res){
    try{
        const {email, password } = req.body;

        if(!email || !password){
            throw new Error(
                "Email and password are required to Login a user.."
            );
        }

        const result = await authService.login(
            email,
            password,
            getAuditContext(req)
        );

        res.cookie(
            "refreshToken",
            result.refreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "PRODUCTION",
                sameSite: "lax",
                path: '/api/auth'
            }
        );

        res.status(200).json({
            message: "User Login Successfully",
            user: result.user,
            accessToken: result.accessToken
        });
    }catch(err){
        res.json(err.message);
    }
}


async function refreshAccessToken(req, res){
    try{
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            return res.status(401).json({
                message:"Refresh Token is required.."
            });
        }

        const accessToken = await authService.refreshAccessToken(
            refreshToken
        );

        res.json({
            message: 'Succssefully Refreshed the Acess Token',
            accessToken
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        await authService.forgotPassword(
            email,
            getAuditContext(req)
        );

        res.status(200).json({ message:"If an account exists with this email, a password reset OTP has been sent."});

    } catch (err) {
        res.status(500).json({ message: "Unable to process password reset request"});
    }
}


async function resetPassword(req, res) {
    try {
        const {
            email,
            otp,
            newPassword
        } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({message:"Email, OTP and new password are required"});
        }

        if (newPassword.length < 8) {
            return res.status(400).json({message:"New password must be at least 8 characters"});
        }

        const result = await authService.resetPassword(
            email,
            otp,
            newPassword,
            getAuditContext(req)
        );

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export {
    registerUser,
    login,
    refreshAccessToken,
    forgotPassword,
    resetPassword
};