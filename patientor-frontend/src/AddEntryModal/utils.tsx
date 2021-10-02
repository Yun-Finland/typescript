import { EntryType, EntryWithoutId } from '../types';

export const initialValues = (entryType:EntryType):EntryWithoutId => {
  const baseValues = {      
    date:"",
    specialist:"",
    description:"",
    diagnosis:""
  };

  switch(entryType){
    case "Hospital":
      return ({
        ...baseValues,
        type: entryType,
        discharge:{
          date:"",
          criteria:""
        }
      });
    case "HealthCheck":
      return ({
        ...baseValues,
        type: entryType,
        healthCheckRating: 0
      });
    case "OccupationalHealthcare":
      return ({
        type: entryType,
        ...baseValues,
        employerName:"",
        sickLeave:{
          startDate:"",
          endDate:""
        }
      });
    default:
      throw new Error('Unknown Entry Type');
  }
};

export const validateValues = (values: EntryWithoutId, entryType: EntryType) => {
  
  const requiredError = "Field is required";
  const errors: { [field: string]: string } = {};

  values.type=entryType;

  if(!values.date){
    errors.date=requiredError;
  }
  if(!values.specialist){
    errors.specialist=requiredError;
  }
  if(!values.description){
    errors.description=requiredError;
  }

  switch(values.type){
    case "Hospital":
      if(!values.discharge.date || !values.discharge.criteria){
        errors.discharge = requiredError;
      }
      break;
    case "HealthCheck":
      if(!values.healthCheckRating){
        errors.healthCheckRating = requiredError;
      }
      break;
    case "OccupationalHealthcare":
      if(!values.employerName){
        errors.employerName = requiredError;
      }
      break;
    default:
      throw new Error('Unknown field');
  }
  return errors;
};
