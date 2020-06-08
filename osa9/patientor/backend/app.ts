import express from 'express';
import cors from 'cors';

import pingPongRouter from './src/routes/ping';
import diagnosesRouter from './src/routes/diagnoses';
import patientsRouter from './src/routes/patients';

const app = express();

// Middleware and libraries
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/ping', pingPongRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

export default app;
