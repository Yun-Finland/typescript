import React from "react";
import axios from "axios";
import { Container,Header, Icon, Message } from "semantic-ui-react";
import {  useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Gender, Entry, HealthCheckRating } from "../types";
import { useStateValue, addPatient } from "../state";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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

const RatingIcon = ({rate}:{rate:HealthCheckRating})=>{
  switch(rate){
    case 0:
      return <Icon name="heart" color="green"/>;
    case 1:
      return <Icon name="heart" color="orange"/>;
    case 2: 
      return <Icon name="heart" color="pink"/>;
    default:
      return <Icon name="heart" color="red"/>;
  }
};

const EntryIcon = ({entry}:{entry:Entry}) => {
  switch(entry.type){
    case "HealthCheck":
      return (
        <div>
          <Header as="h3">{entry.date} <Icon name="user md"/></Header>
          <p><em>{entry.description}</em></p>
          <RatingIcon rate={entry.healthCheckRating}/>
        </div>
      );
    case "Hospital":
      return (
        <div>
          <Header as="h3">{entry.date} <Icon name="hospital"/></Header>
          <p><em>{entry.description}</em></p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <Header as="h3">{entry.date} <Icon name="stethoscope"/> {entry.employerName}</Header>
          <p><em>{entry.description}</em></p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

const EntryComp = ({entry}:{entry:Entry}) => {
  const [{ diagnoses }, ] = useStateValue();
  
  return(
    <Message>
      <div key={entry.id}>
        <EntryIcon entry={entry} />
        <div>
          {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code]["name"]}</li>)}
        </div>
      </div>
    </Message>
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