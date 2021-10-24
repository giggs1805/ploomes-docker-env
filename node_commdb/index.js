const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')

const app = express();
const port = process.env.API_PORT || 8080


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


require('./src/controllers/tasks')(app);
console.log('W E L C O M E   A B O A R D   C A P T A I N\nCurrent time:\n' + Date())
console.log('connected to port ', port)

app.listen(port)
// configurar a porta pra cada container da aplicação