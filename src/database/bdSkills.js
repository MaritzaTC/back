import {createPool} from 'mysql2/promise';
import {
DB_HOST,
DB_PORT,
DB_DATABASE,
DB_USER,
DB_PASSWORD,
} from '../config.js'

export const pool = createPool({
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
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