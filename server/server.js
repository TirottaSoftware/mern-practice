const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/items.js');

const app = express();

app.use(bodyParser.json());

//Database config
const db = require('./mongo_key.js').mongoURI;

//Mongo connection
mongoose.connect(db)
    .then(() => console.log("Connected to Mongo"))
    .catch(err => console.log(err));

app.use('/items', items);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`));