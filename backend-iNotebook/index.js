const connectToMongo = require('./db')
const express = require('express')

connectToMongo();
const app = express()
const cors = require('cors')

app.use(cors())
const port = 5000

app.use(express.json());

// Routes linked
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook app listening on port http://localhost:${port}`)
})