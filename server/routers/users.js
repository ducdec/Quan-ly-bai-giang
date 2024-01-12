import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/signup', UserController.signup); //dk
router.post('/signin', UserController.signin); //dn

router.post('/password', UserController.forgotPass);
router.post('/password/:token', UserController.forgotPassToken);
router.get('/', UserController.showUser);

export default router;
