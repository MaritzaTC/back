import express from 'express';
import driversRoutes from './src/routes/drivers.routes.js';
import {PORT} from'./src/config.js'
import cors from 'cors';
const app = express();


app.use(cors());
app.use(express.json());
app.use("/api",driversRoutes);

app.use((req, res, next) => res.status(404).json({error: 'Endpoint not found'}))

app.listen(PORT);