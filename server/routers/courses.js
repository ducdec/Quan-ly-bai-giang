import express from 'express';
import CourseController from './controllers/CourseController';


const router = express.Router();

router.get('/create', CourseController.create)
router.get('/:slug', CourseController.show)

export default router;
