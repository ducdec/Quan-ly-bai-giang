import express from 'express';
import LoginController from '../controllers/LoginController.js';

const router = express.Router();

//login
router.post('/signup', LoginController.signup); //dk
router.post('/signin', LoginController.signin); //dn

router.post('/password', LoginController.forgotPass);
router.post('/password/:token', LoginController.forgotPassToken);
router.get('/', LoginController.showUser);

export default router;
