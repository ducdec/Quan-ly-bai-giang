import express from 'express';
import InstructorController from '../controllers/InstructorController.js';

const router = express.Router();

router.post('/create', InstructorController.create); //create
router.get('/:id/edit', InstructorController.edit);
router.put('/:id', InstructorController.update);
//
router.delete('/:id/delete', InstructorController.forceDestroy); //xoa that
//
router.get('/stored', InstructorController.storedInstructor);

export default router;
