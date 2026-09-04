import { registerUser, login, refreshAccessToken } from "../controllers/auth.controllers.js";
import express from 'express';

const router = express.Router();

router.post('/register', registerUser);
router.get('/login', login)
router.get('/refresh', refreshAccessToken)

export default router;