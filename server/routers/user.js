import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/:id/edit', UserController.showUserID);
router.get('/stored', UserController.showUser);
router.get('/getToken', UserController.getUser);

router.put('/:id', UserController.update);

export default router;
