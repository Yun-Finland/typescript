import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/ping',(_request, response)=> {
  response.send('Pong');
});

app.get('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.listen(PORT, ()=> {
  console.log(`Sever is running on port: ${PORT}`);
});