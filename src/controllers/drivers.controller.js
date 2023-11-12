
import {pool} from '../database/bdSkills.js';  
import { calculateIMC, calculateTotal, calculateAveragePoints, calculateAveragePosition, calculateAverageWins } from '../models/driver.model.js';
import { sampleCorrelation } from 'simple-statistics';


export const getDrivers = async (req, res) => {
   const [rows] = await pool.query('SELECT * FROM skills')
res.json(rows)};

export const getDriverName = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM skills WHERE Name = ?',[req.params.name] )
    console.log(rows)
    res.json(rows[0])
};
export const getDriver = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM skills WHERE id = ?',[req.params.id] )
    console.log(rows)
    res.json(rows[0])
};

export const createDrivers = async (req, res) => {
    const {id,Name,Age,Height, Weight,IMC, polePosition,NumRace,Points, Podios,Wins,PassageThrougCurves,Braking,Reaction, Control,Touch,Adaptability,Overtaking, Defending, Precision} = req.body;
    const [rows] = await pool.query('INSERT INTO skills(id,Name,Age,Height, Weight,IMC, polePosition,NumRace,Points, Podios,Wins,PassageThrougCurves,Braking,Reaction, Control,Touch,Adaptability,Overtaking, Defending, Precision) VALUES(?, ?)', [id,Name,Age,Height, Weight,IMC, polePosition,NumRace,Points, Podios,Wins,PassageThrougCurves,Braking,Reaction, Control,Touch,Adaptability,Overtaking, Defending, Precision]);
    res.send({  
        id: rows.insertId,
        name,
        age,
        height,
        weight,
        IMC,
        polePosition,
        numRace,
        points,
        podios,
        wins,
        passageThrougCurves,
        braking,
        reaction,
        control,
        touch,
        adaptability,
        overtaking,
        defending,
        accuracy
    })
    console.log(req.body);
    res.send('Create Drivers')};

export const updateDrivers =  (req, res) => {
    
    res.send('Update Drivers')} ;

export const deleteDrivers = (req, res) => res.send('delete Drivers');

export const getSkills = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT PassageThrougCurves,Braking,Reaction, Control,Touch,Adaptability,Overtaking, Defending, accuracy FROM skills WHERE name= ?',[req.params.name] )
        const getDriverData = rows[0];
        const total = calculateTotal(getDriverData.PassageThrougCurves,getDriverData.Braking,getDriverData.Reaction,getDriverData.Control,getDriverData.Touch,getDriverData.Adaptability,getDriverData.Overtaking,getDriverData.Defending,getDriverData.accuracy);
        const [updatedRows] = await pool.query('UPDATE skills SET Total = ? WHERE name = ?', [total, req.params.name]);
        console.log('Updated data:', updatedRows[0]);
        res.json({
            id: req.params.id,
            Name: getDriverData.Name,
            PassageThrougCurves: getDriverData.PassageThrougCurves,
            Braking: getDriverData.Braking,
            Reaction: getDriverData.Reaction,
            Control: getDriverData.Control,
            Touch: getDriverData.Touch,
            Adaptability: getDriverData.Adaptability,
            Overtaking: getDriverData.Overtaking,
            Defending: getDriverData.Defending,
            accuracy: getDriverData.accuracy,
            Total: total
        });
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
};

export const getHeightAndWeight = async (req, res) => {
    try {
        const[rows] = await pool.query('SELECT Height, Weight FROM skills WHERE id = ?',[req.params.id] )
        const driverData = rows[0];
        
        const IMC = calculateIMC(driverData.Weight, driverData.Height);
        const [updatedRows] = await pool.query('UPDATE skills SET IMC = ? WHERE id = ?', [IMC, req.params.id]);
        console.log('Updated data:', updatedRows[0]);
        res.json({
            id: req.params.id,
            Name: driverData.Name,
            Height: driverData.Height,
            Weight: driverData.Weight,
            IMC: IMC
        });
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
};

export const getAgeAndWins = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT Age, Wins FROM correlation')
         // Extract arrays for Age and Wins
         const ages = rows.map(row => row.Age);
         const wins = rows.map(row => row.Wins);
         // Calculate the correlation
         const correlation = sampleCorrelation(ages, wins);
         // Respond with the data and correlation
         res.json({
            data: rows,
            correlation: correlation
         });

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
};

export const getPointAndPodios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT Points, Podiums FROM skills')
         // Extract arrays for Age and Wins
         const points = rows.map(row => row.Points);
         const podiums= rows.map(row => row.Podiums);
         // Calculate the correlation
         const correlation = sampleCorrelation(points,podiums);
         // Respond with the data and correlation
         res.json({
            data: rows,
            correlation: correlation
         });

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
};

export const getConstructorStandings = async (req, res) => {
        try {
            const [rows] = await pool.query(`
            SELECT constructorstandings.raceId, 
                   constructorstandings.constructorId,
                   constructorstandings.Points,
                   constructorstandings.Position,
                   constructorstandings.Wins,
                   constructors1.name
            FROM constructorstandings
            JOIN constructors1 ON constructorstandings.constructorId = constructors1.constructorId
            WHERE constructorstandings.constructorId = ?
        `, [req.params.constructorId]);
        
        const points = rows.map(row => row.Points);
        const position= rows.map(row => row.Position);
        const wins= rows.map(row => row.Wins);
        // Calculate the correlation
        const averagePoints = calculateAveragePoints(points);
        const averagePosition = calculateAveragePosition(position);
        const averageWins = calculateAverageWins(wins);
        res.json({
            data: rows,  
            averagePoints: averagePoints,
            averagePosition: averagePosition,
            averageWins: averageWins
         });
       
        } catch (error) {
            console.log(error)
            res.status(500).send('Internal Server Error');
        }
};
//  que constructor tiene mas posibilidad de ganar la carrera 
export const getTotalConstructorStandings = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT constructorstandings.constructorId,
                   SUM(constructorstandings.Wins) AS totalWins,
                   COUNT(*) AS totalRaces,
                   constructors1.name
            FROM constructorstandings
            JOIN constructors1 ON constructorstandings.constructorId = constructors1.constructorId
            GROUP BY constructorstandings.constructorId, constructors1.name
        `);

        // Calcular la tasa de victorias para cada constructor
        const constructorStats = rows.map(row => ({
            constructorId: row.constructorId,
            constructorName: row.name,
            totalWins: row.totalWins,
            totalCircuits: row.totalRaces,
            winRate: row.totalRaces > 0 ? row.totalWins / row.totalRaces : 0,
        }));

        // Identificar al constructor con la mejor tasa de victorias
        const constructorWithHighestWinRate = constructorStats.reduce((max, current) => (current.winRate > max.winRate ? current : max), constructorStats[0]);

        res.json({
            constructorWithHighestWinRate,
            constructorStats,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

export const getTotalDriverStandings = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT driverstandings.driverId,
                   SUM(driverstandings.Wins) AS totalWins,
                   COUNT(*) AS totalRaces,
                   drivers.driverName
            FROM driverstandings
            JOIN drivers ON driverstandings.driverId = drivers.driverId
            GROUP BY driverstandings.driverId, drivers.driverName
        `);

        // Calcular la tasa de victorias para cada constructor
        const driverStats = rows.map(row => ({
            driverName: row.driverName,
            driverId: row.driverId,
            constructorName: row.name,
            totalWins: row.totalWins,
            totalRaces: row.totalRaces,
            winRate: row.totalRaces > 0 ? row.totalWins / row.totalRaces : 0,
        }));

        // Identificar al constructor con la mejor tasa de victorias
        const driverWithHighestWinRate = driverStats.reduce((max, current) => (current.winRate > max.winRate ? current : max), driverStats[0]);

        res.json({
            driverWithHighestWinRate,
            driverStats,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
  
};