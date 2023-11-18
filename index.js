import express from 'express';
import driversRoutes from './src/routes/drivers.routes.js';

const app = express();


app.use(express.json());
app.use("/api",driversRoutes);

app.use((req, res, next) => res.status(404).json({error: 'Endpoint not found'}))

app.listen(5000);