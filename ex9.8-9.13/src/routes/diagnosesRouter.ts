import express from 'express';
import diagnoseService from '../services/diagnoseService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_request, response)=>{
  console.log("Fetching all diagnoses!");
  response.json(diagnoseService.getDiagnoses());
});

export default diagnosesRouter;