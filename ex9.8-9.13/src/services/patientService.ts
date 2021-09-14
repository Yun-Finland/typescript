import patientsData from "../../Data/patientData";
import { NoSsnPatient } from "../types";

const getPatients = () : NoSsnPatient[] => {
 
  const noSsnPatients = patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

  return noSsnPatients;
};

export default {getPatients};