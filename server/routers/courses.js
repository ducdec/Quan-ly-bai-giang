import express from 'express';
import CourseController from '../controllers/CourseController.js';

const router = express.Router();

router.post('/store', CourseController.store);
router.get('/:id/edit', CourseController.edit);
router.put('/:id', CourseController.update);
//
//router.delete('/:id', CourseController.destroy); //xoa gia
router.delete('/:id/delete', CourseController.forceDestroy); //xoa that
//
router.get('/stored', CourseController.storeCourses);
router.get('/get', CourseController.getCourse);
router.get('/', CourseController.show);

export default router;
