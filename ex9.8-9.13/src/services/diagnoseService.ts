import diagnosesData from "../../Data/diagnoseData";
import { Diagnose } from "../types";

const getDiagnoses = (): Array<Diagnose>=>{
  
  return diagnosesData;
};

export default { getDiagnoses };