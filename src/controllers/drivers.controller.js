import {pool} from '../database/bdSkills.js';  
import { calculateIMC, calculateTotal} from '../models/driver.model.js';


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

