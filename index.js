import express from 'express';
import driversRoutes from './src/routes/drivers.routes.js';
import indexRoutes from './src/routes/index.routes.js';

const app = express();


app.use(express.json());
app.use("/api",indexRoutes);
app.use("/api",driversRoutes);
app.listen(3001);