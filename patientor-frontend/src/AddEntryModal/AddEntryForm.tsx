import React,{useState} from 'react';
import { EntryType, EntryWithoutId } from '../types';
import { useStateValue } from "../state";
import { TypeOption, TextField, SelectTypeField, DiagnosisSelection,} from "../AddPatientModal/FormField";
import { HospitalEntryFormBase, HealthCheckEntryFormBase, OccupationalEntryFormBase} from './EntryFormBase';
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";
import {initialValues,validateValues } from './utils';

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" }
];

const AddEntryForm = ({ onSubmit, onClose } : Props) => {
  const [ entryType, setEntryType] = useState(EntryType.Hospital);
  const [{ diagnoses },] = useStateValue();

  const showEntryForm = (entryType:EntryType) => {
    switch(entryType){
      case "Hospital":
        return <HospitalEntryFormBase />;
      case "HealthCheck":
        return <HealthCheckEntryFormBase />;
      case "OccupationalHealthcare":
        return <OccupationalEntryFormBase />;
      default:
        throw new Error('Wrong showEntryForm type');
    }
  };

  return (
    <Formik
      initialValues={initialValues(entryType)}
      onSubmit={onSubmit}
      validate={values=>validateValues(values,entryType)}
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue}) => {
        return (
          <Form className="form ui">
            <SelectTypeField
              label="Type"
              name="type"
              options={typeOptions}
              entryType={entryType}
              setEntryType={setEntryType}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldTouched={setFieldTouched}
              setFieldValue = {setFieldValue}
            />
            {showEntryForm(entryType)}             
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onClose} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;


