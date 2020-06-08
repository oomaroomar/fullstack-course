import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import { bmiCalc } from './bmiCalc';
import { calculateExercises } from './exerciseCalc';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full-Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  console.log('height: ', height);
  console.log('weight: ', weight);
  if (isNaN(height) || isNaN(weight)) {
    res
      .status(400)
      .send(
        `Faulty params height: ${req.query.height}, weight: ${req.query.weight}`
      );
  }
  const bmi = bmiCalc(height, weight);
  res.send({
    height,
    weight,
    ...bmi,
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  if (daily_exercises === undefined || target === undefined)
    res.status(400).send('Missing params');
  isNaN(Number(target)) &&
    res.status(400).send(`Faulty params ${JSON.stringify(req.body)}`);
  daily_exercises.forEach(
    (day: number) =>
      isNaN(Number(day)) &&
      res.status(400).send(`Faulty params ${JSON.stringify(req.body)}`)
  );
  const results = calculateExercises(target, daily_exercises);
  res.send(results);
});

const server = createServer(app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
