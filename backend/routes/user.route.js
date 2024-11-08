import express, { application } from "express";
import mongoose from "mongoose";
import { getUsers, makeUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', getUsers);

router.post('/', makeUsers);

export default router