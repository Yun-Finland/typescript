import express from 'express';

const app = express();

app.get('/hello',(_req,response)=>{
  response.send('Hello Full Stack!')
})

const PORT = 3003

app.listen(PORT, ()=>{
  console.log(`Sever is running on port ${PORT}`)
})