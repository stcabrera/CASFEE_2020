const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasksRoutes');

// Add CORS headers 
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

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