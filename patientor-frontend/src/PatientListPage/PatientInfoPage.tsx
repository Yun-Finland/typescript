import React from "react";
import axios from "axios";
import { Container,Header, Icon } from "semantic-ui-react";
import {  useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";
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
    </Container>
  );
};

export default PatientInfoPage;