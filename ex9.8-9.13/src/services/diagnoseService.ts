import diagnosesData from "../../Data/diagnoseData";
import { Diagnose } from "../types"; 

const diagnoses : Diagnose[] = diagnosesData;

const getDiagnoses = ():Diagnose[] =>{
  return diagnoses;
};

export default { getDiagnoses };