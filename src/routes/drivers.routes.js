import {Router} from 'express';
import {getDrivers, createDrivers, updateDrivers, deleteDrivers, getDriver, getDriverName, getHeightAndWeight, getSkills, getAgeAndWins, getPointAndPodios, getConstructorStandings, getTotalConstructorStandings, getTotalDriverStandings} from '../controllers/drivers.controller.js';

const router = Router();
//router.get('/drivers', getPointAndPodios);
//router.get('/drivers', getTotalConstructorStandings);
router.get('/drivers', getTotalDriverStandings);
//router.get('/drivers/:constructorId', getConstructorStandings);
//router.get('/drivers', getAgeAndWins);
//router.get('/drivers', getDrivers);

//router.get('/drivers/:id', getHeightAndWeight);
//router.get('/drivers/:name', getSkills);

router.post('/drivers', createDrivers);

 
router.put('/drivers', updateDrivers);

router.delete('/drivers',deleteDrivers );

export default router;