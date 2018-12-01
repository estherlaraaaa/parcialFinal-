const mongoose = require('mongoose'); 

var editoresModel = mongoose.Schema({
    id: Number,
    name: String,
    propietario: String, 
});

module.exports= mongoose.model('editores', editoresModel);