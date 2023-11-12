import {Router} from 'express';
import {getDrivers, createDrivers, updateDrivers, deleteDrivers, getDriver, getDriverName, getHeightAndWeight, getSkills} from '../controllers/drivers.controller.js';

const router = Router();

router.get('/drivers', getDrivers);

//router.get('/drivers/:id', getHeightAndWeight);
router.get('/drivers/:name', getSkills);

router.post('/drivers', createDrivers);

 
router.put('/drivers', updateDrivers);

router.delete('/drivers',deleteDrivers );

export default router;