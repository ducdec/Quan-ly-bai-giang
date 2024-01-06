import express from 'express';
import InsCourseController from '../controllers/InsCourseController.js';

const router = express.Router();

router.post('/store', InsCourseController.storeIns); //create

export default router;
