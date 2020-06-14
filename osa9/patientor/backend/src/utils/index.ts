import { v4 as uuidv4 } from 'uuid';

import {
  Gender,
  Patient,
  Entry,
  HealthCheckEntry,
  EntryType,
  HealthCheckRating,
  BaseEntry,
  HospitalEntry,
  Discharge,
  OccupationalHealthCareEntry,
  SickLeave,
} from '../types';

const isString = (tbd: unknown): tbd is string =>
  typeof tbd === 'string' || tbd instanceof String;

const isObject = (tbd: unknown): tbd is Record<string, unknown> =>
  typeof tbd === 'object' && tbd !== null;

const isNumber = (tbd: unknown): tbd is number =>
  typeof tbd === 'number' || tbd instanceof Number;

const isGender = (tbd: unknown): tbd is Gender => {
  if (!isString(tbd)) {
    console.log(tbd);
    throw new Error('Faulty gender input');
  }
  return Object.values(Gender).includes(tbd as Gender);
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const toGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    console.log(String(gender));
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};
const parseDate = (tbd: unknown): string => {
  if (!tbd || !isString(tbd) || !isDate(tbd))
    throw new Error('Faulty date input');
  return tbd;
};

const parseString = (tbd: unknown): string => {
  if (!isString(tbd)) {
    console.log(tbd);
    throw new Error(`Faulty field input ${JSON.stringify(tbd)}`);
  }
  return tbd;
};

const isEntryType = (tbd: unknown): tbd is EntryType => {
  if (!isString(tbd)) return false;

  return ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(tbd);
};

const toEntryType = (tbd: unknown): EntryType => {
  if (!isEntryType(tbd)) throw new Error('Faulty entry type input');
  return tbd;
};

const isHealthCheckRating = (tbd: unknown): tbd is HealthCheckRating => {
  if (!isNumber(tbd)) return false;
  if (tbd > 3 || tbd < 0) return false;
  return true;
};

const toHealthCheckRating = (tbd: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(tbd)) throw new Error('Faulty health check rating');
  return tbd;
};

const isDischarge = (tbd: unknown): tbd is Discharge => {
  if (!isObject(tbd)) return false;
  if (!isString(tbd.date) || !isDate(tbd.date) || !isString(tbd.criteria))
    return false;
  return true;
};

const toDischarge = (tbd: unknown): Discharge => {
  if (!isDischarge(tbd)) throw new Error('Faulty discharge input');
  return tbd;
};

const toBaseEntry = (object: Record<string, unknown>): BaseEntry => ({
  id: uuidv4(),
  description: parseString(object.description),
  date: parseDate(object.date),
  specialist: parseString(object.specialist),
  type: toEntryType(object.type),
});

const isSickLeave = (tbd: unknown): tbd is SickLeave => {
  if (!isObject(tbd) || !isString(tbd.startDate) || !isString(tbd.endDate))
    return false;
  return true;
};

const toSickLeave = (object: unknown): SickLeave | undefined => {
  if (!isSickLeave(object)) return undefined;
  return object;
};

const toHealthCheckEntry = (
  object: Record<string, unknown>
): HealthCheckEntry => ({
  ...toBaseEntry(object),
  type: 'HealthCheck',
  healthCheckRating: toHealthCheckRating(object.healthCheckRating),
});

const toHospitalEntry = (object: Record<string, unknown>): HospitalEntry => ({
  ...toBaseEntry(object),
  type: 'Hospital',
  discharge: toDischarge(object.discharge),
});

const toOccupationalHealthcare = (
  object: Record<string, unknown>
): OccupationalHealthCareEntry => ({
  ...toBaseEntry(object),
  type: 'OccupationalHealthcare',
  employerName: parseString(object.employerName),
  sickLeave: toSickLeave(object.sickLeave),
});

export const toEntry = (object: unknown): Entry => {
  if (!isObject(object)) throw new Error('Input not an object');
  switch (object.type) {
    case 'HealthCheck':
      return toHealthCheckEntry(object);
    case 'Hospital':
      return toHospitalEntry(object);
    case 'OccupationalHealthcare':
      return toOccupationalHealthcare(object);
    default:
      throw new Error('Faulty entry type');
  }
};

export const toPatient = (object: unknown): Patient => {
  if (!isObject(object)) throw new Error('Input not an object');

  return {
    id: uuidv4(),
    name: parseString(object.name),
    occupation: parseString(object.occupation),
    gender: toGender(object.gender),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    entries: [],
  };
};
