interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args:Array<string>):BmiValues =>{
  if(args.length>4) throw new Error('Too many arguments');
  if(args.length<4) throw new Error('Not enough arguments');

  if(!isNaN(Number(process.argv[2])) && !isNaN(Number(process.argv[3]))){
    return {
      height: Number(process.argv[2]),
      weight: Number(process.argv[3])
    };
  }else{
    throw new Error('Provided values are not numbers!');
  }
};

const calculateBmi = (height:number, weight:number):string => {
 
  const index = weight*100*100 / (height*height);
  if(index<16.0){
    return "Underweight(Severe thinness)";
  }else if(index <17){
    return "Underweight(Moderate thinness";
  }else if(index<18.5){
    return "Underweight(Mild thinness)";
  }else if(index<25.0){
    return "Normal (healthy weight)";
  }else if(index<30.0){
    return "Overweight(Pre-obese)";
  }else if(index<35.0){
    return "Obese (Class I)";
  }else if(index<40){
    return "Obese (Class II)";
  }else{
    return "Obese (Class III)";
  }
};

try {
  const {height, weight} = parseArguments(process.argv);
  console.log(calculateBmi(height,weight));
}catch(e){
  if (e instanceof String){
    console.log('Error, something bad happened, error message: ', e);
  }
}

export default calculateBmi;

