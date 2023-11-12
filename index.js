import express from 'express';
import driversRoutes from './src/routes/drivers.routes.js';

const app = express();


app.use(express.json());
app.use("/api",driversRoutes);
app.listen(3001);