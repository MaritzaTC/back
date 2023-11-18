import {Router} from 'express';
import {getDrivers, createDrivers, updateDrivers, deleteDrivers, getDriver, getDriverName, getHeightAndWeight, getSkills, getAgeAndWins, getPointAndPodios, getConstructorStandings, getTotalConstructorStandings, getTotalDriverStandings} from '../controllers/drivers.controller.js';

const router = Router();
router.get('/drivers/pointandpodios', getPointAndPodios);
router.get('/drivers/constructorstandings', getTotalConstructorStandings);
router.get('/driverstandings', getTotalDriverStandings);
router.get('/drivers/:constructorId', getConstructorStandings);
router.get('/drivers', getDrivers);
router.get('/drivers/driver/:id', getDriver);
router.get('/drivers/drivername/:name', getDriverName);
router.get('/drivers/heightandweight/:id', getHeightAndWeight);
router.get('/drivers/skills/:id', getSkills);
router.post('/drivers/create', createDrivers);
router.patch('/drivers/update/:id', updateDrivers);  //patch es para actualizar solo un campo
router.delete('/drivers/delete',deleteDrivers );
router.get('/drivers/correlation/:id', getAgeAndWins);
export default router;
