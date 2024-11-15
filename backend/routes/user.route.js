import express from 'express';
import {registerUser, loginUser} from '../controller/user.contoller.js';
import { validateLogin, validateSignup } from '../middleware/validate.middle.js';

const router = express.Router();

router.post('/login', validateLogin, loginUser);

router.post('/register', validateSignup, registerUser);

export default router;