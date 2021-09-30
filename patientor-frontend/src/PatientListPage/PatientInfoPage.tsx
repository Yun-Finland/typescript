import React from "react";
import axios from "axios";
import { Container,Header, Icon } from "semantic-ui-react";
import {  useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Gender, Entry } from "../types";
import { useStateValue, addPatient } from "../state";

const GenderIcon = ({gender} :{gender: Gender}) =>{
  switch(gender){
    case 'female':
      return <Icon name="venus"/>;
    case 'male':
      return <Icon name="mars"/>;
    default:
      return <Icon name="genderless"/>;
  }
};

const EntryComp = ({entry}:{entry:Entry}) => {
  const [{ diagnoses }, ] = useStateValue();
  return(
    <div key={entry.id}>
      {entry.date} <em>{entry.description}</em>
      <div>
        {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code]["name"]}</li>)}
      </div>
    </div>
  );
};

const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const returnedPatient  = Object.values(patients).find((patient:Patient)=>patient.id===id);
  
  if(!returnedPatient){
    return null;
  }

  if(!returnedPatient.ssn){
    const getPatientInfo = async () =>{
      try{
        const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`); 
        returnedPatient.ssn = response.data.ssn;
        dispatch(addPatient(returnedPatient));
      
      }catch(e){
        if(e instanceof Error){
          console.log("Error: ", e.message);
        }
      }
    };
    void getPatientInfo();
  } 
  
  return (
    <Container>
      <Header as='h2'> {returnedPatient.name} <GenderIcon gender={returnedPatient.gender} /></Header>
      <p>ssn: {returnedPatient.ssn}</p>
      <p>occupation: {returnedPatient.occupation}</p>
      <Header as="h3">entries</Header>
      {returnedPatient.entries.map(entry => <EntryComp key={entry.id} entry={entry} />)}    
    </Container>
  );
};

export default PatientInfoPage;