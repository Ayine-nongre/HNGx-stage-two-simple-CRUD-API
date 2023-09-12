require('dotenv').config({path: './.env'});
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { addPerson, getPerson, deletePerson, updatePerson } = require('./controller/personController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.DB_SERVER, {useNewUrlParser: true, useUnifiedTopology: true });

var set = mongoose.connection
set.on('error', console.error.bind(console, 'connection error:'));
set.once('open', function() {
    console.log('Db connected successfully')
});

app.get("/api/:user_id", getPerson);

app.post("/api", addPerson);

app.patch("/api/:user_id", updatePerson)

app.delete("/api/:user_id", deletePerson);

app.listen(3000 || process.env.PORT, () => {
    console.log("Server is running successfully");
})