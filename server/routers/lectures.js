import express from 'express';
import LectureController from '../controllers/LectureController.js';

const router = express.Router();

router.post('/:slug/create', LectureController.create); //create

export default router;
