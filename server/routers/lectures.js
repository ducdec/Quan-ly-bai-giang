import express from 'express';
import LectureController from '../controllers/LectureController.js';

const router = express.Router();

router.post('/:slug/create', LectureController.create); //create
router.get('/:slug/create', LectureController.courseSlug);

export default router;
