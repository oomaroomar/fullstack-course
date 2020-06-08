import { Patient } from '../types';

export const isFetched = (patient: Patient): boolean => {
  if (patient.dateOfBirth && patient.ssn) return true;
  return false;
};

export const assertNever = (value: never): never => {
  console.log(value);
  throw new Error('Never supposed to happend');
};
