import express from 'express';
import patientsService from '../services/patientsService';
import { toPatient, toEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const foundPatient = patientsService.getPatientById(id);
    res.json(foundPatient);
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).json(err.message);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(err.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params;
    const newEntry = toEntry(req.body);
    const addedEntry = patientsService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(err.message);
  }
});

export default router;
