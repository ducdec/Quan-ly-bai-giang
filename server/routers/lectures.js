import express from 'express';
import LectureController from '../controllers/LectureController.js';

const router = express.Router();

router.post('/:id/create', LectureController.create); //create
router.get('/:id/create', LectureController.courseSlug);

router.get('/:slug/:id/edit', LectureController.edit);
router.put('/:slug/:id', LectureController.update);

router.delete('/:slug/:id/delete', LectureController.forceDestroy); //xoa that

export default router;
