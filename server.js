const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { addPerson, getPerson, deletePerson, updatePerson } = require('./controller/personController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1:27017/person", {useNewUrlParser: true, useUnifiedTopology: true });

var set = mongoose.connection
set.on('error', console.error.bind(console, 'connection error:'));
set.once('open', function() {
    console.log('Db connected successfully')
});

app.post("/api/create-person", addPerson);

app.post("/api/get-person", getPerson);

app.patch("/api/update-person", updatePerson)

app.delete("/api/delete-person", deletePerson);

app.listen(3000 || process.env.PORT, () => {
    console.log("Server is running successfully");
})