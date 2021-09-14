import express from 'express'
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 3001

app.get('/api/ping',(_request, response)=> {
  response.send('Pong')
})

app.listen(PORT, ()=> {
  console.log(`Sever is running on port: ${PORT}`)
})