import express from 'express';
import CourseController from '../controllers/CourseController.js';

const router = express.Router();

router.post('/store', CourseController.store); //create
router.get('/store', CourseController.storeInstructor);

router.get('/:id/edit', CourseController.edit);
router.put('/:id', CourseController.update);
//
router.patch('/:id/restore', CourseController.restore);
//
router.delete('/:id', CourseController.destroy); //xoa gia
router.delete('/:id/delete', CourseController.forceDestroy); //xoa that
//
router.get('/stored', CourseController.storeCourses);
router.get('/trash', CourseController.trashCourses);
router.get('/:slug', CourseController.courseSlug);

router.get('/get', CourseController.getCourse);
router.get('/searchs', CourseController.searchAll);
router.get('/', CourseController.show);

export default router;
