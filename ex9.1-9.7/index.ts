import express from 'express';
import calculateBmi from './bmiCalculator'

const app = express();

app.get('/hello',(_req,response)=>{
  response.send('Hello Full Stack!')
})

app.get('/bmi',(request, response)=>{
  const {height, weight}=request.query

  if(!isNaN(Number(height)) && !isNaN(Number(weight))){
    const returnedValue = {
      weight:Number(weight),
      height:Number(height),
      bmi: calculateBmi(Number(height),Number(weight))
    }

    response.json(returnedValue)
  }else{
    response.status(400).json({error: "malformatted parameters"});
  }

})

const PORT = 3003

app.listen(PORT, ()=>{
  console.log(`Sever is running on port ${PORT}`)
})