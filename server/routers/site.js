import express from 'express';
import SiteController from '../controllers/SiteController';

const router = express.Router();

router.get('/home', SiteController.home);
router.get('/', SiteController.home1);

export default router;
