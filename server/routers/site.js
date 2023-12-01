import express from 'express';
import SiteController from '../controllers/SiteController';

const router = express.Router();
router.get('/', SiteController.home);

module.exports = router;
