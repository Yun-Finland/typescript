import React from "react";
import axios from "axios";
import { Button, Container,Header } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, EntryWithoutId } from "../types";
import { useStateValue, addPatient,addEntry } from "../state";
import { AddEntryModal } from "../AddEntryModal";
import { EntriesDetail, GenderIcon} from "../components/EntriesDetail";

const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log('Now the newEntry is: ', newEntry);
      dispatch(addEntry(returnedPatient,newEntry));
      closeModal();
    } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
        setError(e.response?.data?.error || 'Unknown error');
    }
  };
  
  return (
    <Container>
      <Header as='h2'> {returnedPatient.name} <GenderIcon gender={returnedPatient.gender} /></Header>
      <p>ssn: {returnedPatient.ssn}</p>
      <p>occupation: {returnedPatient.occupation}</p>
      <Header as="h3">entries</Header>
      {returnedPatient.entries.map(entry => <EntriesDetail key={entry.id} entry={entry} />)} 
      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onClose={closeModal}
        onSubmit={submitNewEntry}
      />
      <Button onClick={openModal}>Add New Entry</Button>   
    </Container>
  );
};

export default PatientInfoPage;