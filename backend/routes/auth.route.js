import express from 'express';
import {registerUser, loginUser, authCheck, logout} from '../controller/auth.contoller.js';
import { validateLogin, validateSignup } from '../middleware/validate.middle.js';
import { isLoggedIn } from '../middleware/authentice.middle.js';

const router = express.Router();

router.post('/register', validateSignup, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/logout', logout)
router.get('/check', isLoggedIn, authCheck);

export default router;