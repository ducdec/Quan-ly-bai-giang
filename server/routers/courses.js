import express from 'express';
import { getCourses } from '../controllers/CourseController.js';

const router = express.Router();

router.get('/', getCourses);

export default router;
