import {createPool} from 'mysql2/promise';


export const pool = createPool({
    host: 'localhost',
    database: "formula1",
    user: 'root',
    password: '',
    port: 3306
});

// Validate the connection
(async () => {
    try {
        // Try to get a connection from the pool
        const connection = await pool.getConnection();

        // If the connection was successful, log a success message
        console.log('Connected to the database!');

        // Release the connection back to the pool
        connection.release();
    } catch (error) {
        // If there's an error, log the error message
        console.error('Error connecting to the database:', error.message);
    }
})();