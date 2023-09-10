const mongoose = require('mongoose');

exports.person = mongoose.model('Person', {
    Name: { type: String, required: true },
})