import express from 'express';
const router = express.Router();
import * as News from '../app/controllers/NewController.js';

router.get('/:slug', News.SlugController);
router.get('/', News.NewController);

export default router;
