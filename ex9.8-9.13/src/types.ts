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

export interface Patient {
  id:string,
  name:string,
  dateOfBirth: string,
  ssn:string,
  gender:Gender,
  occupation: string
}

export type NoIdPatient = Omit <Patient, 'id'>;

export type NoSsnPatient = Omit <Patient, 'ssn'>;