import {Router} from 'express';
import {getDrivers, createDrivers, updateDrivers, deleteDrivers, getDriver, getDriverName, getHeightAndWeight, getSkills, getAgeAndWins, getPointAndPodios, getConstructorStandings, getTotalConstructorStandings, getTotalDriverStandings} from '../controllers/drivers.controller.js';

const router = Router();
router.get('/drivers/:id', getHeightAndWeight);
router.get('/drivers/:name', getSkills);

export default router;