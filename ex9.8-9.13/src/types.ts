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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

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