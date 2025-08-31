import express from 'express';
import UserController from './user.controller';

const router = express.Router();

// Create a new user
router.post('/create', UserController.createUser);

export const UserRoute = router;
