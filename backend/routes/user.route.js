import express from 'express';
import {registerUser, loginUser} from '../controller/user.contoller.js';
import { validateSignup } from '../middleware/validate.middle.js';

const router = express.Router();

router.post('/login', loginUser);

router.post('/register', validateSignup, registerUser);

export default router;