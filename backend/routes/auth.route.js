import express from 'express';
import {registerUser, loginUser, authCheck} from '../controller/auth.contoller.js';
import { validateLogin, validateSignup } from '../middleware/validate.middle.js';
import { isLoggedIn } from '../middleware/authentice.middle.js';

const router = express.Router();

router.post('/login', validateLogin, loginUser);
router.post('/register', validateSignup, registerUser);
router.get('/check', isLoggedIn, authCheck);

export default router;