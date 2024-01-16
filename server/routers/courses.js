import express from 'express';
import CourseController from '../controllers/CourseController.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = express.Router();
const IsAuthenticated = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    token = token && token.split(' ')[1];
    if (!token) {
      return next('Please login to access the data');
    }

    const verify = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(verify.userId);
    if (user.role == 'Admin') {
      next();
    } else {
      return res.status(403).json('Forbidden');
    }
  } catch (error) {
    return next(error);
  }
};
router.post('/store', IsAuthenticated, CourseController.store); //create
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

router.get('/', CourseController.show);

export default router;
