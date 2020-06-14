import patientsData from '../../data/patients';

import { Patient, SafePatient, Entry } from '../types';

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<SafePatient> => {
  const safePatients: Array<SafePatient> = patients.map(patient => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, entries, ...safePatient } = patient;
    return safePatient;
  });
  return safePatients;
};

const getPatientById = (id: string): Patient => {
  const found = patients.find(patient => patient.id === id);
  if (!found) throw new Error(`Given ID doesn't exist in the database ${id}`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { ssn, ...safePatient } = found;
  return found;
};

const addPatient = (patient: Patient): SafePatient => {
  patients.push(patient);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, entries, ...safePatient } = patient;
  return safePatient;
};

const addEntry = (id: string, entry: Entry): Entry => {
  const found = getPatientById(id);
  found.entries = [...found.entries, entry];

  return entry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry,
};
