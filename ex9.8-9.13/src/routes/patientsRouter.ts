import express from "express";
import patientService from "../services/patientService";
import { EntryWithoutId } from "../types";
import { toNewPatient, toNewEntry } from "../utils";

const patientsRouter = express.Router();

patientsRouter.get('/', (_request, response)=> {
  console.log("Fetching all patients!");
  response.json(patientService.getPatients());
});

patientsRouter.get('/:id', (request, response)=> {
  const id=request.params.id;
  try{
    const returnedPatient = patientService.findPatientById(id);
    if(returnedPatient){
      response.json(returnedPatient);
    }else{
      response.status(400).end();
    }

  }catch(e){
    if(e instanceof Error){
      response.status(400).send(e.message);
    }
  }
});

patientsRouter.post('/', (request, response)=>{
  try{
    const newPatient = toNewPatient(request.body);
    const addedNewPatient = patientService.addNewPatient(newPatient);
    response.json(addedNewPatient);
  }catch(e){
    if(e instanceof Error){
      response.status(400).send(e.message);
    }
  }
});

patientsRouter.post('/:id/entries',(request, response)=>{
  const id=request.params.id;

  try{
    const returnedPatient = patientService.findPatientById(id);
    if(returnedPatient){
      const newEntryWithoutId : EntryWithoutId = toNewEntry(request.body);
      const returnedEntry = patientService.addNewEntry(returnedPatient, newEntryWithoutId);
      response.json(returnedEntry);
    }else{
      response.status(400).end();
    }
  }catch(e){
    if(e instanceof Error){
      response.status(400).send(e.message);
    }
  }
});

export default patientsRouter;
