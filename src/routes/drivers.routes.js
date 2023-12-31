import {Router} from 'express';
import {getDrivers, createDrivers,getRankingFatalAccident,getAllHeightAndWeight,getRankingFinallyFirsts,getRankingFinally, updateDrivers, deleteDrivers, getDriver, getDriverName, getHeightAndWeight, getSkills, getAgeAndWins, getPointAndPodios, getConstructorStandings, getTotalConstructorStandings, getTotalDriverStandings} from '../controllers/drivers.controller.js';

const router = Router();
router.get('/rankingfirst', getRankingFinallyFirsts)
router.get('/rankings', getRankingFinally)
router.get('/rankingsfaltalaccident',getRankingFatalAccident)
router.get('/driverstandings', getTotalDriverStandings); //LISTO
router.get('/constructorstandings', getTotalConstructorStandings); //listo
router.get('/drivers/pointandpodios', getPointAndPodios);//LISTO
router.get('/drivers', getDrivers);  
router.get('/handleCompareClick/:id', getSkills); // listo
router.get('/constructoraverage', getConstructorStandings);
router.get('/drivers', getDrivers);  
router.get('/driversimc', getAllHeightAndWeight); //listo
router.get('/drivers/driver/:id', getDriver);
router.get('/drivers/drivername/:name', getDriverName);
router.get('/drivers/heightandweight/:id', getHeightAndWeight); 
router.post('/drivers/create', createDrivers);
router.patch('/drivers/update/:id', updateDrivers);  //patch es para actualizar solo un campo
router.delete('/drivers/delete',deleteDrivers );  
router.get('/drivers/correlation/:id', getAgeAndWins);  //LISTO

export default router;
