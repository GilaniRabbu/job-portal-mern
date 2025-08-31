import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

// user login route
router.post('/login', AuthController.loginUser);

export const AuthRoute = router;
