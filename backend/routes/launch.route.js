import express from 'express';
import { isLoggedIn } from '../middleware/authentice.middle.js';
import { addFavorite, removeFavorite } from '../controller/launch.contorller.js';


const router = express.Router();

router.post('/addFavorite', isLoggedIn, addFavorite);
router.delete('/removeFavorite', isLoggedIn, removeFavorite);

export default router;