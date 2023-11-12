import {pool} from '../database/bdSkills.js';  
export const retrieveData = async (req, res) => {
    try {
        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Define your SQL query
        const sql = 'SELECT * FROM skills';

        // Execute the query
        const [rows, fields] = await connection.execute(sql);

        // Release the connection back to the pool
        connection.release();

        // Send the retrieved data as a response
        res.json(rows);
    } catch (error) {
        // Handle errors
        console.error('Error retrieving data from the database:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}   