import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | { 
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList:Patient[]) => {
  const newAction:Action = {
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
  return newAction;
};

export const addPatient = (patient:Patient) =>{
  const newAction:Action = {
    type:"ADD_PATIENT",
    payload:patient,
  };

  return newAction;
};

export const addEntry = (patient:Patient, entry:Entry) => {
  const updatedPatient = {
    ...patient,
    entries: patient.entries.concat(entry)
  };

  const newAction: Action = {
    type:"ADD_PATIENT",
    payload: updatedPatient,
  };
  
  return newAction;
};

export const setDiagnosisList = (diagnosisList:Diagnosis[]) =>{
  const newAction: Action = {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList,
  };
  return newAction;
};