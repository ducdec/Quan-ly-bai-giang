import express from 'express';
import CourseController from '../controllers/CourseController.js';

const router = express.Router();

router.get('/store', CourseController.store);
router.get('/get', CourseController.getCourse);
router.get('/', CourseController.show);

export default router;
