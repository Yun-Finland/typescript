import patientsData from "../../Data/patientData";
import { Patient, NoIdPatient, NoSsnPatient, EntryWithoutId, Entry } from "../types";
import { v4 as uuid } from 'uuid';

const patients:Array<Patient> = patientsData;

const getAllPatients = ():Patient[] => {
  return patients;
};

const getPatients = () : NoSsnPatient[] => { 
  const noSsnPatients = patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));

  return noSsnPatients;
};

const addNewPatient = (entry: NoIdPatient) : Patient => {

  const newPatientEntry : Patient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addNewEntry = (patient:Patient, entry:EntryWithoutId) : Entry => {

  const newEntry: Entry = {
    id: uuid(),
    ...entry
  } ;

  patient.entries.push(newEntry);

  return newEntry;
};

const findPatientById = (id : string): Patient | undefined=> {
  const returnedPatient = patients.find(n=>n.id === id);
  return returnedPatient;
};

export default {
  getAllPatients, 
  getPatients, 
  addNewPatient,
  findPatientById,
  addNewEntry
};