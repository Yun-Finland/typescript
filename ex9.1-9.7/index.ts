import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.get('/hello',(_req,response)=>{
  response.send('Hello Full Stack!');
});

app.get('/bmi',(request, response)=>{
  const {height, weight}=request.query;

  if(!isNaN(Number(height)) && !isNaN(Number(weight))){
    const returnedValue = {
      weight:Number(weight),
      height:Number(height),
      bmi: calculateBmi(Number(height),Number(weight))
    };

    response.json(returnedValue);
  }else{
    response.status(400).json({error: "malformatted parameters"});
  }
});

app.post('/exercises', (request, response)=> {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {daily_exercises, target} = request.body; 

  if(!daily_exercises || !target){
    response.status(400).json({error:"parameters missing"});
  }

  if(isNaN(Number(target)) || !( daily_exercises instanceof Array)){

        response.status(400).json({error:"malformatted parameters"});
  
  }else{
    response.status(400).json({error:"malformatted parameters"});
  }

  const returnedValue = calculateExercises(daily_exercises,target);

  response.status(200).json(returnedValue);
});

const PORT = 3003;

app.listen(PORT, ()=>{
  console.log(`Sever is running on port ${PORT}`);
});