import {Router} from 'express';
import {pool} from '../database/bdSkills.js';
import {retrieveData} from '../controllers/index.controller.js';


const router = Router();
router.get('/retrieveData', retrieveData);
export default router;