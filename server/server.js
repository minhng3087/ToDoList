// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./DB.js');
const itemRoutes = require('./routes');

mongoose.Promise = global.Promise;

// Connect to DB
db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/items', itemRoutes);


app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});