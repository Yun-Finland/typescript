import { NoIdPatient, Gender, HealthCheckRating, BaseEntry, EntryWithoutId } from "./types";

const isString = (str: unknown): str is string =>{
  return typeof str==='string' || str instanceof String;
};

export const parseName = (name: unknown):string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name: '+name);
  }

  return name;
};

const isDate = (date:string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown):string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date: '+ date);
  }
  return date;
};

export const parseSsn = (ssn: unknown):string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn: '+ssn);
  }

  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param:any):param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parseGender= (gender:unknown): Gender =>{
  if(!gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender: '+gender);
  }

  return gender;
};

export const parseOccupation = (occupation:unknown):string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation: '+ occupation);
  }
  return occupation;
};

type Fields = {name:unknown, dateOfBirth: unknown, ssn:unknown, gender:unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation } :Fields) : NoIdPatient =>{
  const newPatient:NoIdPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries:[],
  };

  return newPatient;
};

const parseDescription = (description:unknown):string => {
  if(!description || !isString(description)){
    throw new Error('Incorrect or missing description: '+ description);
  }
  return description;
};

const parseSpecialist = (specialist:unknown):string => {
  if(!specialist || !isString(specialist)){
    throw new Error('Incorrect or missing specialist: '+ specialist);
  }
  return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRate = (param:any):param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRate = (healthCheckRating: unknown): HealthCheckRating =>{
  if(!healthCheckRating || !isHealthCheckRate(healthCheckRating)){
    throw new Error('Incorrect or missing healthCheckRating: '+ healthCheckRating);
  }
  return healthCheckRating;
};

const parseCriteria = (criteria:unknown):string =>{
  if(!criteria || !isString(criteria)){
    throw new Error('Incorrect or missing criteria: '+ criteria);
  }
  return criteria;
};

const parseDiagnosis = (diagnosis:unknown): Array<string> =>{
  if(!diagnosis || !Array.isArray(diagnosis)){
    throw new Error('Incorrect or missing diagnosis: '+ diagnosis);
  }

  const newDiagnosis : Array<string> = diagnosis.map(n=>{
    if(!isString(n)){
      throw new Error('Incorrect diagnosis codes: '+ n);
    }
    return n;
  });

  return newDiagnosis;
};

type EntryField = 
  | {type: "HealthCheck",description:unknown, specialist: unknown, date:unknown, diagnosisCodes?: unknown, healthCheckRating:unknown}
  | {type: "Hospital",description:unknown, specialist: unknown, date:unknown, diagnosisCodes?: unknown, discharge:{date:unknown, criteria:unknown}}
  | {type: "OccupationalHealthcare",description:unknown, specialist: unknown, date:unknown, diagnosisCodes?: unknown, employerName: unknown, sickLeave?:{startDate: unknown, endDate: unknown}};

export const toNewEntry = (entry: EntryField): EntryWithoutId  => {
  let newEntryBase: Omit<BaseEntry,'id'> = {
    description:parseDescription(entry.description),
    specialist:parseSpecialist(entry.specialist),
    date: parseDate(entry.date),
  };

  if(entry.diagnosisCodes){
    newEntryBase = {
      ...newEntryBase,
      diagnosisCodes: parseDiagnosis(entry.diagnosisCodes)
    };
  }

  switch(entry.type){
    case "HealthCheck":
      const healthEntry : EntryWithoutId = {
        ...newEntryBase,
        type: entry.type,
        healthCheckRating: parseHealthCheckRate(entry.healthCheckRating),
      };
      return healthEntry;

    case "Hospital":
      const hospitalEntry : EntryWithoutId = {
        ...newEntryBase,
        type: entry.type,
        discharge:{
          date:parseDate(entry.discharge.date), 
          criteria:parseCriteria(entry.discharge.criteria)
        }
      };
      return hospitalEntry;

    case "OccupationalHealthcare":
      const occupationalEntry: EntryWithoutId  = {
        ...newEntryBase,
        type: entry.type,
        employerName: parseName(entry.employerName),
      };

      if(entry.sickLeave){
        occupationalEntry.sickLeave =  {
            startDate: parseDate(entry.sickLeave.startDate),
            endDate: parseDate(entry.sickLeave.endDate),
          };
      
      }
      return occupationalEntry;
    default:
      throw new Error ('Error here');
  }

};