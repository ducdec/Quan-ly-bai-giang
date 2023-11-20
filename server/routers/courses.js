import express from 'express';
import CourseController from '../controllers/CourseController.js';

const router = express.Router();

router.get('/test', CourseController.test);
router.get('/:slug', CourseController.show);

export default router;
