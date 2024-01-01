import express from 'express';
import InstructorController from '../controllers/InstructorController.js';

const router = express.Router();

router.post('/create', InstructorController.create); //create

export default router;
