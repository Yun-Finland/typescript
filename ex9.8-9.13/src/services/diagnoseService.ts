import diagnosesData from "../../Data/diagnoseData";
import { Diagnose } from "../types"; 

const getDiagnoses = ():Diagnose[] =>{
  return diagnosesData;
};

export default { getDiagnoses };