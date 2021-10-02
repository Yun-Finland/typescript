import React from 'react';
import { NumberField} from "../AddPatientModal/FormField";
import { Field } from "formik";
import { TextField } from "../AddPatientModal/FormField";

export const HospitalEntryFormBase = ()=>{
  return(
    <>
      <Field
        label="Discharge"
        placeholder="YYYY-MM-DD"
        name="discharge.date"
        component={TextField}
      />
      <Field
        rows={2}
        placeholder="Criteria"
        name="discharge.criteria"
        component={TextField}
      />      
    </>
  );
};

export const HealthCheckEntryFormBase = ()=>{
  return(
    <>
      <Field
        label="HealthCheckRating"
        name="healthCheckRating"
        min={0}
        max={3}
        component={NumberField}
      />
    </>
  );
};

export const OccupationalEntryFormBase = ()=>{
  return(
    <>
      <Field
        label="EmployerName"
        placeholder="EmployerName"
        name="employerName"
        component={TextField}
      />
      <Field
        label="sickLeave"
        placeholder="YYYY-MM-DD"
        name="sickLeave.startDate"
        component={TextField}
      />
      <Field
        rows={2}
        placeholder="YYYY-MM-DD"
        name="sickLeave.endDate"
        component={TextField}
      />  
    </>    
  );
};


