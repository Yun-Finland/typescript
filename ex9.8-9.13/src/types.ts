export interface Diagnose {
  code:string,
  name:string,
  latin?:string
}

export enum Gender {
  Female = "female",
  Male = "Male",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthCareEntry  extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?:{
    startDate: string;
    endDate: string;
  };
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}


export type NoIdPatient = Omit <Patient, 'id'>;

export type NoSsnPatient = Omit <Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;