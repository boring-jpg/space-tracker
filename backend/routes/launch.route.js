import express from "express";
import mongoose from "mongoose";
import Launch from "../models/launches.model.js";
import {readLaunches, createLaunches, updateLaunches, deleteLaunches} from "../controllers/launch.controller.js"


const router = express.Router();

router.get('/', readLaunches);

router.post('/', createLaunches);

router.patch('/:id', updateLaunches);

router.delete('/:id', deleteLaunches);

export default router;