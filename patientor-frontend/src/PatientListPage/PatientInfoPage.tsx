import React from "react";
import { Container,Header, Icon } from "semantic-ui-react";
import {  useParams } from "react-router-dom";
import { useStateValue } from "../state";

const PatientInfoPage = () => {
  const [{ patients },] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient =  Object.values(patients).find(n=>n.id===id);

  if(!patient){
    return null;
  }

  const genderIcon = () =>{
    switch(patient.gender){
      case 'female':
        return <Icon name="venus"/>;
      case 'male':
        return <Icon name="mars"/>;
      default:
        return <Icon name="genderless"/>;
    }
  };

  return (
    <Container>
      <Header as='h2'> {patient.name} {genderIcon()}</Header>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </Container>
  );
};

export default PatientInfoPage;