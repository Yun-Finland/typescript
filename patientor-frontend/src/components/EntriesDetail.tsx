import React from "react";
import { Header, Icon, Message } from "semantic-ui-react";
import { Entry, HealthCheckRating, Gender } from "../types";
import { useStateValue } from "../state";

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

export const GenderIcon = ({gender} :{gender: Gender}) =>{
  switch(gender){
    case 'female':
      return <Icon name="venus"/>;
    case 'male':
      return <Icon name="mars"/>;
    default:
      return <Icon name="genderless"/>;
  }
};

const EntryDetail = ({entry}:{entry:Entry}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

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

export const EntriesDetail = ({entry}:{entry:Entry}) => {
  const [{ diagnoses }, ] = useStateValue();

  if(Object.values(diagnoses).length===0){
    return null;
  }

  return(
    <Message>
      <div key={entry.id}>
        <EntryDetail entry={entry} />
        <div>
          {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code]["name"]}</li>)}
        </div>
      </div>
    </Message>
  );
};