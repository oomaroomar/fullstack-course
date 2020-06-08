import patientsData from '../../data/patients';

import { Patient, SafePatient } from '../types';

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

export default {
  getPatients,
  getPatientById,
  addPatient,
};
