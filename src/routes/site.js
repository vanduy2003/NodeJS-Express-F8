import express from 'express';
const router = express.Router();
import * as siteController from '../app/controllers/SiteController.js';

router.get('/search', siteController.SearchController);
router.get('/', siteController.HomeController);

export default router;
