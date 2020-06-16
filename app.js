const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasksRoutes');

require('dotenv/config');

app.use(bodyParser.json());

app.use('/tasks', tasksRoutes);


// connect to DB
mongoose.connect(
process.env.DB_CONNECTION,
{ useNewUrlParser: true }, 
() =>  console.log('connected')
);

app.listen(3000);