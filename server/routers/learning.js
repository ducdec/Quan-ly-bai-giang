import express from 'express';
import LearningController from '../controllers/LearningController.js';

const router = express.Router();

router.get('/:slug', LearningController.courseLearning);

export default router;
