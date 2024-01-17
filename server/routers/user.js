import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/:id/edit', UserController.showUserID); //sua
router.put('/:id', UserController.update);
router.delete('/:id/delete', UserController.forceDestroy); //xoa that

router.get('/getToken', UserController.getUser);
router.get('/stored', UserController.showUser);

export default router;
