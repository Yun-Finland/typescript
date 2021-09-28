import { NoIdPatient, Gender } from "./types";

export const parseName = (name: unknown):string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name: '+name);
  }

  return name;
};

const isString = (str: unknown): str is string =>{
  return typeof str==='string' || str instanceof String;
};

export const parseDate = (date: unknown):string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date: '+ date);
  }
  return date;
};

const isDate = (date:string): boolean => {
  return Boolean(Date.parse(date));
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

type Fields = {name:unknown, dateOfBirth: unknown, ssn:unknown, gender:unknown, occupation: unknown};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation } :Fields) : NoIdPatient =>{
  const newPatient:NoIdPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };

  return newPatient;
};