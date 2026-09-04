import express from 'express';

import { 
    registerUser, 
    login, 
    refreshAccessToken,
    forgotPassword,
    resetPassword 
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;