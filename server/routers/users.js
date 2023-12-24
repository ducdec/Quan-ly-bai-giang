import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/signup', UserController.signup); //dk
router.post('/signin', UserController.signin); //dn
//router.get('/checkpass', UserController.checkPassword); //dn
router.get('/', UserController.showUser);

export default router;
