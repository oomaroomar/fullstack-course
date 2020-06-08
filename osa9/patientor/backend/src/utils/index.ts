import { v4 as uuidv4 } from 'uuid';

import {
  Gender,
  Patient,
  EntryType,
  Entry,
  Diagnosis,
  BaseEntry,
  Discharge,
  HealthCheckRating,
  OccupationalHealthCareEntry,
  HealthCheckEntry,
  HospitalEntry,
} from '../types';

const isString = (tbd: unknown): tbd is string =>
  typeof tbd === 'string' || tbd instanceof String;

const isNumber = (tbd: unknown): tbd is number =>
  typeof tbd === 'number' || tbd instanceof Number;

const isGender = (tbd: unknown): tbd is Gender => {
  if (!isString(tbd)) {
    console.log(tbd);
    throw new Error('Faulty gender input');
  }
  return Object.values(Gender).includes(tbd as Gender);
};

const isHCRating = (tbd: unknown): tbd is HealthCheckRating => {
  if (!isNumber(tbd) || !isHCRating(tbd)) return false;
  return Object.values(HealthCheckRating).includes(tbd);
};

const isEntryType = (tbd: unknown): tbd is EntryType => {
  if (!isString(tbd)) {
    console.log(tbd);
    throw new Error('Faulty entry type');
  }
  return ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(tbd);
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const toGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    console.log(String(gender));
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const toHCRating = (hcr: unknown): HealthCheckRating => {
  if (!hcr || !isHCRating(hcr))
    throw new Error(`Faulty health check rating ${JSON.stringify(hcr)}`);
  return hcr;
};

const toEntryType = (entryType: unknown): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    console.log(String(entryType));
    throw new Error('Incorrect or missing entry type');
  }
  return entryType;
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

const areDiagnosisCodes = (
  dCodes: unknown
): dCodes is Array<Diagnosis['code']> => {
  if (!Array.isArray(dCodes)) return false;
  if (!dCodes.every(dCode => isString(dCode))) return false;

  return true;
};

const toDiagnosisCodes = (dCodes: unknown): Array<Diagnosis['code']> => {
  if (!areDiagnosisCodes(dCodes))
    throw new Error(`Faulty diagnosis codes ${JSON.stringify(dCodes)}`);
  return dCodes;
};

const toDischarge = (object: Record<string, unknown>): Discharge => {
  const discharge: Discharge = {
    date: parseDate(object.date),
    criteria: parseString(object.criteria),
  };
  return discharge;
};

const toBaseEntry = (object: Record<string, unknown>): BaseEntry => {
  const entry: BaseEntry = {
    id: uuidv4(),
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    type: toEntryType(object.type),
    diagnosisCodes: toDiagnosisCodes(object.diagnosisCodes),
  };
  return entry;
};

export const toPatient = (object: Record<string, unknown>): Patient => ({
  id: uuidv4(),
  name: parseString(object.name),
  occupation: parseString(object.occupation),
  gender: toGender(object.gender),
  dateOfBirth: parseDate(object.dateOfBirth),
  ssn: parseString(object.ssn),
  entries: [],
});
